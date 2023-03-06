# performance optimize

## 1. HTTP2
传统的 HTTP 1.1 存在队头阻塞的问题，同一个 TCP 管道中同一时刻只能处理一个 HTTP 请求，
也就是说如果当前请求没有处理完，其它的请求都处于阻塞状态，另外浏览器对于同一域名下的并发请求数量都有限制，
比如 Chrome 中只允许 6 个请求并发（这个数量不允许用户配置），也就是说请求数量超过 6 个时，多出来的请求只能排队、等待发送。

因此，在 HTTP 1.1 协议中，队头阻塞和请求排队问题很容易成为网络层的性能瓶颈。而 HTTP 2 的诞生就是为了解决这些问题，它主要实现了如下的能力：

1) 多路复用。将数据分为多个二进制帧，多个请求和响应的数据帧在同一个 TCP 通道进行传输，解决了之前的队头阻塞问题。
而与此同时，在 HTTP2 协议下，浏览器不再有同域名的并发请求数量限制，因此请求排队问题也得到了解决。

2) Server Push，即服务端推送能力。可以让某些资源能够提前到达浏览器，比如对于一个 html 的请求，
通过 HTTP 2 我们可以同时将相应的 js 和 css 资源推送到浏览器，省去了后续请求的开销。

在 Vite 中，我们可以通过vite-plugin-mkcert在本地 Dev Server 上开启 HTTP2:

```
npm i vite-plugin-mkcert -D
```

vite-plugin-mkcert插件配置：
```
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    // https 选项需要开启
    https: true,
  },
});
```
插件的原理也比较简单，由于 HTTP2 依赖 TLS 握手，插件会帮你自动生成 TLS 证书，然后支持通过 HTTPS 的方式启动，
而 Vite 会自动把 HTTPS 服务升级为 HTTP2。

其中有一个特例，即当你使用 Vite 的 proxy 配置时，Vite 会将 HTTP2 降级为 HTTPS，
不过这个问题你可以通过vite-plugin-proxy-middleware插件解决。

对于线上的项目来说，HTTP2 对性能的提升非常可观，几乎成为了一个必选项。
刚刚用到的 vite-plugin-mkcert插件仅用于开发阶段，在生产环境中我们会对线上的服务器进行配置，从而开启 HTTP2 的能力，
如 Nginx 的 HTTP2 配置。

<br>

##  DNS 预解析
浏览器在向跨域的服务器发送请求时，首先会进行 DNS 解析，将服务器域名解析为对应的 IP 地址。我们通过 dns-prefetch 技术将这一过程提前，降低 DNS 解析的延迟时间，具体使用方式如下:
```
<!-- href 为需要预解析的域名 -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com/"> 
```
一般情况下 dns-prefetch会与preconnect 搭配使用，前者用来解析 DNS，而后者用来会建立与服务器的连接，
建立 TCP 通道及进行 TLS 握手，进一步降低请求延迟。使用方式如下所示:
```
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
<link rel="dns-prefetch" href="https://fonts.gstatic.com/">
```
值得注意的是，对于 preconnect 的 link 标签一般需要加上 crorssorigin(跨域标识)，否则对于一些字体资源 preconnect 会失效。

<br>

## Preload/Prefetch
对于一些比较重要的资源，我们可以通过 Preload 方式进行预加载，即在资源使用之前就进行加载，而不是在用到的时候才进行加载，
这样可以使资源更早地到达浏览器。具体使用方式如下:
```
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
```
// vite.config.ts
export default {
  build: {
    polyfillModulePreload: true
  }
}
```

Prefetch 也是一个比较常用的优化方式，它相当于告诉浏览器空闲的时候去预加载其它页面的资源，比如对于 A 页面中插入了这样的 link 标签:
```
<link rel="prefetch" href="https://B.com/index.js" as="script">
```
这样浏览器会在 A 页面加载完毕之后去加载B这个域名下的资源，如果用户跳转到了B页面中，浏览器会直接使用预加载好的资源，
从而提升 B 页面的加载速度。而相比 Preload， Prefetch 的浏览器兼容性不太乐观。

<br>

## 产物分析报告
为了能可视化地感知到产物的体积情况，推荐大家用rollup-plugin-visualizer来进行产物分析。使用方式如下:
```
// 注: 首先需要安装 rollup-plugin-visualizer 依赖
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      // 打包完成后自动打开浏览器，显示产物体积报告
      open: true,
    }),
  ],
});
```
当你执行npm run build之后，浏览器会自动打开产物分析页面，这样针对性的对模块进行优化。

<br>

## 资源压缩
### JSS压缩
在 Vite 生产环境构建的过程中，JavaScript 产物代码会自动进行压缩，相关的配置参数如下:
```
// vite.config.ts
export default {
  build: {
    // 类型: boolean | 'esbuild' | 'terser'
    // 默认为 `esbuild`
    minify: 'esbuild',
    // 产物目标环境
    target: 'modules',
    // 如果 minify 为 terser，可以通过下面的参数配置具体行为
    // https://terser.org/docs/api-reference#minify-options
    terserOptions: {}
  }
}
```
值得注意的是target参数，也就是压缩产物的目标环境。Vite 默认的参数是modules，即如下的 browserlist:
```
['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1']
```
例如：
```
// 业务代码中
info == null ? undefined : info.name
```
如果你将 target 配置为exnext，也就是最新的 JS 语法，会发现压缩后的代码变成了下面这样:
```
info?.name
```
这就是压缩工具在背后所做的事情，将某些语句识别之后转换成更高级的语法，从而达到更优的代码体积。

由于 Vite 默认的 target 无法覆盖所有支持原生 ESM 的浏览器，经过压缩器的语法转换后，
在某些 iOS 机型(iOS 11.2)上出现白屏事故，最后通过指定 target 为 es2015 或者es6 解决了这个问题。

因此，为了线上的稳定性，推荐大家最好还是将 target 参数设置为ECMA语法的最低版本es2015/es6。

### CSS 压缩
对于 CSS 代码的压缩，Vite 中的相关配置如下:
```
// vite.config.ts
export default {
  build: {
    // 设置 CSS 的目标环境
    cssTarget: ''
  }
}
```
默认情况下 Vite 会使用 Esbuild 对 CSS 代码进行压缩，一般不需要我们对 cssTarget 进行配置。

不过在需要兼容安卓端微信的 webview 时，我们需要将 build.cssTarget 设置为 chrome61，以防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式，出现样式问题。

### 图片压缩
图片资源是一般是产物体积的大头，如果能有效地压缩图片体积，那么对项目体积来说会得到不小的优化。
而在 Vite 中我们一般使用 vite-plugin-imagemin来进行图片压缩。

<br>

## 产物拆包
见 code splitting

<br>

## 按需加载
React有 loadable、React.lazy, Vue3 可以 defineAsyncComponent 等

<br>

## 预渲染优化
预渲染是当今比较主流的优化手段，主要包括服务端渲染(SSR)和静态站点生成(SSG)这两种技术。

