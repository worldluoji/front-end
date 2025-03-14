# npx
npm 从5.2版开始，增加了 npx 命令。

Node 自带 npm 模块，所以可以直接使用 npx 命令。万一不能用，就要手动安装一下。
```
npm install -g npx
```

## npx解决了什么问题
### npx 想要解决的主要问题，就是调用项目内部安装的模块。

例如项目中安装了
```
npm install -D mocha
```
进行测试

如果想在命令行下调用，必须像下面这样在项目的根目录下执行
```
$ node-modules/.bin/mocha --version
```
npx 就是想解决这个问题，让项目内部安装的模块用起来更方便，只要像下面这样调用就行了
```
$ npx mocha --version
```

### npx还解决了全局安装的问题
除了调用项目内部模块，npx 还能避免全局安装的模块。
比如，create-react-app这个模块是全局安装，npx 可以运行它，而且不进行全局安装。
```
$ npx create-react-app my-react-app
```
上面代码运行时，npx 将create-react-app下载到一个临时目录，使用以后再删除。
所以，以后再次执行上面的命令，会重新下载create-react-app。

载全局模块时，npx 允许指定版本。
```
$ npx uglify-js@3.1.0 main.js -o ./dist/main.js
```
上面代码指定使用 3.1.0 版本的uglify-js压缩脚本。

只要 npx 后面的模块无法在本地发现，就会下载同名模块。比如，本地没有安装http-server模块，下面的命令会自动下载该模块，在当前目录启动一个 Web 服务。

## npx原理
npx 的原理很简单，就是运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在。

由于 npx 会检查环境变量$PATH，所以系统命令也可以调用。

$ npx ls 等同于 ls

注意，Bash 内置的命令不在$PATH里面，所以不能用。比如，cd是 Bash 命令，因此就不能用npx cd。

## --no-install 参数和--ignore-existing 参数
如果想让 npx 强制使用本地模块，不下载远程模块，可以使用--no-install参数。如果本地不存在该模块，就会报错。
```
$ npx --no-install http-server
```
反过来，如果忽略本地的同名模块，强制安装使用远程模块，可以使用--ignore-existing参数。
比如，本地已经全局安装了create-react-app，但还是想使用远程模块，就用这个参数。
```
$ npx --ignore-existing create-react-app my-react-app
```

## 参考
https://www.ruanyifeng.com/blog/2019/02/npx.html