# 使用vite创建项目
```
npm create vite 
or
pmpm create vite 
or
yarn create vite
```
然后按照提示一步一步选择即可。

对于React项目，Vite 已经比 使用 Webpack 的 CRA 快了接近 6 倍。

## 配置文件
在使用 Vite 的过程，我们需要对 Vite 做一些配置，以满足日常开发的需要。
你可以通过两种方式来对 Vite 进行配置，一是通过命令行参数，如vite --port=8888。

二是通过配置文件，一般情况下，大多数的配置都通过配置文件的方式来声明。
Vite 当中支持多种配置文件类型，包括.js、.ts、.mjs三种后缀的文件，实际项目中一般使用vite.config.ts作为配置文件。


## 生产打包
```
npm run build
```
实际执行了"tsc && vite build"命令，这里tsc做ts类型检查，tsconfig.json中,noEmit为true，表示只做类型检查不输出产物。
真正打包的实际是Rollup.


## svg图加载
- Vue2 项目中可以使用 vite-plugin-vue2-svg插件。
- Vue3 项目中可以引入 vite-svg-loader。
- React 项目使用 vite-plugin-svgr插件。
```
npm i vite-plugin-svgr -D
```

## JSON加载
JSON 加载
Vite 中已经内置了对于 JSON 文件的解析，底层使用@rollup/pluginutils 的 dataToEsm 方法将 JSON 对象转换为一个包含各种具名导出的 ES 模块，使用姿势如下:
```
import { version } from '../../../package.json';
```
不过你也可以在配置文件禁用按名导入的方式:
```
// vite.config.ts
{
  json: {
    stringify: true
  }
}
```
这样会将 JSON 的内容解析为export default JSON.parse("xxx")，这样会失去按名导出的能力，不过在 JSON 数据量比较大的时候，可以优化解析性能。