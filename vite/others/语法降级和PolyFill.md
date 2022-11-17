# 语法降级和PolyFill
通过 Vite 构建我们完全可以兼容各种低版本浏览器，打包出既支持现代(Modern)浏览器又支持旧版(Legacy)浏览器的产物。

旧版浏览器的语法兼容问题主要分两类: 语法降级问题和 Polyfill 缺失问题。
前者比较好理解，比如某些浏览器不支持箭头函数，我们就需要将其转换为function(){}语法；
而对后者来说，Polyfill本身可以翻译为垫片，也就是为浏览器提前注入一些 API 的实现代码，如Object.entries方法的实现，
这样可以保证产物可以正常使用这些 API，防止报错。

这两类问题本质上是通过前端的编译工具链(如Babel)及 JS 的基础 Polyfill 库(如corejs)来解决的，不会跟具体的构建工具所绑定。
也就是说，对于这些本质的解决方案，在其它的构建工具(如 Webpack)能使用，在 Vite 当中也完全可以使用。

## 解决问题的工具
解决上述提到的两类语法兼容问题，主要需要用到两方面的工具，分别包括:
- 编译时工具。代表工具有@babel/preset-env和@babel/plugin-transform-runtime。
- 运行时基础库。代表库包括core-js和regenerator-runtime。

编译时工具的作用是在代码编译阶段进行语法降级及添加 polyfill 代码的引用语句，如:
```
import "core-js/modules/es6.set.js"
```
由于这些工具只是编译阶段用到，运行时并不需要，我们需要将其放入package.json中的devDependencies中。

而运行时基础库是根据 ESMAScript官方语言规范提供各种Polyfill实现代码，
主要包括core-js和regenerator-runtime两个基础库。

不过在 babel 中也会有一些上层的封装，包括：
```
@babel/polyfill
@babel/runtime
@babel/runtime-corejs2
@babel/runtime-corejs3 
```
看似各种运行时库眼花缭乱，其实都是core-js和regenerator-runtime不同版本的封装罢了(@babel/runtime是个特例，不包含 core-js 的 Polyfill)。
这类库是项目运行时必须要使用到的，因此一定要放到package.json中的dependencies中！