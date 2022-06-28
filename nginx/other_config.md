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