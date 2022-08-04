# nginx跨域配置

Nginx的源头设置允许跨域，在 location / {  }  中加入如下代码：
```
location / {  
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers '*';
    if ($request_method = 'OPTIONS') {
        return 204;
    }
}
```
这样配置之后就可以跨域请求服务了， OPTIONS握手请求会返回204状态，不会阻碍POST继续请求。

【以下为后续添加】

后发现vivo、oppo个别机型有提示请求头不支持的问题，最终解决办法是将  Access-Control-Allow-Headers  设置为允许的请求头字段，而不是 *，如下：
```
add_header Access-Control-Allow-Headers 'Origin, X-Requested-With, Content-Type, Accept, Platform, Token';
```