# Vue3中的宏到底是什么
宏（defineProps、defineEmits等）就是作用于编译时，也就是从vue文件编译为js文件这一过程。

举个defineProps的例子：在编译时defineProps宏就会被转换为定义props相关的代码，当在浏览器运行时自然也就没有了defineProps宏相关的代码了。所以才说宏是在编译时执行的代码，而不是运行时执行的代码。

```vue
<template>
  <div>content is {{ content }}</div>
  <div>title is {{ title }}</div>
</template>

<script setup lang="ts">
import {ref} from "vue"
const props = defineProps({
  content: String,
});
const title = ref("title")
</script>
```
经过编译后(https://play.vuejs.org/)的js为
```js
import { defineComponent as _defineComponent } from 'vue'
import {ref} from "vue"

const __sfc__ = /*@__PURE__*/_defineComponent({
  __name: 'App',
  props: {
    content: String,
  },
  setup(__props, { expose: __expose }) {
    __expose();

    const props = __props;
    const title = ref("title")

    const __returned__ = { props, title }
    Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
    return __returned__
 }
});

import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("div", null, "content is " + _toDisplayString($props.content), 1 /* TEXT */),
    _createElementVNode("div", null, "title is " + _toDisplayString($setup.title), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
__sfc__.render = render
__sfc__.__file = "src/App.vue"
export default __sfc__
```
编译后的js文件主要由两部分组成，第一部分为执行defineComponent函数生成一个 `__sfc__` 对象，第二部分为一个render函数。

可以发现,原本在setup里面使用的defineProps宏相关的代码不在了，并且多了一个props属性。这个props属性就是defineProps宏生成的。即vue里的：
```js
const props = defineProps({
  content: String,
});
```
变成了defineComponent里的
```js
props: {
    content: String,
},
```

## 注意
defineProps需要放在setup的顶层。否则就会报错
```vue
<script setup lang="ts">
import {ref} from "vue"
const title = ref("title")

if (title.value) {
  const props = defineProps({
    content: String,
  });
}
</script>
```
这是因为编译后没有替换defineProps宏：
```js
if (title.value) {
  const props = defineProps({
    content: String,
  });
}
```