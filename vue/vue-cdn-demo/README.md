## 使用CND引入Vue全家桶

适用场景：低代码动态加载组件，组件中也使用了Vue示例，这时候就需要保证全局Vue实例的唯一性，否则就会报类似错误：
```
Uncaught TypeError: Failed to resolve module specifier "vue". Relative references must start with either "/", "./", or "../".
```
本工程使用了插件rollup-plugin-external-globals，也可以使用rollup-plugin-external-globals插件。