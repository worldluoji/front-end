# chunk and chunk group
During the bundling process, modules are combined into chunks. Chunks combine into chunk groups and form a graph (ChunkGraph) interconnected through modules. When you describe an entry point - under the hood, you create a chunk group with one chunk.

./webpack.config.js
```js
module.exports = {
  entry: './index.js',
};
```
One chunk group with the main name created (main is the default name for an entry point). This chunk group contains ./index.js module. As the parser handles imports inside ./index.js new modules are added into this chunk.

Another example:

./webpack.config.js
```js
module.exports = {
  entry: {
    home: './home.js',
    about: './about.js',
  },
};
```
Two chunk groups with names home and about are created. Each of them has a chunk with a module - ./home.js for home and ./about.js for about。

通过这种方式配置入口点，你可以将应用程序的代码分割成不同的块。这意味着用户只需下载他们实际需要的代码。例如，当用户访问主页时，他们只会加载home.js，而不会加载about.js，除非他们也访问了关于页面。这有助于减少初始加载时间，并提高用户体验。

当你的项目包含多个HTML页面时，每个页面可能需要不同的JavaScript逻辑。在这种情况下，你可以为每个页面配置一个单独的入口点。例如，home.js可能包含主页所需的所有JavaScript代码，而about.js则包含关于页面所需的所有代码。
```
There might be more than one chunk in a chunk group. For example **SplitChunksPlugin** splits a chunk into one or more chunks.
```

Chunks come in two forms:
- initial is the **main chunk** for the entry point. This chunk contains all the modules and their dependencies that you specify for an entry point.
- non-initial is a chunk that **may be lazy-loaded**. It may appear when dynamic import or SplitChunksPlugin is being used.