# 如何开发一个vite插件

1. 新建一个文件夹vite-plugin-demo，先编写一个 package.json
```
npm init -y
```
并添加：
```
"scripts": {
    "dev": "vite",
    "build": "vite build",
    ....
```

2. 添加 vite 依赖，
```
npm install vite --save-dev
```

3. 根目录添加一个 index.html

此时执行npm run dev 即可在浏览器运行 index.html，
其实就是 vite 把项目根目录当作 http 服务器根目录起了一个 Koa 而已。

4. 添加一个 vite.config.jss

5. 编写自定义插件，并添加到vite.config.jss中

参考 vite-plugin-json5.js

这样就能在js中import .json5文件了

## 参考文档
- https://vitejs.cn/guide/api-plugin.html#authoring-a-plugin
- https://juejin.cn/post/7011305334690021412