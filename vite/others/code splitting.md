
# Code Splitting
在传统的单 chunk 打包模式下，当项目代码越来越庞大，最后会导致浏览器下载一个巨大的文件，从页面加载性能的角度来说，主要会导致两个问题:
- 无法做到按需加载，即使是当前页面不需要的代码也会进行加载。
- 线上缓存复用率极低，改动一行代码即可导致整个 bundle 产物缓存失效。

进行Code Splitting之后，代码的改动只会影响部分的 chunk 哈希改动。

比如，入口文件引用了A、B、C、D四个组件，当我们修改 A 的代码后，变动的 Chunk 就只有 A 以及依赖 A 的 Chunk 中，
A 对应的 chunk 会变动， B、C、D的chunk不会受影响。

## Vite 默认拆包策略
在生产环境下 Vite 完全利用 Rollup 进行构建，因此拆包也是基于 Rollup 来完成的，
但 Rollup 本身是一个专注 JS 库打包的工具，对应用构建的能力还尚为欠缺，
sVite 正好是补足了 Rollup 应用构建的能力，在拆包能力这一块的扩展就是很好的体现。

```
.
├── assets
│   ├── Dynamic.3df51f7a.js    // Async Chunk
│   ├── Dynamic.f2cbf023.css   // Async Chunk (CSS)
│   ├── favicon.17e50649.svg   // 静态资源
│   ├── index.1e236845.css     // Initial Chunk (CSS)
│   ├── index.6773c114.js      // Initial Chunk
│   └── vendor.ab4b9e1f.js     // 第三方包产物 Chunk
└── index.html                 // 入口 HTML
```

对于 Vite 的拆包能力，从产物结构中就可见一斑。

一方面 Vite 实现了自动 CSS 代码分割的能力，即实现一个 chunk 对应一个 css 文件，比如上面产物中index.js对应一份index.css，
而按需加载的 chunk Danamic.js也对应单独的一份Danamic.css文件，与 JS 文件的代码分割同理，这样做也能提升 CSS 文件的缓存复用率。

而另一方面， Vite 基于 Rollup 的manualChunksAPI 实现了应用拆包的策略:

对于 Initital Chunk 而言，业务代码和第三方包代码分别打包为单独的 chunk，在上述的例子中分别对应index.js和vendor.js。
需要说明的是，这是 Vite 2.9 版本之前的做法，而在 Vite 2.9 及以后的版本，默认打包策略更加简单粗暴，
将所有的 js 代码全部打包到 index.js 中:
```
✓ 40 modules transformed.
dist/assets/react.35ef61ed.svg              4.02 KiB
dist/assets/logo-with-shadow.51249ca9.png   29.40 KiB
dist/assets/back.3d1b206c.jpeg              9.00 KiB
dist/index.html                             0.64 KiB
dist/assets/hello.5205d484.js               0.11 KiB / gzip: 0.12 KiB
dist/assets/index.dccd1fea.css              0.21 KiB / gzip: 0.17 KiB
dist/assets/index.455b0f99.js               145.13 KiB / gzip: 48.13 KiB
```

对于 Async Chunk 而言 ，动态 import 的代码会被拆分成单独的 chunk，如上述的Dynacmic组件、hello组件。

小结一下，Vite 默认拆包的优势在于实现了 CSS 代码分割与业务代码、第三方库代码、动态 import 模块代码三者的分离，
但缺点也比较直观，第三方库的打包产物容易变得比较臃肿，上述例子中的 vendor.js的大小已经达到 500 KB 以上，
显然是有进一步拆包的优化空间的，这个时候我们就需要用到 Rollup 中的拆包 API ——manualChunks 了。