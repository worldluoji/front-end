# install nginx by docker
```
docker pull nginx
docker run -d -p 80:80  nginx:latest
```
浏览器访问 http://你的服务器地址，看到如下信息即安装成功：

Welcome to nginx!
If you see this page, the nginx web server is successfully installed and working. Further configuration is required.

For online documentation and support please refer to nginx.org.
Commercial support is available at nginx.com.

Thank you for using nginx.