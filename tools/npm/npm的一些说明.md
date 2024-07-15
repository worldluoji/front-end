# npm 的一些说明
## 1. 库的版本号详解(^和~区别)
```
"dependencies": {
  "bluebird": "^3.3.4",
  "body-parser": "~1.15.2"
}
```
bluebird的版本号：^3.3.4, body-parse的版本号：~1.15.2

- 波浪符号（~）：他会更新到当前minor version（也就是中间的那位数字）中最新的版本。放到我们的例子中就是：body-parser:~1.15.2，这个库会去匹配更新到1.15.x的最新版本，如果出了一个新的版本为1.16.0，则不会自动升级。波浪符号是曾经npm安装时候的默认符号，现在已经变为了插入符号。

- 插入符号（^）：这个符号就显得非常的灵活了，他将会把当前库的版本更新到当前major version（也就是第一位数字）中最新的版本。放到我们的例子中就是：bluebird:^3.3.4，这个库会去匹配3.x.x中最新的版本，但是他不会自动更新到4.0.0。

<br>

## 2. resolutions
可强制锁定npm包的版本，注意低版本的npm无法锁定。

<br>

## 3. peerDependencies
peerDependencies，同等依赖，或者叫同伴依赖，用于指定当前包（也就是你写的包）兼容的宿主版本。用于解决插件与所依赖包不一致的问题。

antd 只是提供了一套基于 react 的 ui 组件库，但它要求宿主环境需要安装指定的 react 版本，所以你可以看到 node_modules 中 antd 的 package.json 中有这么一项配置:
```
json复制代码
"peerDependencies": {

    "react": ">=16.0.0",

    "react-dom": ">=16.0.0"

},
```
它要求宿主环境安装大于等于 16.0.0 版本的 react，也就是 antd 的运行依赖宿主环境提供的该范围的 react 安装包。

<br>

## 4. npm install xxx --legacy-peer-deps命令是什么？
在NPM v7中，现在默认安装package.json中的peerDependencies。在很多情况下，这会导致版本冲突，从而中断安装过程。

--legacy-peer-deps标志是在v7中引入的，目的是绕过peerDependency自动安装；

它告诉 NPM 忽略项目中引入的各个modules之间的相同modules但不同版本的问题并继续安装，保证各个引入的依赖之间对自身所使用的不同版本modules共存。

<br>

## 5. npm home
当你想查看第三方库的主页和代码仓库时，你可以使用一下命令快速打开：
```
// 打开主页
npm home PACKAGE_NAME
npm home react

// 打开代码仓库
npm repo PACKAGE_NAME
npm repo react
```

