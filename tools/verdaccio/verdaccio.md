# verdaccio
verdaccio用于快速搭建一个npm仓库

## 安装 
npm install -g verdaccio

## 启动
verdaccio
```
 info --- Creating default config file in C:\Users\12345\AppData\Roaming\verdaccio\config.yaml
 warn --- config file  - C:\Users\12345\AppData\Roaming\verdaccio\config.yaml
 warn --- "crypt" algorithm is deprecated consider switch to "bcrypt". Read more: https://github.com/verdaccio/monorepo/pull/580
 info --- plugin successfully loaded: verdaccio-htpasswd
 info --- plugin successfully loaded: verdaccio-audit
 warn --- http address - http://localhost:4873/ - verdaccio/5.15.1
 ......
```
可以对config file进行配置, 设置npm包存放的路径、端口号等等

## 添加用户
npm adduser --registry http://localhost:4873/

## 发布npm包到仓库
npm publish --registry http://localhost:4873/

## 安装
npm install --registry http://localhost:4873/

## 删除
如果使用默认配置，包一般在：
C:\Users\12345\AppData\Roaming\verdaccio\storage 路径下，手动删除即可

## 参考文档
https://verdaccio.org/zh-cn/docs


## 常见问题
verdaccio搭建本地npm私库后，上传包到私库报错：
```
http <-- 503, user: xx, req: ‘PUT /helloworld’, error: one of the uplinks is down, refuse to publish
```
解决方法：

1：找到config.yaml新增配置
```
publish:
  allow_offline: true
```
2：检查是否有要求上传包的命名规则