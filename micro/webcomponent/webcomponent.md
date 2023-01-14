# Webcomponents

## 为什么需要 Webcomponents
除了 CSS 的全局属性会阻碍组件化，DOM 也是阻碍组件化的一个因素，因为在页面中只有一个 DOM，任何地方都可以直接读取和修改 DOM。

## 什么是 Webcomponents
- Webcomponents 提供了对局部视图封装能力，可以让 DOM、CSSOM 和 JavaScript 运行在局部环境中，这样就使得局部的 CSS 和 DOM 不会影响到全局。
- Webcomponents 是一套技术的组合，具体涉及到了 Custom elements（自定义元素）、Shadow DOM（影子 DOM）和HTML templates（HTML 模板）

<br>

## Webcomponents 使用
要使用 Webcomponents，通常要实现下面三个步骤：
- 首先，使用 template 属性来创建模板。利用 DOM 可以查找到模板的内容，但是模板元素是不会被渲染到页面上的，也就是说 DOM 树中的 template 节点不会出现在布局树中，所以我们可以使用 template 来自定义一些基础的元素结构，这些基础的元素结构是可以被重复使用的。
- 其次，我们需要创建一个类。在该类的构造函数中要完成三件事：
  - 查找模板内容；
  - 创建Shadoe DOM；
  - 再将模板添加到影子 DOM 上。
- demo 见 hello_Webcomponents.html

<br>

### 理解 Shadow DOM
Shadow DOM 允许将隐藏的 DOM 树附加到常规的 DOM 树中——它以 shadow root 节点为起始根节点，在这个根节点的下方，可以是任意元素，和普通的 DOM 元素一样。

<img src="shadowdom.svg" />

- Shadow host：一个常规 DOM 节点，Shadow DOM 会被附加到这个节点上。
- Shadow tree：Shadow DOM 内部的 DOM 树。
- Shadow boundary：Shadow DOM 结束的地方，也是常规 DOM 开始的地方。
- Shadow root: Shadow tree 的根节点。

其实，影子 DOM 的作用是将模板中的内容与全局 DOM 和 CSS 进行隔离，这样我们就可以实现元素和样式的私有化了。你可以把影子 DOM 看成是一个作用域，其内部的样式和元素是不会影响到全局的样式和元素的，而在全局环境下，要访问影子 DOM 内部的样式或者元素也是需要通过约定好的接口的。

总之，通过影子 DOM，我们就实现了 CSS 和元素的封装，在创建好封装影子 DOM 的类之后，我们就可以使用 customElements.define 来自定义元素了，比如hello_Webcomponents.html中的`<hello-Webcomponents></hello-Webcomponents>`。

Shadow DOM 内部的样式是不会影响到全局 CSSOM 的。另外，使用 DOM 接口也是无法直接查询到影子 DOM 内部元素的，比如你可以使用document.getElementsByTagName('div')来查找所有 div 元素，这时候你会发现影子 DOM 内部的元素都是无法查找的，因为要想查找影子 DOM 内部的元素需要专门的接口，所以通过这种方式又将影子内部的 DOM 和外部的 DOM 进行了隔离。
  
需要注意一点，Shadow DOM 的 JavaScript 脚本是不会被隔离的，比如在影子 DOM 定义的 JavaScript 函数依然可以被外部访问，这是因为 JavaScript 语言本身已经可以很好地实现组件化了。

<br>

## 浏览器如何实现影子DOM?
- 我们使用了两次 hello-Webcomponents 属性，那么就会生成两个影子 DOM，并且每个影子 DOM 都有一个 shadow root 的根节点，我们可以将要展示的样式或者元素添加到影子 DOM 的根节点上，每个影子 DOM 你都可以看成是一个独立的 DOM.
- 浏览器为了实现影子 DOM 的特性，在代码内部做了大量的条件判断，比如当通过 DOM 接口去查找元素时，渲染引擎会去判断 geek-bang 属性下面的 shadow-root 元素是否是影子 DOM，如果是影子 DOM，那么就直接跳过 shadow-root 元素的查询操作。所以这样通过 DOM API 就无法直接查询到影子 DOM 的内部元素了。
- 当生成布局树的时候，渲染引擎也会判断 hello-Webcomponents 属性下面的 shadow-root 元素是否是影子 DOM，如果是，那么在影子 DOM 内部元素的节点选择 CSS 样式的时候，会直接使用影子 DOM 内部的 CSS 属性。所以这样最终渲染出来的效果就是影子 DOM 内部定义的样式。

<br>

## Web Component 和 Vue、React 的区别？
- Web Component是通过浏览器引擎提供api接口进行操作，让后在dom，cssom生成过程中控制实现组件化的作用域/执行执行上下文的隔离； 
- Vue/React 是在没有浏览器引擎支持的情况下，通过采取一些取巧的手法进行隔离（比如：js执行上下文的封装利用闭包；样式的封装利用文件hash值作为命名空间，在css选择的时候多套一层选择条件（hash值），本质上还是全局的只是不同组件css选择的时候只能选择到组件相应的css样式，实现的隔离）

<br>

## Web Component的生命周期回调
定义在自定义元素的类定义中的特殊回调函数，影响其行为：
- connectedCallback：当custom element首次被插入文档DOM时，被调用。
- disconnectedCallback：当custom element从文档DOM中删除时，被调用。
- adoptedCallback：当自定义元素被移动到新文档时被调用。
- attributeChangedCallback：当自定义元素的一个属性被增加、移除或更改时被调用。

## Vue3 和 Webcomponents
Vue3提供了一套API支持Webcomponents, 具体可参考:
https://staging-cn.vuejs.org/guide/extras/web-components.html

## 其它参考
- https://developer.mozilla.org/zh-CN/docs/Web/Web_Components
- https://github.com/mdn/web-components-examples/tree/main/life-cycle-callbacks