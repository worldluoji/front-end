# vite3 new features
1. 开箱即用的 WebSocket 连接策略

Vite 2 中有存在一个痛点，即在存在代理的情况下(比如 Web IDE)需要我们手动配置 WebSocket 使 HMR 生效。
目前 Vite 内置了一套更加完善的 WebSocket 连接策略，自动满足更多场景的 HMR 需求。

2. 服务冷启动性能提升
Vite 3.0 在服务冷启动方面做了非常多的工作，来最大程度提升项目启动的速度。

从 Vite 2.0 到 2.9 版本之前，Vite 会在服务启动之前进行依赖预构建，
也就是使用 Esbuild 将项目中使用到的依赖扫描出来(Scan)，然后分别进行一次打包(Optimize)

这样会造成两个问题:
- 依赖预构建会阻塞 Dev Server 启动，但其实不阻塞的情况下，Dev Server 也可以正常启动。
- 当某些 Vite 插件手动注入了 import 语句，比如调用 babel-plugin-import 添加import Button from 'antd/lib/button'，
就会导致 Vite 的二次预构建，因为 antd/lib/button 的引入代码由 Vite 插件注入，属于 Dev Server 运行时发现的依赖，冷启动阶段无法扫描到。

Vite 3.0，二次预构建的问题也得到了根本的解决。核心的解决思路在于延迟处理，即把预构建的行为延迟到页面加载的最后阶段进行，
此时 Vite 已经编译完了所有的源文件，可以准确地记录下所有需要预构建的依赖(包括 Vite 插件添加的一些依赖)，然后统一进行预构建，将预构建的产物响应给给浏览器即可。

3. import.meta.glob 语法更新
Vite 3.0 对 import.meta.glob 的实现进行了重写，支持了更加灵活的 glob 语法，增加了如下的一些特性:
```
多种模式匹配:
import.meta.glob(["./dir/*.js", "./another/*.js"]);
否定模式(!):
import.meta.glob(["./dir/*.js", "!**/bar.js"]);
命名导入，可以更好地做到 Tree Shaking:
import.meta.glob("./dir/*.js", { import: "setup" });
自定义 query 参数:
import.meta.glob("./dir/*.js", { query: { custom: "data" } });
指定 eager 模式，替换掉原来import.meta.globEager:
import.meta.glob("./dir/*.js", { eager: true });
```

4. 生产阶段的更新

1) SSR 产物默认使用 ESM 格式
   
在当下的社区生态中，众多 SSR 框架已经在使用 ESM 格式作为默认的产物格式。Vite 3.0 也积极拥抱社区，支持 SSR 构建默认打包出 ESM 格式的产物。

2) Relative Base 支持
   
Vite 3.0 正式支持 Relative Base(即配置base: '')，主要用于构建时无法确定 base 地址的场景。

3) Esbuild 预构建用于生产环境

这应该是 Vite 架构上非常大的一个改动: 将原来仅仅用于开发阶段的依赖预构建功能应用在生产环境。
在 Vite 2.x 中，开发阶段使用 Esbuild 来打包依赖，而在生产环境使用 Rollup 进行打包，
用 @rollupjs/plugin-commonjs 来处理 cjs 的依赖，这样做会导致依赖处理的不一致问题，造成一些生产构建中的 bug。

但 Vite 3.0 中支持通过配置将 Esbulid 预构建同时用于开发环境和生产环境，仅添加optimizeDeps.disabled: false 的配置即可。
不过这个改动确实比较大，Vite 团队不打算将此作为 v3 的正式更新内容，而是一个实验性质的功能，不会默认开启。