# PluginContainer
- 在生产环境中 Vite 直接调用 Rollup 进行打包，所以 Rollup 可以调度各种插件；
- 在开发环境中，Vite 模拟了 Rollup 的插件机制，设计了一个PluginContainer 对象来调度各个插件。


PluginContainer 的 实现 基于借鉴于 WMR 中的rollup-plugin-container.js，主要分为 2 个部分:
- 实现 Rollup 插件钩子的调度
- 实现插件钩子内部的 Context 上下文对象


## PluginContainer源码地址
- https://github.com/vitejs/vite/blob/main/packages/vite/src/node/server/pluginContainer.ts#L463

精简后如下：
```
const container = {
  // 异步串行钩子
  options: await (async () => {
    let options = rollupOptions
    for (const plugin of plugins) {
      if (!plugin.options) continue
      options =
        (await plugin.options.call(minimalContext, options)) || options
    }
    return options;
  })(),
  // 异步并行钩子
  async buildStart() {
    await Promise.all(
      plugins.map((plugin) => {
        if (plugin.buildStart) {
          return plugin.buildStart.call(
            new Context(plugin) as any,
            container.options as NormalizedInputOptions
          )
        }
      })
    )
  },
  // 异步优先钩子
  async resolveId(rawId, importer) {
    // 上下文对象，后文介绍
    const ctx = new Context()

    let id: string | null = null
    const partial: Partial<PartialResolvedId> = {}
    for (const plugin of plugins) {
      const result = await plugin.resolveId.call(
        ctx as any,
        rawId,
        importer,
        { ssr }
      )
      if (!result) continue;
      return result;
    }
  }
  // 异步优先钩子
  async load(id, options) {
    const ctx = new Context()
    for (const plugin of plugins) {
      const result = await plugin.load.call(ctx as any, id, { ssr })
      if (result != null) {
        return result
      }
    }
    return null
  },
  // 异步串行钩子
  async transform(code, id, options) {
    const ssr = options?.ssr
    // 每次 transform 调度过程会有专门的上下文对象，用于合并 SourceMap，后文会介绍
    const ctx = new TransformContext(id, code, inMap as SourceMap)
    ctx.ssr = !!ssr
    for (const plugin of plugins) {
      let result: TransformResult | string | undefined
      try {
        result = await plugin.transform.call(ctx as any, code, id, { ssr })
      } catch (e) {
        ctx.error(e)
      }
      if (!result) continue;
      // 省略 SourceMap 合并的逻辑 
      code = result;
    }
    return {
      code,
      map: ctx._getCombinedSourcemap()
    }
  },
  // close 钩子实现省略
}
```
在各种钩子被调用的时候，Vite 会强制将钩子函数的 this 绑定为一个上下文对象，如:
```
const ctx = new Context()
const result = await plugin.load.call(ctx as any, id, { ssr })
```
这个Context有什么用呢？

https://rollupjs.org/plugin-development/#plugin-context

A number of utility functions and informational bits can be accessed from within most hooks via this

在 Rollup 钩子函数中，我们可以调用this.emitFile、this.resolve 等诸多的上下文方法。

因此，Vite 除了要模拟各个插件的执行流程，还需要模拟插件执行的上下文对象，代码中的 Context 对象就是用来完成这件事情的。

Context的实现:
```
import { RollupPluginContext } from 'rollup';
type PluginContext = Omit<
  RollupPluginContext,
  // not documented
  | 'cache'
  // deprecated
  | 'emitAsset'
  | 'emitChunk'
  | 'getAssetFileName'
  | 'getChunkFileName'
  | 'isExternal'
  | 'moduleIds'
  | 'resolveId'
  | 'load'
>

const watchFiles = new Set<string>()

class Context implements PluginContext {
  // 实现各种上下文方法
  // 解析模块 AST(调用 acorn)
  parse(code: string, opts: any = {}) {
    return parser.parse(code, {
      sourceType: 'module',
      ecmaVersion: 'latest',
      locations: true,
      ...opts
    })
  }
  // 解析模块路径
  async resolve(
    id: string,
    importer?: string,
    options?: { skipSelf?: boolean }
  ) {
    let skip: Set<Plugin> | undefined
    if (options?.skipSelf && this._activePlugin) {
      skip = new Set(this._resolveSkips)
      skip.add(this._activePlugin)
    }
    let out = await container.resolveId(id, importer, { skip, ssr: this.ssr })
    if (typeof out === 'string') out = { id: out }
    return out as ResolvedId | null
  }

  // 以下两个方法均从 Vite 的模块依赖图中获取相关的信息
  // 我们将在下一节详细介绍模块依赖图，本节不做展开
  getModuleInfo(id: string) {
    return getModuleInfo(id)
  }

  getModuleIds() {
    return moduleGraph
      ? moduleGraph.idToModuleMap.keys()
      : Array.prototype[Symbol.iterator]()
  }
  
  // 记录开发阶段 watch 的文件
  addWatchFile(id: string) {
    watchFiles.add(id)
    ;(this._addedImports || (this._addedImports = new Set())).add(id)
    if (watcher) ensureWatchedFile(watcher, id, root)
  }

  getWatchFiles() {
    return [...watchFiles]
  }
  
  warn() {
    // 打印 warning 信息
  }
  
  error() {
    // 打印 error 信息
  }
  
  // 其它方法只是声明，并没有具体实现，这里就省略了
}
```
Vite 将 Rollup 的PluginContext对象重新实现了一遍，因为只是开发阶段用到，所以去除了一些打包相关的方法实现。
同时，上下文对象与 Vite 开发阶段的 ModuleGraph 即模块依赖图相结合，是为了实现开发时的 HMR

另外，transform 钩子也会绑定一个插件上下文对象，不过这个对象和其它钩子不同，实现代码精简如下:

```
class TransformContext extends Context {
  constructor(filename: string, code: string, inMap?: SourceMap | string) {
    super()
    this.filename = filename
    this.originalCode = code
    if (inMap) {
      this.sourcemapChain.push(inMap)
    }
  }

  _getCombinedSourcemap(createIfNull = false) {
    return this.combinedMap
  }

  getCombinedSourcemap() {
    return this._getCombinedSourcemap(true) as SourceMap
  }
}
```
TransformContext继承自之前所说的Context对象，也就是说 transform 钩子的上下文对象相比其它钩子只是做了一些扩展，增加了 sourcemap 合并的功能，
将不同插件的 transform 钩子执行后返回的 sourcemap 进行合并，以保证 sourcemap 的准确性和完整性。
