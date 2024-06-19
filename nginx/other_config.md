1. 相同的URL,分Get,Post.两种请求方式，判断请求方式不同进行不同的转发
```
location /http/submitSms{
	if ($request_method!~^(POST)$){
		proxy_pass http://xx.xx.xxxx.xx:8009;
	}
	proxy_pass http://xx.xx.xxxx.xx:8010;
}
```
注意： if后面需要有空格，POST必须大写！！！

<br>

2. proxy_set_header说明

这个指令允许重新定义或者添加发往后端服务器的请求头。value可以包含文本、变量或者它们的组合。
```
location /api/{
	proxy_set_header Host $http_host;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header REMOTE-HOST $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_pass http://localhost:8083/;
}
```

- X-Forwarded-For：用来记录代理服务器的地址，每经过一个代理该字段会追加上一个记录。例如：6.6.6.6, 8.8.8.8。
- X-Real-IP: 同样用来记录代理服务器的地址，但是和上面的不同它不把记录追加到尾部，而是直接替换掉。
- Host: 为后端服务器重新设定Host主机头，$http_host变量的值在请求包含"Host"请求头时为"Host"字段的值，在请求未携带"Host"请求头时为虚拟主机的主域名。

<br>

3. log format

在Nginx日志配置中，可以使用多种内置变量来记录请求和响应的详细信息。以下是一些常用的Nginx日志变量及其简要说明：

1. `$remote_addr` - 客户端的IP地址。
2. `$remote_user` - 已经经过基本认证的用户名称(nginx可配置basic认证)。
3. `$time_local` - 接收到请求时的本地时间，格式为`[19/Feb/2018:13:37:01 +0800]`。
4. `$request` - 客户端发出的请求行，包括方法、URL和协议版本，如`GET /index.html HTTP/1.1`。
5. `$status` - 响应状态码，如`200`表示成功。
6. `$body_bytes_sent` - 发送给客户端的响应体字节数。
7. `$http_referer` - 引用页，即客户端是从哪个页面链接过来的。
8. `$http_user_agent` - 客户端使用的浏览器或其他用户代理的信息。
9. `$http_x_forwarded_for` - 如果请求经过代理服务器，此变量可能会包含客户端原始IP地址。
10. `$request_time` - 处理请求所花费的时间，单位为秒，带有微秒精度。
11. `$upstream_response_time` - 后端服务器处理请求的时间。
12. `$gzip_ratio` - 如果启用了gzip压缩，这个变量表示响应体压缩的比例。
13. `$bytes_sent` - 发送给客户端的总字节数，包括响应头和响应体。
14. `$connection` - 连接的序列号。
15. `$connection_requests` - 当前通过一个连接获得的请求数量。
16. `$msec` - 日志事件发生时的Unix时间戳，精确到毫秒。

这些变量可以在`log_format`指令中定义，以定制日志的输出格式。例如，Nginx的默认组合日志格式`combined`定义为：

```nginx
log_format combined '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent"';
```

你可以根据需要调整这些变量和格式来满足日志记录的具体要求。

<br>

4. `$proxy_add_x_forwarded_for` 和 `$http_x_forwarded_for`

在 Nginx 中，`$proxy_add_x_forwarded_for` 和 `$http_x_forwarded_for` 这两个变量都与HTTP头部 `X-Forwarded-For` 相关，用于追踪客户端通过HTTP代理或负载均衡器访问Web服务器时的原始IP地址。但它们之间存在一些关键的区别：

(1). **$http_x_forwarded_for**:
   - 这个变量直接从客户端发送的HTTP请求头中获取 `X-Forwarded-For` 的值。如果客户端没有通过代理直接访问Nginx，这个值可能不存在或为空。
   - 当客户端已经通过了一个或多个代理服务器时，每个代理服务器通常会在转发请求时将自己的IP地址追加到 `X-Forwarded-For` 头部，形成一个IP地址列表。因此，这个变量的值可能是一个由逗号分隔的IP地址列表。
   - 由于这个值完全来源于客户端的请求头，理论上它可以被篡改，因此在安全性敏感的应用场景中需要谨慎使用。

(2). **$proxy_add_x_forwarded_for**:
   - 这个变量是Nginx自己管理的，它会自动将当前代理（即Nginx自身）接收到请求的客户端IP地址追加到 `X-Forwarded-For` 头部的已有值之后，如果这个头部存在的话。如果不存在，Nginx会新建这个头部字段。
   - 它的设计目的是为了在多层代理的场景下，能够累积记录下所有参与转发的代理服务器的IP以及原始客户端的IP地址，从而提供更完整的请求路径信息。
   - 相比 `$http_x_forwarded_for`，`$proxy_add_x_forwarded_for` 更为安全，因为它是在Nginx内部处理的，不太容易受到外部恶意修改的影响。

总结来说，`$http_x_forwarded_for` 是直接反映请求中携带的 `X-Forwarded-For` 头部信息，可能存在被篡改的风险；而 `$proxy_add_x_forwarded_for` 是Nginx动态生成的，用于在转发请求时可靠地添加或更新客户端的IP信息到该头部，提高了在复杂网络环境中的跟踪准确性与安全性。在配置反向代理或负载均衡时，通常推荐使用 `$proxy_add_x_forwarded_for` 来正确构建或更新 `X-Forwarded-For` 头部。