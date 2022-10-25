# http-server
http-server 是一个简单的零配置的命令行 http服务器，它足够强大便于生产和使用，用于本地测试和开发

react或者vue项目打包后，会生成一个build包（当然打包的名字是webpack里面配置的，一般叫build）
第一步：切换到build文件里面
```
cd ./build
```
第二步：全局安装http-server
```
npm i -g http-server
```
当然若是已经安装了就没必要走这步了

第三步：启动项目
```
//3000是端口号 -p 参数是监听端口
http-server -p 3000
```
启动完成，直接到本地3000端口访问项目即可。

附上http-server的参数
```
-p 端口号 (默认 8080)

-a IP 地址 (默认 0.0.0.0)

-d 显示目录列表 (默认 'True')

-i 显示 autoIndex (默认 'True')

-e or --ext 如果没有提供默认的文件扩展名(默认 'html')

-s or --silent 禁止日志信息输出

--cors 启用 CORS via the Access-Control-Allow-Origin header

-o 在开始服务后打开浏览器
-c 为 cache-control max-age header 设置Cache time(秒) , e.g. -c10 for 10 seconds (defaults to '3600'). 禁用 caching, 则使用 -c-1.
-U 或 --utc 使用UTC time 格式化log消息

-P or --proxy Proxies all requests which can't be resolved locally to the given url. e.g.: -P http://someurl.com

-S or --ssl 启用 https

-C or --cert ssl cert 文件路径 (default: cert.pem)

-K or --key Path to ssl key file (default: key.pem).

-r or --robots Provide a /robots.txt (whose content defaults to 'User-agent: *\nDisallow: /')

-h or --help 打印以上列表并退出
```