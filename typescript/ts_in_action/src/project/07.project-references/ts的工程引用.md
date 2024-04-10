# ts的工程引用
通过项目引用，你可以将庞大的代码库拆分为独立编译和发布的模块。每个子项目可以有自己的 `tsconfig.json` 文件，定义各自的编译选项、输出路径等。
这样不仅有助于组织代码，还可以实现按需加载（懒加载）、独立部署以及更好的构建产物管理。


在old工程里，src目录下有client,common,server三个不同的项目，希望通过编译后，在输出目录dist里没有
src这一层级。 使用include可以实现，但不够优雅，项目一旦过大，难以维护。

工程引用解决了多目录打包，以及打包效率的问题。

在new工程中，代码没有改动，只是在client,common,server三个目录下各自有一个tsconfig.json文件。
要使用工程引用，composite编译选项是必须的：
```
"compilerOptions":{
    "composite": true,
    "declaration": true
}
```
"composite": true 表示可以被增量编译和引用，"declaration": true 表示要生成声明文件。

然后还需要配置其输出的目录（outDir），和依赖的工程(references -> path)
```
"compilerOptions": {
    "outDir": "../../dist/server",
},
"references": [
    { "path": "../common" }
]
```

构建单个工程就可以这样：
```
tsc -b src/client --verbose
```
--verbose会打印出一些编译信息
```
tsc -b src/client --clean
```
--clean选项可以清除构建的文件

<br>

## example
下面是一个简化的 `tsconfig.json` 示例，展示了如何使用 `references` 字段：
```json
{
  "compilerOptions": {
    // ...
  },
  "files": [
    // 根项目的入口文件或 glob 模式匹配的文件列表
  ],
  "references": [
    {
      "path": "./sub-project-a", // 对子项目 A 的引用
      // 可选的 "prepend" 属性，用于控制编译输出是否插入到主项目的输出之前
      // "prepend": true
    },
    {
      "path": "./sub-project-b", // 对子项目 B 的引用
    }
  ]
}
```
在上述配置中，根项目直接或间接依赖于 `./sub-project-a` 和 `./sub-project-b`。
这两个子项目应各自包含一个 `tsconfig.json` 文件，定义它们的编译设置。
编译时，TypeScript 会首先编译子项目（如果有依赖顺序的话，会遵循依赖顺序），然后再编译根项目本身。
