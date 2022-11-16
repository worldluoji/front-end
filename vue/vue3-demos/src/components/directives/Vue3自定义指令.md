# Vue3自定义指令开发

## 指令也有声明周期
```
import { createApp } from 'vue'
const app = createApp({})
 
// 注册
app.directive('my-directive', {
  // 指令是具有一组生命周期的钩子：
  // 在绑定元素的 attribute 或事件监听器被应用之前调用
  created() {},
  // 在绑定元素的父组件挂载之前调用
  beforeMount() {},
  // 绑定元素的父组件被挂载时调用
  mounted() {},
  // 在包含组件的 VNode 更新之前调用
  beforeUpdate() {},
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated() {},
  // 在绑定元素的父组件卸载之前调用
  beforeUnmount() {},
  // 卸载绑定元素的父组件时调用
  unmounted() {}
})
 
// 注册 (功能指令)
app.directive('my-directive', () => {
  // 这将被作为 `mounted` 和 `updated` 调用
})
 
// getter, 如果已注册，则返回指令定义
const myDirective = app.directive('my-directive')
```
从示例可见，指令的生命周期与Vue组件几乎一致。只是没有setup和beforeCreate。
ß也很好理解，都没有created（对象及其事件完全初始化），指令也没办法发挥作用。


## binding

binding 是一个对象，包含以下属性：

- instance：使用指令的组件实例。
- value：传递给指令的值。例如，在 v-my-directive="1 + 1" 中，该值为 2。
- oldValue：先前的值，仅在 beforeUpdate 和 updated 中可用。值是否已更改都可用。
- arg：参数传递给指令 (如果有)。例如在 v-my-directive:foo 中，arg 为 "foo"。
- modifiers：包含修饰符 (如果有) 的对象。例如在 v-my-directive.foo.bar 中，修饰符对象为 {foo: true，bar: true}。
- dir：一个对象，在注册指令时作为参数传递。例如，在以下指令中：
```
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

dir 将会是以下对象：
{
  mounted(el) {
    el.focus()
  }
}
```

binding简化例子：
```
<div v-color="color"></div>
js
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```

## 参考
https://staging-cn.vuejs.org/guide/reusability/custom-directives.html#introduce