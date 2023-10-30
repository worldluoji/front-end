# resolveConfig
Vite 配置文件解析的逻辑由 resolveConfig 函数统一实现，其中经历了加载配置文件、解析用户插件、加载环境变量、创建路径解析器工厂和生成插件流水线这几个主要的流程。

其次，在加载配置文件的过程中，Vite 需要处理四种类型的配置文件，其中对于 ESM 和 CommonJS 两种格式的 TS 文件，分别采用了AOT和JIT两种编译技术实现了配置加载。

## load configuration files
```
// 这里的 config 是命令行指定的配置，如 vite --configFile=xxx
let { configFile } = config
if (configFile !== false) {
  // 默认都会走到下面加载配置文件的逻辑，除非你手动指定 configFile 为 false
  const loadResult = await loadConfigFromFile(
    configEnv,
    configFile,
    config.root,
    config.logLevel
  )
  if (loadResult) {
    // 解析配置文件的内容后，和命令行配置合并
    config = mergeConfig(loadResult.config, config)
    configFile = loadResult.path
    configFileDependencies = loadResult.dependencies
  }
}
```
第一步是解析配置文件的内容，然后与命令行配置合并。

值得注意的是，后面有一个记录configFileDependencies的操作。
因为配置文件代码可能会有第三方库的依赖，所以当第三方库依赖的代码更改时，Vite 可以通过 HMR 处理逻辑中记录的configFileDependencies检测到更改，再重启 DevServer ，来保证当前生效的配置永远是最新的。

<br>

## resolve customer plugins
第二个重点环节是 解析用户插件。

首先，我们通过 apply 参数 过滤出需要生效的用户插件。

为什么这么做呢？因为有些插件只在开发阶段生效，或者说只在生产环境生效，我们可以通过 apply: 'serve' 或 'build' 来指定它们，
同时也可以将apply配置为一个函数，来自定义插件生效的条件。
```
// resolve plugins
const rawUserPlugins = (config.plugins || []).flat().filter((p) => {
  if (!p) {
    return false
  } else if (!p.apply) {
    return true
  } else if (typeof p.apply === 'function') {
     // apply 为一个函数的情况
    return p.apply({ ...config, mode }, configEnv)
  } else {
    return p.apply === command
  }
}) as Plugin[]
// 对用户插件进行排序
const [prePlugins, normalPlugins, postPlugins] =
  sortUserPlugins(rawUserPlugins)
```
接着，Vite 会拿到这些过滤且排序完成的插件，依次调用插件 config 钩子，进行配置合并
```
// run config hooks
const userPlugins = [...prePlugins, ...normalPlugins, ...postPlugins]
for (const p of userPlugins) {
  if (p.config) {
    const res = await p.config(config, configEnv)
    if (res) {
      // mergeConfig 为具体的配置合并函数，大家有兴趣可以阅读一下实现
      config = mergeConfig(config, res)
    }
  }
}
```
然后解析项目的根目录即 root 参数，默认取 process.cwd()的结果
```
// resolve root
const resolvedRoot = normalizePath(
  config.root ? path.resolve(config.root) : process.cwd()
)
```
紧接着处理 alias ，这里需要加上一些内置的 alias 规则，如@vite/env、@vite/client这种直接重定向到 Vite 内部的模块:
```
// resolve alias with internal client alias
const resolvedAlias = mergeAlias(
  clientAlias,
  config.resolve?.alias || config.alias || []
)

const resolveOptions: ResolvedConfig['resolve'] = {
  dedupe: config.dedupe,
  ...config.resolve,
  alias: resolvedAlias

```

<br>

## load env
```
// load .env files
const envDir = config.envDir
  ? normalizePath(path.resolve(resolvedRoot, config.envDir))
  : resolvedRoot
const userEnv =
  inlineConfig.envFile !== false &&
  loadEnv(mode, envDir, resolveEnvPrefix(config))
```
loadEnv 其实就是扫描 process.env 与 .env文件，解析出 env 对象，这个对象的属性最终会被挂载到import.meta.env 这个全局对象上。

解析 env 对象的实现思路如下:

- 遍历 process.env 的属性，拿到指定前缀开头的属性（默认指定为VITE_），并挂载 env 对象上
- 遍历 .env 文件，解析文件，然后往 env 对象挂载那些以指定前缀开头的属性。遍历的文件先后顺序如下(下面的 mode 开发阶段为 development，生产环境为production):
```
.env.${mode}.local
.env.${mode}
.env.local
.env
```
特殊情况: 如果中途遇到 NODE_ENV 属性，则挂到 process.env.VITE_USER_NODE_ENV，Vite 会优先通过这个属性来决定是否走生产环境的构建。

接下来是对资源公共路径即base URL的处理，逻辑集中在 resolveBaseUrl 函数当中:
```
// 解析 base url
const BASE_URL = resolveBaseUrl(config.base, command === 'build', logger)
// 解析生产环境构建配置
const resolvedBuildOptions = resolveBuildOptions(config.build)
```
resolveBaseUrl里面有这些处理规则需要注意:
- 空字符或者 ./ 在开发阶段特殊处理，全部重写为/
- .开头的路径，自动重写为 /
- 以http(s)://开头的路径，在开发环境下重写为对应的 pathname
- 确保路径开头和结尾都是/

还有对cacheDir的解析，这个路径相对于在 Vite 预编译时写入依赖产物的路径:
```
// resolve cache directory
const pkgPath = lookupFile(resolvedRoot, [`package.json`], true /* pathOnly */)
// 默认为 node_module/.vite
const cacheDir = config.cacheDir
  ? path.resolve(resolvedRoot, config.cacheDir)
  : pkgPath && path.join(path.dirname(pkgPath), `node_modules/.vite`)
```

紧接着处理用户配置的assetsInclude，将其转换为一个过滤器函数
```
const assetsFilter = config.assetsInclude
  ? createFilter(config.assetsInclude)
  : () => false

// Vite 会将用户传入的 assetsInclude 和内置的规则合并:
assetsInclude(file: string) {
  return DEFAULT_ASSETS_RE.test(file) || assetsFilter(file)
}
```
这个配置决定是否让 Vite 将对应的后缀名视为静态资源文件（asset）来处理。

<br>

## resolve path
第四个核心环节: 定义路径解析器工厂。这里所说的路径解析器，是指调用插件容器进行路径解析的函数:
```
const createResolver: ResolvedConfig['createResolver'] = (options) => {
  let aliasContainer: PluginContainer | undefined
  let resolverContainer: PluginContainer | undefined
  // 返回的函数可以理解为一个解析器
  return async (id, importer, aliasOnly, ssr) => {
    let container: PluginContainer
    if (aliasOnly) {
      container =
        aliasContainer ||
        // 新建 aliasContainer
    } else {
      container =
        resolverContainer ||
        // 新建 resolveContainer
    }
    return (await container.resolveId(id, importer, undefined, ssr))?.id
  }
}
```
这个解析器未来会在依赖预构建的时候用上，示例如下:
```
const resolve = config.createResolver()
// 调用以拿到 react 路径
rseolve('react', undefined, undefined, false)
```
这里有aliasContainer和resolverContainer两个工具对象，它们都含有resolveId这个专门解析路径的方法，可以被 Vite 调用来获取解析结果。

接着会顺便处理一个 public 目录，也就是 Vite 作为静态资源服务的目录：
```
const { publicDir } = config
const resolvedPublicDir =
  publicDir !== false && publicDir !== ''
    ? path.resolve(
        resolvedRoot,
        typeof publicDir === 'string' ? publicDir : 'public'
      )
    : ''
```
最后通过 resolved 对象来整理一下
```
const resolved: ResolvedConfig = {
  ...config,
  configFile: configFile ? normalizePath(configFile) : undefined,
  configFileDependencies,
  inlineConfig,
  root: resolvedRoot,
  base: BASE_URL
  // 其余配置不再一一列举
}
```

<br>

## generate plugins line
```
;(resolved.plugins as Plugin[]) = await resolvePlugins(
  resolved,
  prePlugins,
  normalPlugins,
  postPlugins
)

// call configResolved hooks
await Promise.all(userPlugins.map((p) => p.configResolved?.(resolved)))
```
先生成完整插件列表传给resolve.plugins，而后调用每个插件的 configResolved 钩子函数。

至此，所有核心配置都生成完毕。不过，后面 Vite 还会处理一些边界情况，在用户配置不合理的时候，给用户对应的提示。
比如：用户直接使用alias时，Vite 会提示使用resolve.alias。

最后，resolveConfig 函数会返回 resolved 对象，也就是最后的配置集合，那么配置解析服务到底也就结束了。

<br>

## loadConfigFromFile
```
const loadResult = await loadConfigFromFile(/*省略传参*/)
```
根据文件后缀和模块格式可以分为下面这几类:
- TS + ESM 格式
- TS + CommonJS 格式
- JS + ESM 格式
- JS + CommonJS 格式

Vite 是如何加载配置文件的？一共分两个步骤:
- 识别出配置文件的类别
- 根据不同的类别分别解析出配置内容

### 1. 识别配置文件的类别
首先 Vite 会检查项目的 package.json ，如果有type: "module"则打上 isESM 的标识:
```
try {
  const pkg = lookupFile(configRoot, ['package.json'])
  if (pkg && JSON.parse(pkg).type === 'module') {
    isMjs = true
  }
} catch (e) {}
```
然后，Vite 会寻找配置文件路径，代码简化后如下:
```
let isTS = false
let isESM = false
let dependencies: string[] = []
// 如果命令行有指定配置文件路径
if (configFile) {
  resolvedPath = path.resolve(configFile)
  // 根据后缀判断是否为 ts 或者 esm，打上 flag
  isTS = configFile.endsWith('.ts')
  if (configFile.endsWith('.mjs')) {
      isESM = true
    }
} else {
  // 从项目根目录寻找配置文件路径，寻找顺序:
  // - vite.config.js
  // - vite.config.mjs
  // - vite.config.ts
  // - vite.config.cjs
  const jsconfigFile = path.resolve(configRoot, 'vite.config.js')
  if (fs.existsSync(jsconfigFile)) {
    resolvedPath = jsconfigFile
  }

  if (!resolvedPath) {
    const mjsconfigFile = path.resolve(configRoot, 'vite.config.mjs')
    if (fs.existsSync(mjsconfigFile)) {
      resolvedPath = mjsconfigFile
      isESM = true
    }
  }

  if (!resolvedPath) {
    const tsconfigFile = path.resolve(configRoot, 'vite.config.ts')
    if (fs.existsSync(tsconfigFile)) {
      resolvedPath = tsconfigFile
      isTS = true
    }
  }
  
  if (!resolvedPath) {
    const cjsConfigFile = path.resolve(configRoot, 'vite.config.cjs')
    if (fs.existsSync(cjsConfigFile)) {
      resolvedPath = cjsConfigFile
      isESM = false
    }
  }
}
```
在寻找路径的同时， Vite 也会给当前配置文件打上isESM和isTS的标识，方便后续的解析。


### 2. 根据类别解析配置
对于 ESM 格式配置的处理代码如下:
```
let userConfig: UserConfigExport | undefined

if (isESM) {
  const fileUrl = require('url').pathToFileURL(resolvedPath)
  // 首先通过 Esbuild 将配置文件编译打包成 js 代码
  const bundled = await bundleConfigFile(resolvedPath, true)
  dependencies = bundled.dependencies
  // TS + ESM
  if (isTS) {
    // 对于 TS 配置文件来说，Vite 会将编译后的 js 代码写入临时文件，通过 Node 原生 ESM Import 来读取这个临时的内容，以获取到配置内容，再直接删掉临时文件
    fs.writeFileSync(resolvedPath + '.js', bundled.code)
    userConfig = (await dynamicImport(`${fileUrl}.js?t=${Date.now()}`))
      .default
    fs.unlinkSync(resolvedPath + '.js')
    debug(`TS + native esm config loaded in ${getTime()}`, fileUrl)
  } 
  //  JS + ESM
  else {
    // 而对于 JS 配置文件来说，Vite 会直接通过 Node 原生 ESM Import 来读取，也是使用 dynamicImport 函数的逻辑
    userConfig = (await dynamicImport(`${fileUrl}?t=${Date.now()}`)).default
    debug(`native esm config loaded in ${getTime()}`, fileUrl)
  }
}
```
这种先编译配置文件，再将产物写入临时目录，最后加载临时目录产物的做法，也是 AOT (Ahead Of Time)编译技术的一种具体实现。
```
export const dynamicImport = new Function('file', 'return import(file)')
```
为什么要用 new Function 包裹？这是为了避免打包工具处理这段代码，比如 Rollup 和 TSC，类似的手段还有 eval。

为什么 import 路径结果要加上时间戳 query？这其实是为了让 dev server 重启后仍然读取最新的配置，避免缓存。


<br>

对于 CommonJS 格式的配置文件，Vite 集中进行了解析:
```
// 对于 js/ts 均生效
// 使用 esbuild 将配置文件编译成 commonjs 格式的 bundle 文件
const bundled = await bundleConfigFile(resolvedPath)
dependencies = bundled.dependencies
// 加载编译后的 bundle 代码
userConfig = await loadConfigFromBundledFile(resolvedPath, bundled.code)
```

loadConfigFromBundledFile:
```
async function loadConfigFromBundledFile(
  fileName: string,
  bundledCode: string
): Promise<UserConfig> {
  const extension = path.extname(fileName)
  const defaultLoader = require.extensions[extension]!
  require.extensions[extension] = (module: NodeModule, filename: string) => {
    if (filename === fileName) {
      ;(module as NodeModuleWithCompile)._compile(bundledCode, filename)
    } else {
      defaultLoader(module, filename)
    }
  }
  // 清除 require 缓存
  delete require.cache[require.resolve(fileName)]
  const raw = require(fileName)
  const config = raw.__esModule ? raw.default : raw
  require.extensions[extension] = defaultLoader
  return config
}
```
大体的思路是通过拦截原生 require.extensions 的加载函数来实现对 bundle 后配置代码的加载.

原生 require 对于 js 文件的加载代码是这样的:
```
Module._extensions['.js'] = function (module, filename) {
  var content = fs.readFileSync(filename, 'utf8')
  module._compile(stripBOM(content), filename)
}
```
Node.js 内部也是先读取文件内容，然后编译该模块。当代码中调用 module._compile 相当于手动编译一个模块，该方法在 Node 内部的实现如下:
```
Module.prototype._compile = function (content, filename) {
  var self = this
  var args = [self.exports, require, self, filename, dirname]
  return compiledWrapper.apply(self.exports, args)
}
```
在调用完 module._compile 编译完配置代码后，进行一次手动的 require，即可拿到配置对象:
```
const raw = require(fileName)
const config = raw.__esModule ? raw.default : raw
// 恢复原生的加载方法
require.extensions[extension] = defaultLoader
// 返回配置
return config
```
这种运行时加载 TS 配置的方式，也叫做 JIT(即时编译)，这种方式和 AOT 最大的区别在于不会将内存中计算出来的 js 代码写入磁盘再加载，
而是通过拦截 Node.js 原生 require.extension 方法实现即时加载。


至此，配置文件的内容已经读取完成，等后处理完成再返回即可:
```
// 处理是函数的情况
const config = await (typeof userConfig === 'function'
  ? userConfig(configEnv)
  : userConfig)

if (!isObject(config)) {
  throw new Error(`config must export or return an object.`)
}
// 接下来返回最终的配置信息
return {
  path: normalizePath(resolvedPath),
  config,
  // esbuild 打包过程中搜集的依赖
  dependencies
}
```