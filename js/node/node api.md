# Node JS常用API

## 1. path.resolve
1) 不带参数时,
```
path.resolve() 
```
返回的是当前的文件的绝对路径/Users/xxxx/

2) 带不是/开头的参数
```
path.resolve('a') 返回的是当前绝对路径拼接现在的参数/Users/xxxx/a
path.resolve('a'，'b') 返回的是当前绝对路径拼接现在的参数/Users/xxxx/a/b
```

其他: Node.js 中，__dirname 总是指向被执行 js 文件的绝对路径

## 2. process.cwd()
process.cwd()方法是流程模块的内置应用程序编程接口，
用于获取node.js流程的当前工作目录。

## 3. readFile
```
import { readFile } from "fs/promises";
let html = await readFile(DEFAULT_HTML_PATH, "utf-8");
```
指定编码读取文件。