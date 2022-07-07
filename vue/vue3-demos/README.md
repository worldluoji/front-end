# vue3-demos

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 注意事项：
VsCode 插件 Vetur 报错， 组件没有export default ..... 
Vue3支持两种写法： Options API 、 script setup
```
https://staging-cn.vuejs.org/guide/introduction.html#api-styles
```
而我组件写法是 Vue3 的语法糖script setup。

经过资料查询是 Vetur(v0.35.0) 暂不支持 TypeScrupt.

解决办法：
- 1. 更换支持ts的语法高亮插件 Volar 以取代 Vetur (推荐此方法)
- 2. 不用 script setup 语法糖，改用 Options API 写法 (不建议)
