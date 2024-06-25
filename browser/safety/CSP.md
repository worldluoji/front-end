# CSP
Content Security Policy (CSP) 是一种网络安全策略，用于防御跨站脚本(XSS)、点击劫持(clickjacking)等代码注入攻击。通过定义一个白名单制度，CSP告诉浏览器哪些外部资源（如JavaScript、CSS、图像、字体等）可以加载和执行，以及从哪里加载，从而限制了恶意内容的注入和执行。CSP是通过HTTP响应头（如`Content-Security-Policy`）或HTML的`<meta>`标签来实现的。

### 关键概念和指令

CSP主要通过一系列指令来控制网页内容的安全性，以下是一些常用的指令：

1. **default-src**：定义默认的加载源，适用于所有未明确指定的资源类型。如果其他指令未设置，则此指令的规则生效。

2. **script-src**：指定可以执行脚本的来源，包括内联脚本和外部脚本的URL。

3. **style-src**：规定样式表的来源。

4. **img-src**：定义图片资源的合法来源。

5. **connect-src**：限制可以发起XMLHttpRequest或WebSocket连接的源。

6. **font-src**：规定可加载字体的来源。

7. **object-src**：控制插件内容（如Flash）的加载源，推荐设为`'none'`以禁用此类内容。

8. **media-src**：规定音频和视频的合法来源。

9. **frame-src**：规定可以嵌入iframe的源，有助于防止点击劫持。

10. **base-uri**：限制页面可以使用的基URL。

11. **form-action**：限制可以提交表单的地址。

12. **upgrade-insecure-requests**：自动将HTTP请求升级为HTTPS，减少混合内容问题。

13. **block-all-mixed-content**：阻止页面加载任何混合内容（HTTPS页面中的HTTP资源）。

### 使用 `'unsafe-inline'` 和 `'unsafe-eval'` 

CSP鼓励移除对内联脚本（`'unsafe-inline'`）和eval函数（`'unsafe-eval'`）的支持，因为这两者是XSS攻击的主要载体。通过禁止内联脚本和动态代码执行，可以显著提升应用的安全性。

### 报告模式

CSP还支持一个报告模式，通过设置`Content-Security-Policy-Report-Only`头或`report-uri`/`report-to`指令，可以让浏览器在违反CSP策略时不阻止内容加载，而是记录并报告违规行为，这对于调试和监测CSP策略非常有用。

总之，Content Security Policy为Web应用提供了一层重要的防护，通过细致的配置可以大大减少常见的网络攻击风险。


下面是一个使用 `<meta>` 标签配置 Content Security Policy (CSP) 的示例，并解释其含义：

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' https://apis.example.com; 
               style-src 'self' 'unsafe-inline';
               img-src 'self' data:; 
               connect-src 'self' ws://localhost:8080;">
```

这个例子中的CSP通过 `<meta>` 标签设置，指令分别控制了不同类型的资源加载来源：

- **`default-src 'self'`**: 这是默认的源策略，如果没有为某个特定类型的资源指定策略，就会使用这里的设置。这里设置为 `'self'` 表示只允许从当前站点加载资源。

- **`script-src 'self' https://apis.example.com`**: 控制脚本的加载来源。允许从当前站点加载脚本，以及来自 `https://apis.example.com` 的外部脚本。

- **`style-src 'self' 'unsafe-inline'`**: 控制样式表的加载来源。允许从当前站点加载样式，并允许使用内联样式（`'unsafe-inline'`）。虽然内联样式可能增加安全风险，但在某些情况下可能出于兼容性或实用性考虑而需要。

- **`img-src 'self' data:`**: 控制图片的加载来源。允许从当前站点加载图片，以及允许使用"data:"协议的内联数据（例如Base64编码的图片）。

- **`connect-src 'self' ws://localhost:8080`**: 控制可以建立网络连接的来源，如XMLHttpRequest或WebSocket。这里允许与当前站点建立连接，以及与本地WebSocket服务器(`ws://localhost:8080`)的连接。

通过这样的配置，网站能够严格限制哪些外部资源可以被加载，从而增强网页的安全性，减少跨站脚本攻击(XSS)等安全威胁。不过，需要注意的是，过度严格的CSP也可能影响网站的正常功能，因此在实际部署时需要根据网站的具体需求进行调整，并利用CSP的报告功能监控策略的实际效果。