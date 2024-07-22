# nginx cache
Nginx 提供了多种缓存机制，其中最常见的是`proxy_cache`和`fastcgi_cache`。下面我将分别解释这两种缓存的配置方法。

### 1. Proxy Cache 配置
`proxy_cache`用于代理缓存，主要用于静态资源或者变化不频繁的内容缓存。

**步骤1：定义缓存区域**
在你的`nginx.conf`文件的`http`或`server`块中定义一个缓存区域：
```nginx
http {
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m inactive=60m;
}
```
这里`/var/cache/nginx`是缓存目录，`my_cache`是缓存区域名称，`10m`是内存大小，`inactive=60m`表示缓存项多久未被访问则会被移除。

**步骤2：配置`location`块**
在你的`location`块中启用`proxy_cache`：
```nginx
location / {
    proxy_cache my_cache;
    proxy_cache_key "$scheme$request_method$host$request_uri";
    proxy_pass http://your_upstream_server;

    # 缓存控制参数
    proxy_cache_valid 200 302 1h;
    proxy_cache_valid 404 1m;
    proxy_cache_use_stale error timeout invalid_header updating http_500;
    proxy_cache_lock on;
    proxy_cache_min_uses 2;
    proxy_cache_revalidate on;
    proxy_cache_methods GET HEAD;
}
```

### 2. FastCGI Cache 配置
`fastcgi_cache`用于FastCGI请求的缓存，适合动态生成的内容。

**步骤1：定义缓存区域**
与`proxy_cache_path`类似，但使用`fastcgi_cache_path`：
```nginx
http {
    fastcgi_cache_path /var/cache/nginx levels=1:2 keys_zone=my_fcgicache:10m inactive=60m;
}
```

**步骤2：配置`location`块**
在`location`块中启用`fastcgi_cache`：
```nginx
location ~ \.php$ {
    fastcgi_cache my_fcgicache;
    fastcgi_cache_key "$scheme$request_method$host$request_uri";
    fastcgi_pass your_fastcgi_upstream;
    
    # 缓存控制参数
    fastcgi_cache_valid 200 302 1h;
    fastcgi_cache_valid 404 1m;
    fastcgi_cache_use_stale error timeout invalid_header updating http_500;
    fastcgi_cache_lock on;
    fastcgi_cache_min_uses 2;
    fastcgi_cache_revalidate on;
    fastcgi_cache_methods GET HEAD;
}
```

### 注意事项：
- **缓存键（cache key）**：`proxy_cache_key`和`fastcgi_cache_key`用于确定缓存的唯一标识符。通常使用请求的URL作为键，但也可以根据需要包含其他信息。
- **缓存有效时间（valid time）**：`proxy_cache_valid`和`fastcgi_cache_valid`用于设置不同HTTP状态码对应的缓存时间。
- **缓存锁（lock）**：`proxy_cache_lock`和`fastcgi_cache_lock`防止并发请求同时更新缓存。
- **缓存最小使用次数（min uses）**：`proxy_cache_min_uses`和`fastcgi_cache_min_uses`用于避免缓存过早淘汰。

确保在修改完配置后重启Nginx服务使配置生效。

示例：
```
http {
    sendfile on;

    access_log off;
    error_log  /data/log/nginx-1.0/error.log  error;

    proxy_cache_path /data/nginx-1.0/cache levels=1:2 keys_zone=cache_zone:10m inactive=60m;

    server {
        listen 80;
        server_name localhost;
        root /usr/local/services/nginx-1.0/html/;

        location / {

        }

        location ~.*\.(gif|jpg|png|css|js)(.*) {
            proxy_cache cache_zone;
            proxy_cache_valid 200 302 24h;
            expires 1d;
            add_header X-Proxy-Cache $upstream_cache_status;
        }
    }
}
```

## reference
https://zhuanlan.zhihu.com/p/414784904