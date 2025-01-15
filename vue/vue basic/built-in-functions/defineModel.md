# defineModel
Vue 3.4 引入了 `defineModel()` 宏，这是 Composition API 的一个新成员，旨在简化组件中响应式状态的管理，尤其是处理复杂组件状态时。它特别有助于实现父子组件之间的属性双向绑定。

### 简化双向绑定

在 `defineModel()` 出现之前，为了使自定义组件支持 `v-model` 双向绑定，开发者需要：

1. 在子组件中声明 `props` 来接收父组件传递的数据。
2. 当需要更新这个数据时，通过 `emits` 发出 `update:propName` 事件通知父组件进行更新。

这种做法对于每个要实现双向绑定的属性都需要重复编写类似的代码，显得繁琐。

### 使用 `defineModel()`

使用 `defineModel()` 后，可以大大简化上述过程。它返回一个 `ref`，该 `ref` 可以像其他响应式引用一样被访问和修改，并且它会自动处理与父组件变量之间的双向绑定。这意味着，当你修改 `defineModel()` 返回的值时，父组件中的相应属性也会自动更新，反之亦然。

#### 示例

**父组件**

```vue
<template>
  <child v-model:test="test">父组件： {{ test }}</child>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const test = ref('initial value');
</script>
```

**子组件**

```vue
<script setup lang="ts">
// 如果是默认的 model，则直接调用 defineModel()
// 对于命名的模型（如这里的 'test'），则需要传入名称
const inputValue = defineModel('test');
</script>

<template>
  <input v-model="inputValue" />
</template>
```

Vue3.4前的用法：
```vue
<!-- vue3.4前用法 -->
<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>
```

### 支持多个 `v-model`

`defineModel()` 也支持在一个组件上同时绑定多个 `v-model` 实例，只需为每个模型指定不同的名称即可。例如，可以在一个表单组件中同时绑定用户的姓名和地址。


## 原理解析
先看看上面的子组件使用defineModel编译成js的代码：
```js
import { useModel as _useModel, defineComponent as _defineComponent } from 'vue'

const __sfc__ = /*@__PURE__*/_defineComponent({
  __name: 'App',
  props: {
    "test": {},
    "testModifiers": {},
  },
  emits: ["update:test"],
  setup(__props, { expose: __expose }) {
    __expose();

    const inputValue = _useModel(__props, 'test');

    const __returned__ = { inputValue }
    Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
    return __returned__
  }
});

import { vModelText as _vModelText, withDirectives as _withDirectives, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _withDirectives((_openBlock(), _createElementBlock("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($setup.inputValue) = $event))
  }, null, 512 /* NEED_PATCH */)), [
    [_vModelText, $setup.inputValue]
  ])
}
__sfc__.render = render
__sfc__.__file = "src/App.vue"
export default __sfc__
```
- defineModel宏函数经过编译后会给vue组件对象上面增加modelValue的props选项和update:modelValue的emits选项，执行defineModel宏函数的代码会变成执行useModel函数.

- useModel函数的返回值是一个ref对象。注意这个是ref对象不是props，所以我们才可以在组件内直接修改defineModel的返回值。

- 当我们对这个ref对象进行“读操作”时，会像Proxy一样被拦截到ref对象的get方法。在get方法中会返回本地维护localValue变量（即上面例子中的inputValue），localValue变量依靠watchSyncEffect让localValue变量始终和父组件传递的modelValue的props值一致。

- 对返回值进行“写操作”会被拦截到ref对象的set方法中，在set方法中会将最新值同步到本地维护localValue变量，调用vue实例上的emit方法抛出update:modelValue事件给父组件，由父组件去更新父组件中v-model绑定的变量。