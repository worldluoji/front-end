# nginx gzip
HTTP 可以对传输的内容进行压缩，减少网络实际传输数据的大小。原理就是 服务器对文件进行 gzip 压缩后，再进行传输，浏览器收到资源后再解压的过程。

对于 js、text、json、css 这种纯文本进行压缩，效果特别好，不用改变代码即可提升网站响应速度；

压缩过程是需要花费 CPU 资源的，对大文件(图片、音乐等)进行压缩，不仅不能提升网站响应速度，还会增加服务器压力，让网站有明显的卡顿感。

## 相关配置
```
# 开启gzip，关闭用off
gzip on;

# 是否在http header中添加Vary: Accept-Encoding，建议开启
gzip_vary on;

# gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间，推荐6
gzip_comp_level 6;

# 设置压缩所需要的缓冲区大小 
gzip_buffers 16 8k;

# 设置gzip压缩针对的HTTP协议版本
gzip_http_version 1.1;

# 选择压缩的文件类型，其值可以在 mime.types 文件中找到。
gzip_types text/plain text/css application/json application/javascript


# 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
gzip_min_length 1k;

# gzip_proxied any;

```