# .js和.mjs
我们使用 .js 扩展名的模块文件，但在其它一些文章中，你可能会看到 .mjs 扩展名的使用。V8 推荐了这样的做法，比如有下列理由：
- 比较清晰，这可以指出哪些文件是模块，哪些是常规的 JavaScript。
- 这能保证你的模块可以被运行时环境和构建工具识别，比如 Node.js 和 Babel。

但是我们决定继续使用 .js 扩展名，未来可能会更改。为了使模块可以在浏览器中正常地工作，你需要确保你的服务器能够正常地处理 Content-Type 头，其应该包含 JavaScript 的 MIME 类型 text/javascript。如果没有这么做，你可能会得到 一个严格 MIME 类型检查错误：“The server responded with a non-JavaScript MIME type（服务器返回了非 JavaScript MIME 类型）”，并且浏览器会拒绝执行相应的 JavaScript 代码。多数服务器可以正确地处理 .js 文件的类型，但是 .mjs 还不行。已经可以正常响应 .mjs 的服务器有 GitHub 页面 和 Node.js 的 http-server。

如果你已经在使用相应的环境了，那么一切正常。或者如果你还没有，但你知道你在做什么（比如你可以配置服务器以为 .mjs 设置正确的 Content-Type）。但如果你不能控制提供服务，或者用于公开文件发布的服务器，这可能会导致混乱。

为了学习和保证代码的可移植的目的，我们建议使用 .js。

如果你认为使用 .mjs 仅用于模块带来的清晰性非常重要，但不想引入上面描述的相应问题，你可以仅在开发过程中使用 .mjs，而在构建过程中将其转换为 .js。

另注意：
- 一些工具不支持 .mjs，比如 TypeScript。
- `<script type="module">` 属性用于指示引入的模块


## 参考文档
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules