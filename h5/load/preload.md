# Preload/Prefetch
对于一些比较重要的资源，我们可以通过 Preload 方式进行预加载，即在资源使用之前就进行加载，而不是在用到的时候才进行加载，
这样可以使资源更早地到达浏览器。具体使用方式如下:
```html
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="main.js" as="script">
```
其中我们一般会声明 href 和 as 属性，分别表示资源地址和资源类型。
Preload的浏览器兼容性也比较好，目前 90% 以上的浏览器已经支持。

与普通 script 标签不同的是，对于原生 ESM 模块，浏览器提供了modulepreload来进行预加载:
```
<link rel="modulepreload" href="/src/app.js" />
```
仅有 70% 左右的浏览器支持这个特性，不过在 Vite 中我们可以通过配置一键开启 modulepreload 的 Polyfill，从而在使所有支持原生 ESM 的浏览器(占比 90% 以上)都能使用该特性，配置方式如下:
```ts
// vite.config.ts
export default {
  build: {
    polyfillModulePreload: true
  }
}
```

Prefetch 也是一个比较常用的优化方式，它相当于告诉浏览器空闲的时候去预加载其它页面的资源，比如对于 A 页面中插入了这样的 link 标签:
```html
<link rel="prefetch" href="https://B.com/index.js" as="script">
```
这样浏览器会在 A 页面加载完毕之后去加载B这个域名下的资源，如果用户跳转到了B页面中，浏览器会直接使用预加载好的资源，从而提升 B 页面的加载速度。而相比 Preload， Prefetch 的浏览器兼容性不太乐观。

参考:
- https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel/preload
- https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/rel/prefetch