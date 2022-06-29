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

X-Forwarded-For

用来记录代理服务器的地址，每经过一个代理该字段会追加上一个记录。例如：6.6.6.6, 8.8.8.8。

X-Real-IP

同样用来记录代理服务器的地址，但是和上面的不同它不把记录追加到尾部，而是直接替换掉。

Host

为后端服务器重新设定Host主机头，$host变量的值在请求包含"Host"请求头时为"Host"字段的值，在请求未携带"Host"请求头时为虚拟主机的主域名。

remote_addr

表示客户端地址，注意如果存在代理服务器，则是最后的代理服务器地址，而非真正的客户端地址。

proxy_pass

经过调整/封装Http头部信息后将请求转发到后端的服务器。