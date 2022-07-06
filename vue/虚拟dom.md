## 虚拟dom

## 为什么需要虚拟dom
通过 JavaScript 操纵 DOM 是会影响到整个渲染流水线。
比如，我们可以调用document.body.appendChild(node)往 body 节点上添加一个元素，调用该 API 之后会引发一系列的连锁反应：
- 首先渲染引擎会将 node 节点添加到 body 节点之上，然后触发样式计算、布局、绘制、栅格化、合成等任务，我们把这一过程称为重排。
- 除了重排之外，还有可能引起重绘或者合成操作，形象地理解就是“牵一发而动全身”。
- 另外，对于 DOM 的不当操作还有可能引发强制同步布局和布局抖动的问题，这些操作都会大大降低渲染效率。因此，对于 DOM 的操作我们时刻都需要非常小心谨慎。
<br>
虚拟dom就是解决上述问题的方案之一。

## 虚拟dom做什么
- 将页面改变的内容应用到虚拟 DOM 上，而不是直接应用到 DOM 上。
- 变化被应用到虚拟 DOM 上时，虚拟 DOM 并不急着去渲染页面，而仅仅是调整虚拟 DOM 的内部状态，这样操作虚拟 DOM 的代价就变得非常轻了。
- 在虚拟 DOM 收集到足够的改变时，再把这些变化一次性应用到真实的 DOM 上。

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

## patch flag 优化静态树
```
<span>Hello World!</span>
<span>Good Morning!</span>
<span>{{name}}</span>
```
vu3对应的虚拟dom为：
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
这个标记就叫做 patch flag（补丁标记。
- patch flag 的强大之处在于，当你的 diff 算法走到 _createElementBlock 函数的时候，会忽略所有的静态节点，只对有标记的动态节点进行对比，而且在多层的嵌套下依然有效。Vue2.x 中，重复渲染时静态不变化的内容依旧会重建 Vdom，diff 时仍需对比。
- 尽管JavaScript做 Vdom 的对比已经非常的快，但是 patch flag 的出现还是让 Vue3 的 Vdom 的性能得到了很大的提升，尤其是在针对比较复杂的大组件时。经过测试的 upadte 性能提升1.3到2倍，ssr 提升2到3倍。

## 静态绑定
当我们创建一个有属性的元素：
```
<span id="hello">{{msg}}</span>
```

Vue3编译后的Vdom是这个样子的：
````
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("span", { id: "hello" }, _toDisplayString(_ctx.msg), 1 /* TEXT */))
}
```
让我们观察它的 patch flag，发现并没有对id做特殊的标记。是因为dom元素的静态属性在渲染的时候就已经创建了，并且是不会变动的，在后面进行更新的时候，diff 算法是不会去管它的。

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
<br>
原来，Vue3 在 Vdom 的更新时，只会关注它有变化的部分。这样的优化使 Vue3 既跳出了 Vdom 的性能瓶颈，又依然保留了可以手写 render function 的灵活性。相当于 Vue3 既有 React 的灵活性，又有基于模板的性能保证。

## 参考资料
- https://juejin.cn/post/7062917822334107656