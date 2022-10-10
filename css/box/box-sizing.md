# box-sizing
CSS 盒模型本质上是一个盒子，盒子包裹着HTML 元素，盒子由四个属性组成，从内到外分别是：content 内容、padding 内填充、border 边框、外边距 margin.

<img src="box-model.gif" />

## 如何在CSS 设置盒模型
标准盒模型(默认)：
```
box-sizing: content-box
```

怪异盒模型：
```
box-sizing: border-box
```

## 宽度和高度的计算方式不同
标准盒模型：
```
width = content-width
height = content-height 
```

怪异盒模型:
```
width = content-width + padding-width + border-width
height = content-height + padding-height + border-height
```

## margin合并
margin合并，MDN是这样定义的：
```
块的顶部外边距和底部外边距有时被组合(折叠)为单个外边距，其大小是组合到其中的最大外边距，这种行为称为外边距合并。
```
要注意的是，外边距合并只针对<strong>块级元素</strong>，而且是顶部或底部的外边距。

例子：margin-merge-demo1.html  margin-merge-demo2.html 

<br>

## 如何理解margin合并
### BFC
一个块格式化上下文（block formatting context）是Web页面的可视化CSS渲染的一部分。它是块盒子的布局发生，浮动互相交互的区域。

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

#### 触发 BFC：
- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

注意根元素就创建了个BFC

#### BFC 有以下特点：
- 内部块级盒子垂直方向排列
- 盒子垂直距离由margin 决定，同一个BFC 盒子的外边距会重叠
- BFC 就是一个隔离的容器，内部子元素不会影响到外部元素
- BFC 的区域不会与float box叠加
- 每个元素的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

#### BFC 的用途：
- 清除浮动
- 解决外边距合并
- 布局

看到这里相信大家都知道怎么解决外边距重合了，答案是: 将两个外边距重合的元素放在不同的 BFC 容器中。

<br>

## IFC
既然块级元素会触发BFC，那么内联元素会触发的则是IFC

IFC(Inline Formatting Context) 直译为内联格式化上下文。
我们可以简单理解为每个盒子都有一个 FC 特性，不同的 FC 值代表一组盒子中不同的排列方式。

有的 FC 表示盒子从上到下垂直排列，有的 FC 表示盒子从左到右水平排列等等。而 IFC 则是表示盒子从左到右的水平排列方式。

<img src="css-ifc-box.jpeg" />

IFC 只有在一个块元素中仅包含内联级别元素时才会生成。

### IFC原理

<img src="css-ifc-baseline.jpeg" />

水平垂直方向上的排列。
- 内联元素在水平线上一个接一个排列，默认通过基线排列。
- 如果行内元素能在一行装下，子元素的排列方式由 text-align 决定。
- 如果行内元素不能在一行装下，默认此行内框会被分割，根据 white-space 决定。

内部元素水平方向上的 margin、padding、border 有效，垂直方向上无效。

垂直方向上有多种对齐方式: 顶部、底部、基线，根据 vertical-align 属性决定。默认是baseline基线对齐。

line box 的计算规则：
- line box 的宽度由包含其元素的宽度决定。
- line box 的高度受当前行所有内联元素的高度影响，可能比内部最高的元素还要高（由基线对齐所导致）。

## 参考：
https://mengsixing.github.io/blog/css-ifc.html#css-%E5%86%85%E8%81%94%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%B8%8A%E4%B8%8B%E6%96%87