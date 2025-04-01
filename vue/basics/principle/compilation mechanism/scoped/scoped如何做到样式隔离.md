# scoped如何做到样式隔离
```vue
<template>
  <div class="block">hello world</div>
</template>

<style scoped>
.block {
  color: red;
}
</style>
```
编译后会变为：
```vue
<template>
  <div data-v-c1c19b25 class="block">hello world</div>
</template>

<style>
.block[data-v-c1c19b25] {
  color: red;
}
</style>
```
div上多了一个data-v-c1c19b25自定义属性，并且css的属性选择器上面也多了一个`[data-v-c1c19b25]`

`.block[data-v-c1c19b25]`：这里面包含两个选择器。.block是一个类选择器，表示class的值包含block。[data-v-c1c19b25]是一个属性选择器，表示存在data-v-c1c19b25自定义属性的元素。

所以只有class包含block，并且存在data-v-c1c19b25自定义属性的元素才能命中这个样式，这样就能避免样式污染。

那么，data-v-c1c19b25这样的自定义属性，是如何生成的呢？

@vitejs/plugin-vue是作为一个plugins插件在vite中使用，vuePlugin函数返回的对象中的transform方法就是对应的插件钩子函数。vite会在对应的时候调用这些插件的钩子函数，vite每解析一个模块都会执行一次transform钩子函数。data-v-c1c19b25也就是在trasform钩子函数中生成的。


## reference
https://juejin.cn/post/7384633860520083508