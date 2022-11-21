# cli的三个类库

借助社区的 CLI 方案，我们可以很方便地实现如上的几个功能。目前社区中比较知名的 CLI 工具有 3 类。

1. 首先是 Commander.js，属于 Node.js 生态中最早诞生的 CLI 方案，由 Node.js 大神 TJ 进行开发，属于元老级别的方案。

2. 接下来是 Yargs，虽然是后起之秀，但功能足够齐全，非常强大，比如内置参数校验、信息交互等模块，比较适合复杂的 CLI 开发。

3. 最后是社区新秀CAC，优点是轻量、使用方便，整体的包体积只有不到 10 KB，是 Yargs 的 十分之一，Commander 的 三分之一，
并且没有任何第三方依赖，同时也是 Vite 目前所内置的 CLI 搭建方案。

本工程使用CAC，参考src/node/cli.ts
```
npm run start 编译 cli.ts
```

bin/island.js 中引用编译后的 island.js

执行npm link 就可以将 island 命令(即package.json中bin中定义的命令) link 到全局。

该工程执行完 npm link 之后你可以用如下的命令简单测试一下：
```
island dev docs
island build docs
```