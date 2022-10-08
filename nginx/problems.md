# some problems

1. The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*...

### 前置知识
Access-Control-Allow-Credentials 响应头用于在请求要求包含 credentials（Request.credentials 的值为 include）时，
告知浏览器是否可以将对请求的响应暴露给前端 JavaScript 代码。

当请求的 credentials 模式（Request.credentials）为 include 时，表示跨域请求将发送 Cookie，
浏览器仅在响应标头 Access-Control-Allow-Credentials 的值为 true 的情况下将响应暴露给前端的 JavaScript 代码。

Credentials 可以是 cookies、authorization headers 或 TLS client certificates。

Access-Control-Allow-Credentials 标头需要与 XMLHttpRequest.withCredentials 或 Fetch API 的 Request() 构造函数中的 credentials 选项结合使用。
Credentials 必须在前后端都被配置（即 Access-Control-Allow-Credentials header 和 XHR 或 Fetch request 中都要配置）才能使带 credentials 的 CORS 请求成功。

使用带 credentials 的 XHR：
```
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://example.com/', true);
xhr.withCredentials = true;
xhr.send(null);
```
使用带 credentials 的 Fetch：
```
fetch(url, {
  credentials: 'include'
})
```
当请求的凭据模式为include时,相应中的Access-Control-Allow-Origin标头的值不能是通配符 "*"

### 解决方法：
Access-Control-Allow-Origin 设置具体的域名，以取代"*"

### 参考
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials