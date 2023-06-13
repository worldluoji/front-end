# nginx跨域配置

Nginx的源头设置允许跨域，在 location / {  }  中加入如下代码：
```
location / {  
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers '*';
    if ($request_method = 'OPTIONS') {
        return 200;
    }
}
```
这样配置之后就可以跨域请求服务了， OPTIONS握手请求会返回204状态，不会阻碍POST继续请求。

【以下为后续添加】

后发现vivo、oppo个别机型有提示请求头不支持的问题，最终解决办法是将  Access-Control-Allow-Headers  设置为允许的请求头字段，而不是 *，如下：
```
add_header Access-Control-Allow-Headers 'Origin, X-Requested-With, Content-Type, Accept, Platform, Token';
```

在 CORS 中，可以使用 OPTIONS 方法发起一个预检请求，以检测实际请求是否可以被服务器所接受。

request:
```
OPTIONS /resources/post-here/ HTTP/1.1
Host: bar.example
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```
- 在预检请求(preflight request)中发送的 Access-Control-Request-Method 标头告知服务器之后真正的请求中会采用哪种的 HTTP 方法，在这里将实际使用 POST 请求方法。
- Access-Control-Request-Headers 标头告知服务器实际在真正的请求中会采用哪些请求头，在这里会使用 X-PINGOTHER 和 Content-Type 标头。

response:
```
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
```
Access-Control-Max-Age：权限可以缓存的时间。

200 OK 和 204 No Content 都是允许的状态码，但是部分浏览器错误地认为 204 No Content 也适用于该资源，且不发送后续请求来获取资源内容。

<br>

## refernce
- https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request