# render 
## 1. render函数的介绍
Vue 推荐在绝大多数情况下使用 template来创建你的 HTML。

然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用渲染函数，它比模板更接近编译器。

简单的说，在Vue中, render函数使我们可以用JavaScript来构建DOM, 代替模板的功能。

<img src="Vue渲染机制.png" />

上面是vue模板成为真实dom的步骤。如果直接使用render函数，就省略了模板的编译过程，运行速度更快。

当使用render函数描述虚拟DOM时，Vue提供一个h函数，这个函数是就构建虚拟DOM所需要的工具。

由于跳过了模版编译，使用render函数（createElementVNode， h）, 也被称为“非编译模式”
这里的“非编译”指的只是不需要在开发过程中编译，最终它还是需要编译成 VNode 才能在浏览器里运行，

## 2. h函数的使用
Vue3 提供了一个 h() 函数用于创建 vnodes
```
import { h } from 'vue'

const vnode = h(
  'div', // type
  { id: 'foo', class: 'bar' }, // props
  [
    /* children */
  ]
)
```
h() 是 hyperscript 的简称——意思是“能生成 HTML (超文本标记语言) 的 JavaScript”。
这个名字来源于许多虚拟 DOM 实现时共享的约定。一个更准确的名称应该是 createVnode()，
但当你需要多次使用渲染函数时，一个简短的名字能更好地帮到你。

```
const vnode = h('div', { id: 'foo' }, [])

vnode.type // 'div'
vnode.props // { id: 'foo' }
vnode.children // []
vnode.key // null
```
一个例子：
```
import { h } from 'vue'

export default {
  data() {
    return {
      msg: 'hello'
    }
  },
  render() {
    return h('div', this.msg)
  }
}
```

还可以使用renderSlot()来渲染插槽：
```typescript
import { defineComponent, h, renderSlot, type PropType } from 'vue'
import { Row } from '@nutui/nutui'
import { type ComponentSchema } from 'epic-designer'
export default defineComponent({
  props: {
    componentSchema: {
      type: Object as PropType<ComponentSchema>,
      required: true,
      default: () => ({})
    }
  },
  setup (props, { attrs, slots }) {
    return () => {
      const componentSchema = {
        ...props.componentSchema,
        title: props.componentSchema?.label,
      } as ComponentSchema
      const children = componentSchema.children ?? []
      delete componentSchema.children

      return h(Row, componentSchema, {
        default: () =>
          renderSlot(slots, 'edit-node', {}, () =>
            children.map((node: ComponentSchema) =>
              renderSlot(slots, 'node', { componentSchema: node })
            )
          )
      })
    }
  }
})
```

<br>

## 3. 约束
组件树中的所有 VNode 必须是唯一的。
这意味着，下面的渲染函数是不合法的：
```
function render() {
  const p = h('p', 'hi')
  return h('div', [
    // 啊哦，重复的 vnodes 是无效的
    p,
    p
  ])
}
```

## 参考
- https://cn.vuejs.org/guide/extras/rendering-mechanism.html
- https://cn.vuejs.org/api/render-function.html