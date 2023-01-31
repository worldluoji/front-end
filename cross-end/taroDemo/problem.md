1. @tarojs/plugin-react-devtools 安装失败，报错“RequestError: socket hang up”
```
npm install @tarojs/plugin-react-devtools -D
```
具体报这个错误的原因是该插件依赖了electron, 国外地址网络访问请求超时,
解决办法：
```
export ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
```
重新安装即可