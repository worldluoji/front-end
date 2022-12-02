# island-ssg

## 安装依赖
```
npm install
```

## cli编译
```
npm run start
```
这里其实是使用tsup对cli.ts进行编译，而cli.ts中的两个命令，分别是针对dev本地调试和build打包使用。
这样，dev和build的代码都被编译为了dist中的js文件，其中.js为csj风格，.mjs为ems风格。

## island命令link到全局
```
npm link
```
这里其实是将package.json中,bin下配置的island命令link到全局，这样后面可以直接使用island命令了。

## Dev Server启动
```
island dev .
island dev docs 仅启用docs目录
```

## build
```
island build docs
```
然后在终端进入产物目录build里面，执行如下预览命令:
```
serve . 或者
http-server
```
可以看到，island命令是执行了bin/island.js, island.js又是直接导入已经编译好的cli.mjs。
```
import("../dist/cli.mjs");
```
因此，这其实是一个先编译，再使用的过程。

当我们使用island命令，直接会进行构建，然后使用。这其实就是SSG的过程，它本质上是构建阶段的 SSR。


## test
unit test
```
npm run test:init
```

e2e test
```
npm run test:e2e
```

## 问题说明
1. React is not defined 的错误

大家可以把 vite 版本锁定为 3.2.1 即可。当然，加上官方的 react 插件 @vitejs/plugin-react 也能解决这个问题。

具体原因: 我们将 jsx: "react-jsx" 参数配置在 tsconfig.json 里面，vite 在 3.2.1 之后内部不再读取这个参数，导致 jsx 语法编译出现问题。