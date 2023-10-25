# ModuleGraph
为了方便管理各个模块之间的依赖关系，Vite 在 Dev Server 中创建了模块依赖图的数据结构，即ModuleGraph类，
Vite 中 HMR 边界模块的判定会依靠这个类来实现。源码地址如下：

https://github.com/vitejs/vite/blob/v2.7.0/packages/vite/src/node/server/moduleGraph.ts


## 创建依赖图
创建依赖图主要分为三个步骤:
- 初始化ModuleGraph实例
- 创建依赖图的ModuleNode
- 绑定各个模块节点的依赖关系


1. 初始化ModuleGraph实例

Vite 在 Dev Server 启动时会初始化 ModuleGraph 的实例：
```
// pacakges/vite/src/node/server/index.ts
const moduleGraph: ModuleGraph = new ModuleGraph((url) =>
  container.resolveId(url)
);
```

ModuleGraph这个类的实现，其中定义了若干个 Map，用来记录模块信息:
```
// 由原始请求 url 到模块节点的映射，如 /src/index.tsx
urlToModuleMap = new Map<string, ModuleNode>()
// 由模块 id 到模块节点的映射，其中 id 与原始请求 url，为经过 resolveId 钩子解析后的结果
idToModuleMap = new Map<string, ModuleNode>()
// 由文件到模块节点的映射，由于单文件可能包含多个模块，如 .vue 文件，因此 Map 的 value 值为一个集合
fileToModulesMap = new Map<string, Set<ModuleNode>>()
```

ModuleNode 对象即代表模块节点的具体信息，它的数据结构:
```
class ModuleNode {
  // 原始请求 url
  url: string
  // 文件绝对路径 + query
  id: string | null = null
  // 文件绝对路径
  file: string | null = null
  type: 'js' | 'css'
  info?: ModuleInfo
  // resolveId 钩子返回结果中的元数据
  meta?: Record<string, any>
  // 该模块的引用方
  importers = new Set<ModuleNode>()
  // 该模块所依赖的模块
  importedModules = new Set<ModuleNode>()
  // 接受更新的模块
  acceptedHmrDeps = new Set<ModuleNode>()
  // 是否为`接受自身模块`的更新
  isSelfAccepting = false
  // 经过 transform 钩子后的编译结果
  transformResult: TransformResult | null = null
  // SSR 过程中经过 transform 钩子后的编译结果
  ssrTransformResult: TransformResult | null = null
  // SSR 过程中的模块信息
  ssrModule: Record<string, any> | null = null
  // 上一次热更新的时间戳
  lastHMRTimestamp = 0

  constructor(url: string) {
    this.url = url
    this.type = isDirectCSSRequest(url) ? 'css' : 'js'
  }
}
```
重点关注的是 importers 和importedModules，这两条信息分别代表了当前模块被哪些模块引用以及它依赖了哪些模块，是构建整个模块依赖图的根基所在。

<br>

2. 创建依赖图的ModuleNode

Vite 是在什么时候创建 ModuleNode 节点的呢？我们可以到 Vite Dev Server 中的transform中间件一探究竟:
```
// packages/vite/src/node/server/middlewares/transform.ts
// 核心转换逻辑
const result = await transformRequest(url, server, {
  html: req.headers.accept?.includes('text/html')
})
```

transform中间件的主要逻辑是调用 transformRequest方法，我们来进一步查看这个方法的核心代码实现:
```
// packages/vite/src/node/server/transformRequest.ts
// 从 ModuleGraph 查找模块节点信息
const module = await server.moduleGraph.getModuleByUrl(url)
// 如果有则命中缓存
const cached =
  module && (ssr ? module.ssrTransformResult : module.transformResult)
if (cached) {
  return cached
}
// 否则调用 PluginContainer 的 resolveId 和 load 方法对进行模块加载
const id = (await pluginContainer.resolveId(url))?.id || url
const loadResult = await pluginContainer.load(id, { ssr })
// 然后通过调用 ensureEntryFromUrl 方法创建 ModuleNode
const mod = await moduleGraph.ensureEntryFromUrl(url)
```

接着看看 ensureEntryFromUrl 方法如何创建新的 ModuleNode 节点:
```
async ensureEntryFromUrl(rawUrl: string): Promise<ModuleNode> {
  // 实质是调用各个插件的 resolveId 钩子得到路径信息
  const [url, resolvedId, meta] = await this.resolveUrl(rawUrl)
  let mod = this.urlToModuleMap.get(url)
  if (!mod) {
    // 如果没有缓存，就创建新的 ModuleNode 对象
    // 并记录到 urlToModuleMap、idToModuleMap、fileToModulesMap 这三张表中
    mod = new ModuleNode(url)
    if (meta) mod.meta = meta
    this.urlToModuleMap.set(url, mod)
    mod.id = resolvedId
    this.idToModuleMap.set(resolvedId, mod)
    const file = (mod.file = cleanUrl(resolvedId))
    let fileMappedModules = this.fileToModulesMap.get(file)
    if (!fileMappedModules) {
      fileMappedModules = new Set()
      this.fileToModulesMap.set(file, fileMappedModules)
    }
    fileMappedModules.add(mod)
  }
  return mod
}
```

3. 绑定各个模块节点的依赖关系
vite:import-analysis插件当中，在这个插件的 transform 钩子中，会对模块代码中的 import 语句进行分析，得到如下的一些信息:
- importedUrls: 当前模块的依赖模块 url 集合。
- acceptedUrls: 当前模块中通过 import.meta.hot.accept 声明的依赖模块 url 集合。
- isSelfAccepting: 分析 import.meta.hot.accept 的用法，标记是否为接受自身更新的类型。

接下来会进入核心的模块依赖关系绑定的环节，核心代码如下:
```
// 引用方模块
const importerModule = moduleGraph.getModuleById(importer)
await moduleGraph.updateModuleInfo(
  importerModule,
  importedUrls,
  normalizedAcceptedUrls,
  isSelfAccepting
)
```
绑定依赖关系的逻辑主要由ModuleGraph对象的updateModuleInfo方法实现:
```
async updateModuleInfo(
  mod: ModuleNode,
  importedModules: Set<string | ModuleNode>,
  acceptedModules: Set<string | ModuleNode>,
  isSelfAccepting: boolean
) {
  mod.isSelfAccepting = isSelfAccepting
  mod.importedModules = new Set()
  // 绑定节点依赖关系
  for (const imported of importedModules) {
    const dep =
      typeof imported === 'string'
        ? await this.ensureEntryFromUrl(imported)
        : imported
    dep.importers.add(mod)
    mod.importedModules.add(dep)
  }

  // 更新 acceptHmrDeps 信息
  const deps = (mod.acceptedHmrDeps = new Set())
  for (const accepted of acceptedModules) {
    const dep =
      typeof accepted === 'string'
        ? await this.ensureEntryFromUrl(accepted)
        : accepted
    deps.add(dep)
  }
}
```
随着越来越多的模块经过 vite:import-analysis的 transform 钩子处理，所有模块之间的依赖关系会被记录下来，整个依赖图的信息也就被补充完整了。

<br>

## 服务端收集更新模块
Vite 在服务启动时会通过 chokidar 新建文件监听器:
```
// packages/vite/src/node/server/index.ts
import chokidar from 'chokidar'

// 监听根目录下的文件
const watcher = chokidar.watch(path.resolve(root));
// 修改文件
watcher.on('change', async (file) => {
  file = normalizePath(file)
  moduleGraph.onFileChange(file)
  await handleHMRUpdate(file, server)
})
// 新增文件
watcher.on('add', (file) => {
  handleFileAddUnlink(normalizePath(file), server)
})
// 删除文件
watcher.on('unlink', (file) => {
  handleFileAddUnlink(normalizePath(file), server, true)
})
```