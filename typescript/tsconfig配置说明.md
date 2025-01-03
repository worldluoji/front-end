# tsconfig.json 配置说明

如果一个目录下存在一个tsconfig.json文件，那么它意味着这个目录是TypeScript项目的根目录。 
tsconfig.json文件中指定了用来编译这个项目的根文件和编译选项。
```
tsc --init
```
使用上述命令可创建tsconfig.json默认配置文件。其它命令可参考：
```
tsc --help
```

## 两个重要参数
```
"target": "es2016", 
"module": "commonjs", 
```
target指定了编译的规范是es2016, 还可以取值es5,es3等，module指定生成的模块规范，比如commonjs,
amd,umd等。

命令行里针对单个文件是这样的：
```
tsc ./a.ts -t es2016 -m commonjs
```

## esModuleInterop
```
"esModuleInterop": true
```
即允许我们使用 es6/d.ts 中的export语法，使得导入时可以使用import 或 require 导入。
如果为false, 则只能使用import.


## files、include、exclude
files指定编译哪些文件：
```
{
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "sourceMap": true
    },
    "files": [
        "core.ts",
        "sys.ts",
        "types.ts",
        "scanner.ts",
        "parser.ts",
        "utilities.ts",
        "binder.ts",
        "checker.ts",
        "emitter.ts",
        "program.ts",
        "commandLineParser.ts",
        "tsc.ts",
        "diagnosticInformationMap.generated.ts"
    ]
}
```

include指定编译哪些文件，exclude指定哪些文件不编译：
```
{
    "compilerOptions": {
        "module": "system",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "outFile": "../../built/local/tsc.js",
        "sourceMap": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
}
```
"files"指定一个包含相对或绝对文件路径的列表。 "include"和"exclude"属性指定一个文件glob匹配模式列表。
支持的glob通配符有：
- `*` 匹配0或多个字符（不包括目录分隔符）
- ? 匹配一个任意字符（不包括目录分隔符）
- **/ 递归匹配任意子目录

如果一个glob模式里的某部分只包含*或.*，那么仅有支持的文件扩展名类型被包含在内（比如默认.ts，.tsx，和.d.ts， 如果 allowJs设置能true还包含.js和.jsx）。

如果"files"和"include"都没有被指定，编译器默认包含当前目录和子目录下所有的TypeScript文件（.ts, .d.ts 和 .tsx），排除在"exclude"里指定的文件。JS文件（.js和.jsx）也被包含进来如果allowJs被设置成true。 如果指定了 "files"或"include"，编译器会将它们结合一并包含进来。 使用 "outDir"指定的目录下的文件永远会被编译器排除，除非你明确地使用"files"将其包含进来（这时就算用exclude指定也没用）。


## extends
tsconfig.json文件可以利用extends属性从另一个配置文件里继承配置。
比如：
config/base.json
```
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```
tsconfig.json 可以直接把配置继承过来
```
{
  "extends": "./configs/base",
}
```

## compileOnSave
在最顶层设置compileOnSave标记，可以让IDE在保存文件的时候根据tsconfig.json重新生成文件。
```
{
    "compileOnSave": true,
    "compilerOptions": {
        "noImplicitAny" : true
    }
}
```
要想支持这个特性需要Visual Studio 2015， TypeScript1.8.4以上并且安装atom-typescript插件。

## 编译选项
编译选项可参考 ts_in_action/src/project/06.tsconfig, 这部分基本可满足日常配置需求

###  isolatedModules
While you can use TypeScript to produce JavaScript code from TypeScript code, it’s also common to use other transpilers such as Babel to do this. 
However, other transpilers only operate on a single file at a time, 
which means they can’t apply code transforms that depend on understanding the full type system. 

These limitations can cause runtime problems with some TypeScript features like const enums and namespaces. 

Setting the isolatedModules flag tells TypeScript to warn you if you write certain code that can’t be correctly interpreted by a single-file transpilation process.

It does not change the behavior of your code, or otherwise change the behavior of TypeScript’s checking and emitting process.

## 配置生效
有时候配置tsconfig.json配置不生效，可尝试重启:
VSCode：按 Ctrl + Shift + P，然后选择 TypeScript: Restart TS server。

更多可参考：
- https://www.tslang.cn/docs/handbook/tsconfig-json.html
- https://www.typescriptlang.org/tsconfig#isolatedModules