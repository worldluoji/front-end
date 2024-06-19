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