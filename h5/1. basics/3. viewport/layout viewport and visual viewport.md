# layout viewport and visual viewport
The layout viewport(布局视口) is the viewport into which the browser draws a web page. Essentially, it represents what is available to be seen, while the visual viewport(视觉视口) represents what is currently visible on the user's display device.

This becomes important, for example, on mobile devices, where a pinching gesture can usually be used to zoom in and out on a site's contents. The rendered document doesn't change in any way, so the layout viewport remains the same as the user adjusts the zoom level. Instead, the visual viewport is updated to indicate the area of the page that they can see.

Window.innerWidth 返回窗口的 layout viewport 的宽度。窗口的内部高度——布局视口的高度——则可以从 innerHeight 属性中获取到。


## reference
https://developer.mozilla.org/zh-CN/docs/Glossary/Layout_viewport