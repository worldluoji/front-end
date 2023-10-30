# 使用vite创建项目
```
npm init vite@latest
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