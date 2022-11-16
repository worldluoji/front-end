# ts的工程引用
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