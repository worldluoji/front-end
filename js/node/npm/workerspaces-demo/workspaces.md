# workspaces
workspaces 是 npm v7.x, 也就是 Node@15.0.0 新增的功能，所以请保持你的本地环境版本大于它们。

<br>

## 优势
1. 依赖共享。子工作区可以使用主工作区的所有依赖；
2. 可以将子工作区导出到node_modules中，供所有工作区使用。

<br>

## demo
初始化工程：
```
npm init -y
npm init -w ./packages/bar
npm init -w ./packages/foo
```

根目录安装lodash
```
npm install lodash
```

为foo单独安装abbrev依赖
```
npm install abbrev -w foo
```

根目录通过--workspace指定执行哪个模块
```
npm run test --workspace=bar
```

执行bar和foo下的test
```
npm run test --workspaces
```

<br>

## 参考
https://docs.npmjs.com/cli/v9/using-npm/workspaces