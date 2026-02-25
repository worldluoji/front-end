# some problems
## 1. The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*...

### 前置知识
Access-Control-Allow-Credentials 是 CORS 机制中用于控制跨域请求是否可以携带用户凭证（如 Cookie、Authorization 头等）的关键响应头，其值为 true 时表示允许携带凭证，但必须配合明确的 Access-Control-Allow-Origin 域名使用，不能与通配符 * 同时存在，以防止跨站请求伪造（CSRF）攻击。

Access-Control-Allow-Credentials 响应头明确告知浏览器服务器是否允许跨域请求携带用户凭证，包括：
- Cookie（用户登录状态）
- Authorization header（如 JWT Token）
- TLS 客户端证书等敏感认证信息

默认情况下，跨域请求不会携带这些凭证，这是浏览器同源策略的安全设计，防止恶意网站窃取用户身份


Access-Control-Allow-Credentials 标头需要与 XMLHttpRequest.withCredentials 或 Fetch API 的 Request() 构造函数中的 credentials 选项结合使用。
Credentials 必须在前后端都被配置（即 Access-Control-Allow-Credentials header 和 XHR 或 Fetch request 中都要配置）才能使带 credentials 的 CORS 请求成功。

使用带 credentials 的 XHR：
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://example.com/', true);
xhr.withCredentials = true;
xhr.send(null);
```
使用带 credentials 的 Fetch：
```js
fetch(url, {
  credentials: 'include'
})
```
当请求的凭据模式为include时,相应中的Access-Control-Allow-Origin标头的值不能是通配符 "*"

### 解决方法：
Access-Control-Allow-Origin 设置具体的域名，以取代"*"

### 参考
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials