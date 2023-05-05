# 虚拟dom

## 为什么需要虚拟dom
通过 JavaScript 操纵 DOM 是会影响到整个渲染流水线。
比如，我们可以调用document.body.appendChild(node)往 body 节点上添加一个元素，调用该 API 之后会引发一系列的连锁反应：
- 首先渲染引擎会将 node 节点添加到 body 节点之上，然后触发样式计算、布局、绘制、栅格化、合成等任务，我们把这一过程称为重排。
- 除了重排之外，还有可能引起重绘或者合成操作，形象地理解就是“牵一发而动全身”。
- 另外，对于 DOM 的不当操作还有可能引发强制同步布局和布局抖动的问题，这些操作都会大大降低渲染效率。因此，对于 DOM 的操作我们时刻都需要非常小心谨慎。
<br>
虚拟dom就是解决上述问题的方案之一。

<br>

## 虚拟dom做什么
- 将页面改变的内容应用到虚拟 DOM 上，而不是直接应用到 DOM 上。
- 变化被应用到虚拟 DOM 上时，虚拟 DOM 并不急着去渲染页面，而仅仅是调整虚拟 DOM 的内部状态，这样操作虚拟 DOM 的代价就变得非常轻了。
- 在虚拟 DOM 收集到足够的改变时，再把这些变化一次性应用到真实的 DOM 上。

<br>

## 什么是虚拟dom
- Virtual DOM(虚拟DOM)，其实就是用普通的JS对象来描述DOM对象。
- 比如 Vue.js 2.x 内部使用的虚拟DOM就是改造的Snabbdom。
Vue3中对Vdom进行了重写，使Vue3突破了Vdom的性能瓶颈。
- 可以点击<a href="https://vue-next-template-explorer.netlify.app/#eyJzcmMiOiI8c3Bhbj5IZWxsbyBXb3JsZCE8L3NwYW4+Iiwib3B0aW9ucyI6e319">这里</a>翻译一个虚拟dom。比如：
```
<span>Hello World!</span>
```
对应的虚拟dom为
```
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("span", null, "Hello World!"))
}

```
实际上 _createElementBlock 函数中才是我们创建的 dom，从它身上我们可以看出，我们创建了一个 span 元素，内容为 “Hello World!”。这就是 Vdom 最基础的形式，在这里我们并不会感觉到Vue3与Vue2有什么区别。

<br>

## 静态提升
上面的span, 是完全静态的资源，没有必要在重新渲染时再次创建和比对它们。Vue 编译器自动地会提升这部分 vnode 创建函数到这个模板的渲染函数之外，并在每次渲染时都使用这份相同的 vnode，渲染器知道新旧 vnode 在这部分是完全相同的，所以会完全跳过对它们的差异比对。

此外，当有足够多连续的静态元素时，它们还会再被压缩为一个“静态 vnode”，其中包含的是这些节点相应的纯 HTML 字符串。这些静态节点会直接通过 innerHTML 来挂载。同时还会在初次挂载后缓存相应的 DOM 节点。如果这部分内容在应用中其他地方被重用，那么将会使用原生的 cloneNode() 方法来克隆新的 DOM 节点，这会非常高效。
```
<div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div>{{ dynamic }}</div>
</div>
```
翻译后，对应的虚拟dom:
```
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createStaticVNode as _createStaticVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = /*#__PURE__*/_createStaticVNode("<div class=\"foo\">foo</div><div class=\"foo\">foo</div><div class=\"foo\">foo</div><div class=\"foo\">foo</div><div class=\"foo\">foo</div>", 5)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", null, [
    _hoisted_1,
    _createElementVNode("div", null, _toDisplayString(_ctx.dynamic), 1 /* TEXT */)
  ]))
}
```
可以看到，连续的静态资源，被提取到了render函数外面
（_createStaticVNode）。

<br>

## patch flag 优化静态树
```
<span>Hello World!</span>
<span>Good Morning!</span>
<span>{{name}}</span>
```
vue3对应的虚拟dom为：
```
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("span", null, "Hello World!"),
    _createElementVNode("span", null, "Good Morning!"),
    _createElementVNode("span", null, _toDisplayString(_ctx.name), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
// 如果是动态绑定的val在渲染dom的时候会在 _createElementVNode函数后面追加动态标记1
```

- 创建动态 dom 元素的时候，Vdom 除了模拟出dom基本信息之外，还加了一个：1 /* TEXT */，这个值1便是标记。
这个标记就叫做 patch flag（补丁标记）。
- patch flag 的强大之处在于，当你的 diff 算法走到 _createElementBlock 函数的时候，会忽略所有的静态节点，只对有标记的动态节点进行对比，而且在多层的嵌套下依然有效。Vue2.x 中，重复渲染时静态不变化的内容依旧会重建 Vdom，diff 时仍需对比。
- 一个元素可以有多个patch flag，会被合并成一个数字。运行时渲染器也将会使用位运算来检查这些标记，确定相应的更新操作
- 尽管JavaScript做 Vdom 的对比已经非常的快，但是 patch flag 的出现还是让 Vue3 的 Vdom 的性能得到了很大的提升，尤其是在针对比较复杂的大组件时。经过测试的 upadte 性能提升1.3到2倍，ssr 提升2到3倍。

<br>

## 静态绑定
当我们创建一个有属性的元素：
```
<span id="hello">{{msg}}</span>
```

Vue3编译后的Vdom是这个样子的：
```
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("span", { id: "hello" }, _toDisplayString(_ctx.msg), 1 /* TEXT */))
}
```
让我们观察它的 patch flag，发现并没有对id做特殊的标记。是因为dom元素的静态属性在渲染的时候就已经创建了，并且是不会变动的，在后面进行更新的时候，diff 算法是不会去管它的。

<br>

## 动态绑定
当我们创建一个属性是动态绑定的元素：
```
<span :id="hello">{{msg}}</span>
```

Vue3编译后的Vdom是这个样子的：
```
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("span", { id: _ctx.hello }, _toDisplayString(_ctx.msg), 9 /* TEXT, PROPS */, ["id"]))
}
```
再观察它的 patch flag，会发现变成了 9 /* TEXT, PROPS */, 而且后边还多了一个数组 ["id"]
静态标记中注释的内容，很明显的告诉我们，这个元素不止TEXT变化，它的属性PROPS也会变化。后边的数组内容则是有可能变化的属性

原来，Vue3 在 Vdom 的更新时，只会关注它有变化的部分。这样的优化使 Vue3 既跳出了 Vdom 的性能瓶颈，又依然保留了可以手写 render function 的灵活性。相当于 Vue3 既有 React 的灵活性，又有基于模板的性能保证。

<br>

## 渲染器(Render)
有了虚拟dom, 一个<strong>运行时渲染器</strong>将会遍历整个虚拟 DOM 树，并据此构建真实的 DOM 树。这个过程被称为挂载 (mount)。

如果我们有两份虚拟 DOM 树，渲染器将会有比较地遍历它们，找出它们之间的区别，并应用这其中的变化到真实的 DOM 上。这个过程被称为修补 (patch)，又被称为“比较差异 (diffing)”或“协调 (reconciliation)”。

虚拟 DOM 带来的主要收益是它赋予了开发者编程式地、声明式地创建、审查和组合所需 UI 结构的能力，而把直接与 DOM 相关的操作交给了渲染器。

Vue 组件挂载后发生了如下这几件事：

- 编译：Vue 模板被编译为了render()函数：即用来返回虚拟 DOM 树的函数。这一步骤可以通过构建步骤提前完成，也可以通过使用运行时编译器即时完成。

- 挂载：运行时渲染器调用渲染函数，遍历返回的虚拟 DOM 树，并基于它创建实际的 DOM 节点。这一步会作为响应式副作用执行，因此它会追踪其中所用到的所有响应式依赖。

- 修补：当一个依赖发生变化后，副作用会重新运行，这时候会创建一个更新后的虚拟 DOM 树。运行时渲染器遍历这棵新树，将它与旧树进行比较，然后将必要的更新应用到真实 DOM 上去。

<img src="render-pipeline.03805016.png" />
这里也可以看出，使用render()函数，效率会更高，但是使用template更便于理解和使用。

<br>

## 名词解释
### 1. 响应式副作用:
```
let A2
function update() {
  A2 = A0 + A1
}
```
这个 update() 函数会产生一个副作用，或者就简称为作用，因为它会更改程序里的状态。

A0 和 A1 被视为这个作用的依赖，因为它们的值被用来执行这个作用。因此这次作用也可以说是一个它依赖的订阅者。

我们需要一个魔法函数，能够在 A0 或 A1 (这两个依赖) 变化时“自动”调用 update() (产生作用)。

而这个魔法函数,Vue2中使用了setter, Vue3中则使用了代理Proxy。详见=》/js/basics/setter 和 /js/basics/proxy.

## 参考资料
- https://juejin.cn/post/7062917822334107656
- https://staging-cn.vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom