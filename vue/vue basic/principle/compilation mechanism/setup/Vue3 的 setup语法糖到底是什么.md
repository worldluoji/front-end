# Vue 3 的 setup语法糖到底是什么
在javascript标准中script标签是不支持setup属性的，浏览器根本就不认识setup属性。所以很明显setup是作用于编译时阶段，也就是从vue文件编译为js文件这一过程。

index.vue
```vue
<template>
  <h1>{{ title }}</h1>
  <h1>{{ msg }}</h1>
  <Child />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Child from "./child.vue";

const msg = ref("Hello World!");
const title = "title";
if (msg.value) {
  const content = "content";
  console.log(content);
}
</script>
```
child.vue
```vue
<template>
  <div>i am child</div>
</template>
```

index.vue编译后，进行简化：
```js
import { ref } from "vue";
import Child from "./Child.vue";

const title = "title";

const __sfc__ = {
  __name: "index",
  setup() {
    const msg = ref("Hello World!");
    if (msg.value) {
      const content = "content";
      console.log(content);
    }
    const __returned__ = { title, msg, Child };
    return __returned__;
  },
};

import {
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  createVNode as _createVNode,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
} from "vue";
// $setup就可以读取到setup方法中的返回值
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [
        // 创建一个h1标签的虚拟DOM
        _createElementVNode("h1", null, _toDisplayString($setup.title)),
        _createElementVNode(
          "h1",
          null,
          _toDisplayString($setup.msg),
          1 /* TEXT */
        ),
        _createVNode($setup["Child"]),
      ],
      64 /* STABLE_FRAGMENT */
    )
  );
}
__sfc__.render = render;
export default __sfc__;
```
index.vue编译后的代码中已经没有了template标签和script标签，取而代之是render函数和__sfc__对象。并且使用__sfc__.render = render将render函数挂到__sfc__对象上，然后将__sfc__对象export default出去。

具体来说：
- setup方法内的代码就是由setup语法糖中的代码编译后来的
- title变量由于不是响应式变量，所以编译后title变量被提到了js文件的全局变量上面去了。而msg变量是响应式变量，所以依然还是在setup方法中。

总的来说，setup语法糖编译后会变成一个setup方法，编译后setup方法中的代码和script标签中的源代码很相似。方法会返回一个对象，对象由setup中定义的顶层变量和import导入的内容组成。


## reference
https://juejin.cn/post/7339210740455440419