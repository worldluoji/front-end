# tsconfig.json 配置说明

## 两个重要参数
```
"target": "es2016", 
"module": "commonjs", 
```
target指定了编译的规范是es2016, 还可以取值es5,es3等，module指定使用的模块规范，比如commonjs,
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