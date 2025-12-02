# vue文件如何转化为js
以如下.vue文件为例
```vue
<template>
  <h1 class="msg">{{ msg }}</h1>
</template>

<script setup lang="ts">
import { ref } from "vue";

const msg = ref("hello word");
</script>

<style scoped>
.msg {
  color: red;
  font-weight: bold;
}
</style>
```
经过编译后(https://play.vuejs.org/)的js
```js
import { defineComponent as _defineComponent } from 'vue'
import { ref } from "vue";


const __sfc__ = /*@__PURE__*/_defineComponent({
  __name: 'App',
  setup(__props, { expose: __expose }) {
  __expose();

const msg = ref("hello word");

const __returned__ = { msg }
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
return __returned__
}

});
import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = { class: "msg" }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("h1", _hoisted_1, _toDisplayString($setup.msg), 1 /* TEXT */))
}
__sfc__.render = render
__sfc__.__scopeId = "data-v-7ba5bd90"
__sfc__.__file = "src/App.vue"
export default __sfc__
```
经过编译后的css
```
.msg[data-v-7ba5bd90] {
  color: red;
  font-weight: bold;
}
```
编译后的js代码中我们可以看到主要有三部分，想必你也猜到了这三部分刚好对应vue文件的那三块。

- _sfc_对象的setup方法对应vue文件中的`<script setup lang="ts">`模块。
- render函数对应vue文件中的`<template>`模块。
- css样式，对应vue文件中的`<style scoped>`模块。


## 通过debug解析原理
webpack和vite本身是没有能力处理vue文件的，其实实际背后生效的是vue-loader和@vitejs/plugin-vue，后面以vitejs/plugin-vue为例。

编译.vue文件在nodejs环境下运行, 要在node端打断点，我们需要启动一个debug 终端。这里以vscode举例，首先我们需要打开终端，然后点击终端中的+号旁边的下拉箭头，在下拉中点击Javascript Debug Terminal就可以启动一个debug终端。

通过，vite.config.ts文件中使用@vitejs/plugin-vue的地方开始debug，我们就能够梳理清楚完整的工作流程。

然后在vitejs/plugin-vue插件使用的地方打上断点，启动debug，step into进入。

vitejs/plugin-vue的transform钩子会走到[transformMain函数](https://github.com/vitejs/vite-plugin-vue/blob/main/packages/plugin-vue/src/main.ts)进行处理。

transformMain做了以下几个事：
- 根据源代码code字符串调用createDescriptor函数生成一个descriptor对象。
- 调用genScriptCode函数传入第一步生成的descriptor对象将`<script setup>`模块编译为浏览器可执行的js代码。
- 调用genTemplateCode函数传入第一步生成的descriptor对象将`<template>`模块编译为render函数。
- 调用genStyleCode函数传入第一步生成的descriptor对象将`<style scoped>`模块编译为类似这样的import语句，import "/src/App.vue?vue&type=style&index=0&scoped=7a7a37b1&lang.css";。


再看[createDescriptor的源码](https://github.com/vitejs/vite-plugin-vue/blob/main/packages/plugin-vue/src/utils/descriptorCache.ts)

实际使用了 Vue3提供的 **vue/compiler-sfc** 包暴露出来的parse函数对 vue文件进行解析。
```ts
export function parse(
source: string,
options: SFCParseOptions = {},
): SFCParseResult {}
```
parse函数接收两个参数，第一个参数为vue文件的源代码，也就是.vue中的code字符串，第二个参数是一些options选项。

再来看看parse函数的返回值SFCParseResult，主要有类型为SFCDescriptor的descriptor属性需要关注。
```ts
export interface SFCParseResult {
  descriptor: SFCDescriptor
  errors: (CompilerError | SyntaxError)[]
}

export interface SFCDescriptor {
  filename: string
  source: string
  template: SFCTemplateBlock | null
  script: SFCScriptBlock | null
  scriptSetup: SFCScriptBlock | null
  styles: SFCStyleBlock[]
  customBlocks: SFCBlock[]
  cssVars: string[]
  slotted: boolean
  shouldForceReload: (prevImports: Record<string, ImportBinding>) => boolean
}
```
返回的descriptor对象中主要有三个属性，template属性包含了.vue文件中的template模块code字符串和AST抽象语法树，scriptSetup属性包含了.vue文件中的`<script setup>`模块的code字符串，styles属性包含了.vue文件中`<style>`模块中的code字符串。

拿到descriptor后，就是分别对template、scriptSetup、styles模块分别进行编译生成浏览器能识别的代码了。

## reference
- https://juejin.cn/post/7343139078486982710
- https://play.vuejs.org/