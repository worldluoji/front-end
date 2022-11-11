# render 

## 1. render函数的介绍
Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用渲染函数，它比模板更接近编译器。

简单的说，在Vue中, render函数使我们可以用JavaScript来构建DOM, 代替模板的功能。

```
模板 -> 进行编译 -> 生成ast树 -> 数据绑定 -> 成render函数 -> 成虚拟dom -> 真实dom
```
上面是vue模板成为真实dom的步骤。如果直接使用render函数，就省略了模板的编译过程，运行速度更快。所以，template 的本质就是使用 h 函数创建虚拟 Dom，如果我们自己想动态创建组件时，使用相同的方式即可。

当使用render函数描述虚拟DOM时，Vue提供一个函数，这个函数是就构建虚拟DOM所需要的工具。官网上给它起了个名字叫createElement，还有约定的简写叫h。

## 2. 虚拟 DOM
Vue 通过建立一个虚拟 DOM 来追踪自己要如何改变真实 DOM。请仔细看这行代码：
```
return createElement('h1', this.blogTitle)
```
createElement 到底会返回什么呢？其实不是一个实际的 DOM 元素。它更准确的名字可能是createNodeDescription，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为“VNode”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

## 3. render 函数的使用
- 在render函数中会自动注入一个createElement参数
- return createElement(这是一个函数)
- createElement第一参数是想渲染的dom元素,第二参数是对该dom节点的配置(如id,class等，可忽略,到第三参数)，第三参数是一个数组
- 第一参数为一个父元素(也会覆盖html模板),第三参数是一个数组,数组里的为子元素(实验中传文本节点)
- 若还要创建元素，可以数组中继续写createElement函数，在里头再创建一个p标签
<img src="render createment.PNG" />
demo见render_createElement.html，上图是渲染结果。其它例子：
```
render:(h) => {
  return h('div',{
  　 // 给div绑定class属性
    class: {
      child: true,
      more: false
    },
　　// 给div绑定样式
　　style:{
  　　width:'200px',
      height:'200px',
　　},　
　　// 给div绑定点击事件　　
    on: {
      click: () => {
        console.log('点击事件')
      }
    },
  })
} 
```

## 4. 约束
组件树中的所有 VNode 必须是唯一的。
这意味着，下面的渲染函数是不合法的：
```
render: function (createElement) {
  var myParagraphVNode = createElement('p', 'hi')
  return createElement('div', [
    // 错误 - 重复的 VNode
    myParagraphVNode, myParagraphVNode
  ])
}

```

## 5. demo
render_demo.html 展示了使用render可以避免一些情况下模板复杂的问题。

## 6. Vue3中的渲染函数
Vue3 提供了一个 h() 函数用于创建 vnodes，与Vue2中的createElement大同小异：

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
h() 是 hyperscript 的简称——意思是“能生成 HTML (超文本标记语言) 的 JavaScript”。这个名字来源于许多虚拟 DOM 实现时共享的约定。一个更准确的名称应该是 createVnode()，但当你需要多次使用渲染函数时，一个简短的名字能更好地帮到你。

```
const vnode = h('div', { id: 'foo' }, [])

vnode.type // 'div'
vnode.props // { id: 'foo' }
vnode.children // []
vnode.key // null
```

<br>

## 参考资料
- https://cn.vuejs.org/v2/guide/render-function.html
- https://staging-cn.vuejs.org/guide/extras/render-function.html