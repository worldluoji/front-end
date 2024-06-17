# nginx 平滑升级
如果想对nginx的版本进行更新，或者要应用一些新的模块，最简单的做法就是停止当前的nginx服务，然后开启新的nginx服务。但是这样会导致在一段时间内，用户是无法访问服务器。为了解决这个问题，我们就需要用到nginx服务器提供的平滑升级功能。这个也是nginx的一大特点，使用这种方式，就可以使nginx在7*24小时不间断的提供服务了。

接下来我们分析下需求：
nginx的版本最开始使用的是nginx-1.14.2,由于服务升级，需要将nginx的版本升级到nginx-1.16.1,要求nginx不能中断提供服务。

为了应对上述的需求，这里我们给大家提供两种解决方案:
- 方案一:使用nginx服务信号完成nginx的升级
- 方案二:使用nginx安装目录的make命令完成升级

## 环境准备
(1) 先准备两个版本的nginx分别是 1.14.2和1.16.1

(2) 使用nginx源码安装的方式将1.14.2版本安装成功并正确访问

进入安装目录
```
cd ./configure 
make && make install
```
(3)将nginx1.16.1进行参数配置和编译，不需要进行安装。

进入安装目录
```
cd ./configure
make
```

## 方案一:使用nginx服务信号进行升级
第一步:将1.14.2版本的sbin目录下的nginx进行备份
```
cd /usr/local/nginx/sbin
mv nginx nginxold
```
第二步:将nginx1.16.1安装目录编译后的objs目录下的nginx文件，拷贝到原来/usr/local/nginx/sbin目录下
```
cd ~/nginx/core/nginx-1.16.1/objs
cp nginx /usr/local/nginx/sbin
```
第三步:发送信号USR2给nginx的1.14.2版本对应的master进程
```
kill -USR2 `more /usr/local/logs/nginx.pid.oldbin`
```
或者
```
kill -USR2 PID
```
第四步:发送信号QUIT给nginx的1.14.2版本对应的master进程
```
kill -QUIT `more /usr/local/logs/nginx.pid.oldbin`
```
或者
```
kill -QUIT PID
```

## 方案二:使用nginx安装目录的make命令完成升级
第一步:将1.14.2版本的sbin目录下的nginx进行备份
```
cd /usr/local/nginx/sbin
mv nginx nginxold
```

第二步: 将nginx1.16.1安装目录编译后的objs目录下的nginx文件，拷贝到原来/usr/local/nginx/sbin目录下
```
cd ~/nginx/core/nginx-1.16.1/objs
cp nginx /usr/local/nginx/sbin
```
第三步:进入到安装目录，执行
```
make upgrade
```
 
第四步:查看是否更新成功
```
./nginx -v
```
在整个过程中，其实nginx是一直对外提供服务的。并且当nginx的服务器启动成功后，我们是可以通过浏览器进行直接访问的，同时我们可以通过更改html目录下的页面来修改我们在页面上所看到的内容，那么问题来了，为什么我们要修改html目录下的文件，能不能多添加一些页面是nginx的功能更加丰富，还有前面聊到nginx的前端功能又是如何来实现的，这就需要我们对nginx的核心配置文件进行一个详细的学习。

<br>

## 信号补充
通过发送信号给 nginx 进行控制。nginx 主进程的 PID 默认被写入 /usr/local/nginx/logs/nginx.pid。
pid 文件的路径被可在配置时修改，使用 pid 指令指定其他路径。

nginx 主进程支持如下信号：
```
TERM, INT   快速关闭 nginx
QUIT        优雅地关闭 nginx
HUP         修改配置，keeping up with a changed time zone (only for FreeBSD and Linux),
            以新配置启动新的 worker 进程，优雅地关闭老的 worker 进程。
USR1        重新打开日志文件
USR2        升级可执行文件
WINCH       优雅地关闭 worker 进程
```

也可发送信号给某个 worker 进程，支持的信号有：
```
TERM, INT   快速关闭 nginx
QUIT        优雅地关闭 nginx
USR1        重新打开日志文件
WINCH       为调试bug，非正常地关闭 worker 进程（需在配置中使用 debug_points 指令）
```
