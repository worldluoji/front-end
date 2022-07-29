## 常用的loader

　　1.模板:

　　　　(1)html-loader:将HTML文件导出编译为字符串，可供js识别的其中一个模块

　　　　(2)pug-loader : 加载pug模板

　　　　(3)jade-loader : 加载jade模板(是pug的前身，由于商标问题改名为pug)

　　　　(4)ejs-loader : 加载ejs模板

　　　　(5)handlebars-loader : 将Handlebars模板转移为HTML

　　2.样式:

　　　　(1)css-loader : 解析css文件内的css代码，将 CSS 转化成 CommonJS 模块

　　　　(2)style-loader : 将css模块作为样式导出到DOM中

　　　　(3)less-loader : 加载和转义less文件

　　　　(4)sass-loader : 加载和转义sass/scss文件

　　　　(5)postcss-loader : 使用postcss加载和转义css/sss文件

　　3.脚本转换编译:

　　　　(1)script-loader : 在全局上下文中执行一次javascript文件，不需要解析

　　　　(2)babel-loader : 加载ES6+ 代码后使用Babel转义为ES5后浏览器才能解析

　　　　(3)typescript-loader : 加载Typescript脚本文件

　　　　(4)coffee-loader : 加载Coffeescript脚本文件

　　4.JSON加载:

　　　　(1)json-loader : 加载json文件（默认包含）

　　　　(2)json5-loader : 加载和转义JSON5文件

　　5.Files文件

　　　　(1)raw-loader : 加载文件原始内容(utf-8格式)

　　　　(2)url-loader : 多数用于加载图片资源,超过文件大小显示则返回data URL

　　　　(3)file-loader : 将文件发送到输出的文件夹并返回URL(相对路径)

　　　　(4)jshint-loader : 检查代码格式错误

　　6.加载框架:

　　　　(1)vue-loader : 加载和转义vue组件

　　　　(2)angualr2-template--loader : 加载和转义angular组件

　　　　(3)react-hot-loader : 动态刷新和转义react组件中修改的部分,基于webpack-dev-server插件需先安装,然后在webpack.config.js中引用react-hot-loader

参考官方常用loader: https://www.webpackjs.com/loaders/

<br>

## 常用PlugIn
(1)HtmlWebpackPlugin  生成 html 文件，并将打包生成的js，和css文件，插入到该html中。

(2)CleanWebpackPlugin 使用此插件，可以在每次打包之前，清理dist文件夹。

(3)mini-css-extract-plugin 将 css 单独抽离出来，成生文件，而非内

(4)PurifyCSSPlugin 有时候我们 css 写得多或者写忘记了，会造成亢余代码，purifycss-webpack可以帮我们去除未被html页面使用的css。

(5)UglifyJsPlugin 用于压缩 js，支持文件缓存，和多线程压缩。

(6)HappyPack HappyPack 能让 webpack 把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。因此可以很大程度上优化打包速度。

要注意的是 HappyPack 对 file-loader、url-loader 支持的不友好，所以不建议对该 loader 使用。另外当项目较小时，多线程打包反而会使打包速度变慢。

(7)IgnorePlugin 用于忽略某些特定的模块，让 webpack 不把这些指定的模块打包进去。

(8) DefinePlugin
DefinePlugin是webpack模块自带的，不需要安装。

DefinePlugin 允许在 编译时 创建配置的全局常量，这在需要区分开发模式与生产模式进行不同的操作时，非常有用。
例如，如果想在开发构建中进行日志记录，而不在生产构建中进行，就可以定义一个全局常量去判断是否记录日志。
```
plugins: [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('dev'),
	}),
],
// 在代码中可以直接使用
if (process.env.NODE_ENV !== 'production') {
	console.log('Looks like we are in development mode!');
}
```

(9) CompressionPlugin 可以把文件进行GZip压缩成更小的.gz文件，优化首屏加载时间。

(10) splitChunks （原CommonsChunkPlugin）
抽取代码中公共模块的插件，简单来讲也就是把很多个项目代码中都引入了的模块抽离出来，形成一个单独的文件。这样能有效减少包文件大小

https://blog.csdn.net/qq_41885871/article/details/109305910