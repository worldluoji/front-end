# 普通js工程迁移到ts
- 这个Project展示了如何从普通js工程迁移到ts的过程
- 假设.js文件在originJSProject/src目录下, student.js通过require导入了greeter.js, 执行node ./src/student.js 能够输出Hello, Jane M. User
- 将originJSProject js工程改造位newTSProject的ts工程 

## 第一步，创建tsconfig.json，我们为TypeScript设置一些东西:
```
{
    "compilerOptions": {
        "outDir": "./built",
        "allowJs": true,
        "target": "es5"
    },
    "include": [
        "./src/**/*"
    ]
}

```

- 读取所有可识别的src目录下的文件（通过include）。
- 接受JavaScript做为输入（通过allowJs）。
- 生成的所有文件放在built目录下（通过outDir）。
- 将JavaScript代码降级到低版本比如ECMAScript 5（通过target）。

<br>

现在，如果你在工程根目录下运行tsc，就可以在built目录下看到生成的文件。 
built下的文件应该与src下的文件相同。 现在你的工程里的TypeScript已经可以工作了。

## 第二步，重新适配
- 将 .js文件重命名为 .ts文件。 如果你使用了JSX，则重命名为 .tsx文件；
- 去除错误，修改后缀后将会看到错误信息。
### 常见错误
- 1. 首先你可能会看到一些类似Cannot find name 'require'.和Cannot find name 'define'.的错误。 遇到这种情况说明你在使用模块。你仅需要告诉TypeScript它们是存在的：
```
// For Node/CommonJS
declare function require(path: string): any;
```

- 2. TS的class中需要声明变量
```
class Student {
    fullName: string
    ......
```
我们在student.ts中修改上面两处。

- 3. 修改moudle.exports
在 greeter.ts中，将 moudle.exports=greeter 改为 export = greeter;

<br>

经过上面3步，你会发现错误消失了。此时进入newTSProject目录，可以使用tsc命令进行编译。
node ./built/student.js, 同样输出 Hello, Jane M. User，与原来的js工程一致。 

## 参考
- 更多迁移问题可以参考：https://www.tslang.cn/docs/handbook/migrating-from-javascript.html