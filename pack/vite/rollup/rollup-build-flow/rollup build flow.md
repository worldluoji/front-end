# rollup构建流程
在执行 rollup 命令之后，在 cli 内部的主要逻辑简化如下:
```
// Build 阶段
const bundle = await rollup.rollup(inputOptions);

// Output 阶段
await Promise.all(outputOptions.map(bundle.write));

// 构建结束
await bundle.close();
```
Rollup 内部主要经历了 Build 和 Output 两大阶段。

Build 阶段主要负责创建模块依赖图，初始化各个模块的 AST 以及模块之间的依赖关系.

npm run build 可以打印出bundles信息：

```
{
  cache: {
    modules: [
      {
        ast: 'AST 节点信息，具体内容省略',
        code: 'export const a = 1;',
        dependencies: [],
        id: '/Users/code/rollup-demo/src/data.js',
        // 其它属性省略
      },
      {
        ast: 'AST 节点信息，具体内容省略',
        code: "import { a } from './data';\n\nconsole.log(a);",
        dependencies: [
          '/Users/code/rollup-demo/src/data.js'
        ],
        id: '/Users/code/rollup-demo/src/index.js',
        // 其它属性省略
      }
    ],
    plugins: {}
  },
  closed: false,
  // 挂载后续阶段会执行的方法
  close: [AsyncFunction: close],
  generate: [AsyncFunction: generate],
  write: [AsyncFunction: write]
}
```
经过 Build 阶段的 bundle 对象其实并没有进行模块的打包，这个对象的作用在于存储各个模块的内容及依赖关系，
同时暴露generate和write方法，以进入到后续的 Output 阶段
（write和generate方法唯一的区别在于前者打包完产物会写入磁盘，而后者不会）。

真正进行打包的过程会在 Output 阶段进行，即在bundle对象的 generate或者write方法中进行。
npm run buildGen 可以看到打包后的结果。
```
{
  output: [
    {
      exports: [],
      facadeModuleId: '/Users/code/rollup-demo/src/index.js',
      isEntry: true,
      isImplicitEntry: false,
      type: 'chunk',
      code: 'const a = 1;\n\nconsole.log(a);\n',
      dynamicImports: [],
      fileName: 'index.js',
      // 其余属性省略
    }
  ]
}
```
当然，如果使用 bundle.write 会根据配置将最后的产物写入到指定的磁盘目录中。