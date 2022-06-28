# install nginx

1. nginx官网下载安装包
https://www.nginx.com/

wget https://nginx.org/download/nginx-1.21.2.tar.gz

2. 解压和安装
```
tar -zxvf nginx-xxx.tar.gz
./configure
make
make install
```
nginx会被安装在/usr/local/nginx目录下

3. 常用命令：
```
cd /usr/local/nginx/sbin
./nginx -V 查看nginx版本
./nginx 启动nginx
./nginx -s stop 直接强制杀死
./nginx -s quit 优雅退出，即处理完正在进行的任务后退出
./nginx -s reload 重新加载配置文件
```