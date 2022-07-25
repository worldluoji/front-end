# vite

## 为什么使用vite
由于 webpack 在项目调试之前，要把所有文件的依赖关系收集完，打包处理后才能启动测试，
很多大项目我们执行调试命令后需要等 1 分钟以上才能开始调试。

这对于开发者来说，这段时间除了摸鱼什么都干不了，而且热更新也需要等几秒钟才能生效，极大地影响了我们开发的效率。
所以针对 webpack 这种打包 bundle 的思路，社区就诞生了 bundless 的框架，Vite 就是其中的佼佼者。

前端的项目之所以需要 webpack 打包，是因为浏览器里的 JavaScript 没有很好的方式去引入其他文件。
webpack 提供的打包功能可以帮助我们更好地组织开发代码，但是现在大部分浏览器都支持了 ES6 的 module 功能，
我们在浏览器内使用 type="module"标记一个 script 后，在 src/main.js 中就可以直接使用 import 语法去引入一个新的 JavaScript 文件。
<em>这样我们其实可以不依赖 webpack 的打包功能，利用浏览器的 module 功能就可以重新组织我们的代码</em>。

```
 <script type="module" src="/src/main.js"></script>
```

<br>

## vite原理
三个问题：
- 浏览器的 module 功能有一些限制需要额外处理。浏览器识别出 JavaScript 中的 import 语句后，
会发起一个新的网络请求去获取新的文件，所以只支持 /、./ 和…/ 开头的路径。浏览器并不知道 Vue 是从哪来，我们第一个要做的，就是分析文件中的 import 语句。如果路径不是一个相对路径或者绝对路径，那就说明这个模块是来自 node_modules，我们需要去 node_modules 查找这个文件的入口文件后返回浏览器。
- ./App.vue 是相对路径，可以找到文件，但是浏览器不支持 .vue 文件的解析;
- index.css 也不是一个合法的 JavaScript 文件;

解决以上三个问题，才能让 Vue 项目很好地在浏览器里跑起来。

<br>

### 解决 node_modules 导入问题

首先我们需要使用 Koa 搭建一个 server，用来<em>拦截浏览器发出的所有网络请求</em>，才能实现上述功能。
在koa-server.js中，我们使用 Koa 启动了一个服务器，并且访问首页内容读取 index.html 的内容。

import {createApp} from Vue 这一步, 由于浏览器无法识别 Vue 的路径，就会直接抛出错误，所以我们要在 Koa 中把 Vue 的路径重写。为了方便演示，我们可以直接使用 replace 语句，把 Vue 改成 /@modules/vue，使用 @module 开头的地址来告诉 Koa 这是一个需要去 node_modules 查询的模块。

在koa-server.js中，我们判断如果请求地址是 .js 结尾，就去读取对应的文件内容，使用 rewriteImport 函数处理后再返回文件内容。在 rewriteImport 中我们实现了路径的替换，把 Vue 变成了 @modules/vue， 现在浏览器就会发起一个http://localhost:24678/@modules/vue 的请求。下一步我们要在 Koa 中拦截这个请求，并且返回 Vue 的代码内容。

在 Koa 中判断请求地址，如果是 @module 的地址，就把后面的 Vue 解析出来，去 node_modules 中查询。然后拼接出目标路径 ./node_modules/vue/package.json 去读取 Vue 项目中 <em>package.json 的 module 字段，这个字段的地址就是 ES6 规范的入口文件</em>。在我们读取到文件后，再使用 rewriteImport 处理后返回即可。

这里还要使用 rewriteImport 的原因是，Vue 文件内部也会使用 import 的语法去加载其它模块。然后我们就可以看到浏览器网络请求列表中多了好几个 Vue 的请求。

经过以上步骤， 就实现了 node_modules 模块的解析，解决了依赖包读取的问题。

<br>

### 解决.vue 的解析问题
.vue的单文件组件，把组件分成 template、style、script 三个部分，我们要做的就是在 Node 环境下，把 template 的内容解析成 render 函数，并且和 script 的内容组成组件对象，再返回即可。

在koa-server.js代码中，我们判断是 .vue 文件请求后，通过 compilerSFC.parse 方法解析 Vue 组件，通过返回的 descriptor.script 获取 JavaScript 代码，并且发起一个 type=template 的方法去获取 render 函数。
在 query.type 是 template 的时候，调用 compilerDom.compile 解析 template 内容，直接返回 render 函数。

上面的代码实现之后，我们就可以在浏览器中看到 App.vue 组件解析的结果。App.vue 会额外发起一个 App.vue?type=template 的请求，最终完成了整个 App 组件的解析。

### 实现对 CSS 文件的支持
在koa-server.js代码中，如果 url 是 CSS 结尾，我们就返回一段 JavaScript 代码。这段 JavaScript 代码会在浏览器里创建一个 style 标签，标签内部放入我们读取的 CSS 文件代码。这种对 CSS 文件的处理方式，让 CSS 以 JavaScript 的形式返回，这样我们就实现了在 Node 中对 Vue 组件的渲染。


## 总结
webpack 启动服务器之前需要进行项目的打包，而 Vite 则是可以直接启动服务，通过浏览器运行时的请求拦截，实现首页文件的按需加载，这样开发服务器启动的时间就和整个项目的复杂度解耦。任何时候我们启动 Vite 的调试服务器，基本都可以在一秒以内响应，这极大地提升了开发者的体验，这也是 Vite 的使用率越来越高的原因。

Vite 的主要目的就是提供一个调试服务器。Vite 也可以和 Vue 解耦，实现对任何框架的支持，如果使用 Vite 支持 React，只需要解析 React 中的 JSX 就可以实现。这也是 Vite 项目的现状，我们只需要使用框架对应的 Vite 插件就可以支持任意框架。

Vite 能够做到快的原因，还有一部分是因为使用了 esbuild 去解析 JavaScript 文件。esbuild 是一个用 Go 语言实现的 JavaScript 打包器，支持 JavaScript 和 TypeScript 语法，现在前端工程化领域的工具也越来越多地使用 Go 和 Rust 等更高效的语言书写，这也是性能优化的一个方向。