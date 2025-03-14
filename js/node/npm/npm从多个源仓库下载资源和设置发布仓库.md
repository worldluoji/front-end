# npm从多个源仓库下载资源和设置发布仓库

## 设置npm 安装包时从多个仓储源查找
```
npm config set @mylib:registry=http://127.0.0.1:4873
```
以上命令告诉npm ，当遇到包名为@mylib开头的包时全部从 http://127.0.0.1:4873 这个地址加载


.npmrc文件

可以在项目根目录下新建这个文件, 把这个项目的一些npm的特殊配置，都写入这个文件，在该项目执行npm命令时，会优先使用该文件中的配置，例如：
```
registry=https://registry.npm.taobao.org
@oppo:registry=http://192.168.1.152
@icomm:registry=http://192.168.1.153
sass_binary_site=https://npm.taobao.org/mirrors/node-sass
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs
puppeteer_download_host = https://storage.googleapis.com.cnpmjs.org
DISTURL=https://npm.taobao.org/dist
chromedriver_cdnurl=http://npm.taobao.org/mirrors/chromedriver
puppeteer_skip_chromium_download=true
```


## package.json中设置发布仓库
```
{
  "name": "@mylib/test",
  "version": "1.0.0",
  "description": "npm 本地包",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "测试"
  ],
  "author": "chenxin",
  "license": "ISC",
  "publishConfig": {
    "registry": "http://127.0.0.1:4873"
  }
}
```