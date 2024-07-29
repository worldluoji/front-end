# BOM-DOM
## 什么是BOM？
BOM 是 Browser Object Model，浏览器对象模型。
BOM 是为了操作文档出现的接口，那 BOM 顾名思义其实就是为了控制浏览器的行为而出现的接口。

BOM 提供了对浏览器窗口的控制能力，主要包括以下方面：
- 窗口操作：如打开新的窗口或标签页 (window.open), 关闭窗口 (window.close)。
- 导航控制：如前进 (window.forward), 后退 (window.back)。
- 窗口尺寸和位置：如设置或获取窗口的大小 (window.innerWidth, window.innerHeight) 和位置 (window.screenX, window.screenY)。
- 定时器：如设置定时器 (window.setTimeout, window.setInterval)。
- 用户界面交互：如处理弹出框 (alert, confirm, prompt)。

## BOM对象是什么
- BOM：浏览器对象模型(Brower Object Model)，是用于操作浏览器而出现的API，BOM对象则是Javascript对BOM接口的实现。
- BOM提供了独立于内容的、可以与浏览器窗口进行交互的对象结构。通过BOM对象可以访问浏览器功能部件和属性。
- BOM对象由多个对象构成，其中代表浏览器窗口的window对象是Javascript顶层对象，其他BOM对象均为window对象的子对象。被作为window对象的属性来引用。
其他BOM对象都是在window对象中进行操作。
- BOM对象 是 各个浏览器厂商根据 DOM在各自浏览器上的实现;表现为不同浏览器定义有差别,实现方式不同。

BOM对象最根本的是window。


## DOM对象是什么
- DOM：文档对象模型（Document Object Model），是W3C定义的一套用于处理HTML和XML文档内容的标准编程接口API。javascript实现DOM接口的对象对应的是document对象，JS通过该对象来对HTML/XML文档进行增删改查。
- DOM定义了HTML和XML的逻辑结构，将整个页面划分成由层次节点构成的文档，以树的形式来展现。
- 在BOM和DOM结构层次图中，document对象属于window对象，所以DOM也可以看作是BOM的一部分。
  
DOM对象最根本的是document（实际上是window.document）。

DOM 主要包括以下几个方面：
- 节点树：文档被解析成一棵节点树，每个节点代表文档的一部分。
- 节点操作：如创建 (document.createElement), 删除 (node.remove) 或替换节点。
- 元素选择：如选择元素 (document.querySelector, document.querySelectorAll)。
- 样式和属性：读取或修改元素的样式 (element.style), 属性 (element.getAttribute, element.setAttribute)。
- 事件处理：绑定事件监听器 (element.addEventListener)


## 总结
- BOM 更多关注浏览器本身的功能，比如窗口管理、导航等。
- DOM 关注文档本身，即网页内容的结构和交互。

## reference
https://zhuanlan.zhihu.com/p/372357616