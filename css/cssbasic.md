# CSS
CSS (Cascading Style Sheets，层叠样式表），本质上就是声明规则，然后产生各种效果。

A key part of CSS development comes down to writing rules in such a way that they’re predictable.

<image src="css overview.awebp" />

<br>

# cascade(层叠)
CSS的第一个"C"表示层叠，层叠就是一系列规则，它决定了如何解决冲突，是CSS的基础。

The cascade is the name for this set of rules. 
It determines how conflicts are resolved, and it’s a fundamental part of how the language works.

## 解决冲突的三个条件
1. Stylesheet the styles come from. Your styles are applied in conjunction with the browser’s default styles.
2. Selector selectors take precedence over which.
3. Source in which styles are declared in the stylesheet.

css样式来源：
- author styles，including the stylesheets you add to your web page and the inline style.
- user agent styles, which are the browser’s default styles

总的来说，样式冲突时，优先级：
- !important: 样式表中!important优先级高于行内样式；
- 行内样式：行内样式高于央视表中非!important的样式；
- 选择器：如果选择的ID更多，则胜出；如果ID相同，class更多则胜出；如果ID和class都一样，拥有更多标签的胜出；
- 伪类选择器：比如:hover和属性选择器([type="input"]), 与class选择器的优先级相同；
- 通用选择器*和组合选择器(> + ~) 对优先级没有影响。
- 前面的条件都一样的情况下，位于页面较晚位置出现的胜出（后面的覆盖前面的）

demo -> priority.html

常用selector:
```css
id selector : #xxx
class selector : .xxx
[type='radio'] {
  margin: 20px 0px 20px 0px;
}
```

<br>

## CSS的组成
```css
body {
  color: black;
  font-family: Helvetica;
}
```
The selector and declaration block are called a A ruleset is also called 
a it’s my observation that rule is rarely used so precisely 
and is usually used in the plural to refer to a broader set of styles.

Finally, at-rules are language constructs beginning with an “at” symbol, 
such as @import rules or @media queries.

# 常用CSS
## import third-part font
To import a Google Font, you can copy the font's URL from the Google Fonts library and then paste it in your HTML. 
For this challenge, we'll import the Lobster font. 
To do this, copy the following code snippet and paste it into the top of your code editor (before the opening style element):
```
<link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">
```

Now you can use the Lobster font in your CSS by using Lobster as the FAMILY_NAME as in the following example:

```
font-family: FAMILY_NAME, GENERIC_NAME;
```

<br>

## font "degrade" 
There are several default fonts that are available in all browsers. 
These generic font families include monospace, serif and sans-serif
When one font isn't available, you can tell the browser to "degrade" to another font.

For example, if you wanted an element to use the Helvetica font, 
but degrade to the sans-serif font when Helvetica isn't available, you will specify it as follows:
```css
p {
  font-family: Helvetica, sans-serif;
}
```
Generic font family names are not case-sensitive. Also, they do not need quotes because they are CSS keywords.

再看一个例子：
```css
h1 {
  font-family: -apple-system,system-ui,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial;
}
```
这么一大串到底是几个意思呢，其实只要知道这个font-faimly属性中包含两种类型值就能明白了，一种是字体名称，一种叫做字体族。顾名思义，字体族就是所有字体的一个分类，在CSS世界中一般有以下几种字体族：

- 衬线字体。指的就是笔画开始、结束处有额外的装饰，并且笔画粗细不同。
- 无衬线字体。就是没有装饰，笔画粗细相同。
- 等宽字体。字形的宽度都相等。
- 草书字体。模仿人类手写的字体。
- 奇幻字体。没有归于以上四类字体的其他字体。

所以诸如上面的声明中的sans-serif、Helvetica指的是字体族，前者是衬线字体，后者是无衬线字体。
那么这其中的意思就很明确了: <strong>如果系统中有前面的字体，那就使用前面的字体，如果没有的话，尝试使用后面的衬线字体，如果没有，则继续往后面的声明中寻找可用字体。</strong>

<br>

## padding、margin
An element's padding controls the amount of space between the element's content and its border.
```css
p { 
  padding: 40px 20px 20px 40px;
}
```
顺时针，第一个是top

```css
p { 
  padding: 40px 20px; 
}
```
上下40px, 左右20px

```css
p {
  padding: 40px 30px 20px;
}
```
top 40px, bottom 20px, 左右30px

An element's margin controls the amount of space between an element's border and surrounding elements.
用法和padding一致。

<br>

### margin合并（塌陷）
margin合并是说：block的顶部外边距和相邻block底部外边距，被组合(折叠)为单个外边距，其大小是组合到其中的最大外边距，这种行为称为外边距合并。

Here are ways to prevent margins from collapsing:
- Applying overflow: auto (or any value other than to the container prevents margins inside the container from collapsing with those outside the container. This is often the least intrusive solution.
- Adding a border or padding between two margins stops them from collapsing.
- Margins won’t collapse to the outside of a container that is floated, that is an inline block, or that has an absolute or fixed position.
- When using a flexbox, margins won’t collapse between elements that are part of the flex layout. This is also the case with grid layout
- Elements with a table-cell display don’t have a margin, so they won’t collapse. This also applies to table-row and most other table display types. 

## unit
### 1) px
Pixels are absolute units, which is what tells the browser how to size or space an item.

There are some other absolute uintes:
```
1 in. = 25.4 mm = 2.54 cm = 6 pc = 72 pt = 96 px
```
这些绝对单位已经不再使用。

A CSS pixel does not strictly equate to a monitor’s pixel. 
This is notably the case on high-resolution (“retina”) displays.

### 2) relative units
em and rem, are not absolute, but the value of relative units changes based on external factors.

1. em根据使用它的元素的font-size大小决定(1 em means the font size of the current element;):
```css
.padded {
  font-size: 16px;
  padding: 1em;
}
```
那么，这里1em=16px，表示上下左右padding都是16px;
如果.padded没有设置font-size, 就会继承父元素的font-size，即此时1em等于父元素的font-size

还有一种情况
```css
body {
  font-size: 16px;
}

.slogan {
  font-size: 1.2em;
  padding: 1.2em;
}
```
显然font-size没有“自己的1.2倍”，这里font-size的意思就是父元素font-size的1.2倍  = 16 * 1.2 = 19.2px，
而 padding = 1.2 * 自己的font-size = 19.2 * 1.2 = 23.04px. 

Using ems can be convenient when setting properties like or border-radius 
because these will scale evenly with the element if it inherits different font sizes, 
or if the user changes the font settings.

2. rem是基于html元素的字体大小来决定
rem是"root em"的缩写，相对于根元素`<html>`。
值得注意的是：伪类选择器:root等价于选择了html根节点。

For most browsers, the default font size is 16 px. 
Technically, it’s the keyword value medium that calculates to 16 px.

3. vh, vw, vmin, vmax
基于当前屏幕，无论手机横屏还是竖屏，vh都是可视高度，vw都是可视宽度。
vmin是vh和vw中小的那个，vmax是vh、vw中大的那个。

经验：拿不准的时候，用rem设置字号，用px设置border粗细，用em设置padding、border-radius等属性。
需要自适应的场景，比如移动端，优先使用视口单位。 -> ./basic/relativeUnit.html

<br>

# line-height
The line-height CSS property sets the height of a line box. 
It's commonly used to set the distance between lines of text. 
On block-level elements, it specifies the minimum height of line boxes within the element. 

The line-height property is unusual in that it accepts both units and unitless values.

<strong>When you use a unitless number, that declared value is inherited</strong>, 
meaning its computed value is recalculated for each inheriting child element. 

Using a unitless number lets you set the line height on the body and then forget about it for the rest of the page, 
unless there are particular places where you want to make an exception.

-> ./basic/line-height.html

```css
div {
  line-height: 100px;
  font-size: 20px;
}
```
可能下意识的就以为line-height就是作用在块级盒子上的。
实际上呢，他是作用于块级盒子中的文本上的，如果去除 div 中的文本就会看到其高度就没有 100px 了，文本也是行内元素。

另外则是line-height的值可以为数值（不带单位）、百分比以及数值带单位（包括例如em这样的相对单位）。
- 当值为数值（不带单位），相对计算的是其font-size属性，如果font-size的值为16px，则line-height: 1.5的值就为16 * 1.5，就是24px;
```css
.example {
  font-size: 16px;
  line-height: 1.5; /* 1.5 * 16px = 24px */
}
```
- 当一个元素line-height是用带单位的值声明的（比如em,px,百分比），那么它的后代元素line-height会继承计算结果值。
```css
.parent {
  font-size: 16px;
  line-height: 150%; /* 24px，百分比和em都是相对于font-size计算 */
}

.child {
  font-size: 20px;
  /* 继承的 line-height 为 24px，而不是 150% * 20px = 30px */
}
```

<br>

## inherit
you can style your body element just like any other HTML element, 
and all your other elements will inherit your body element's styles.

example:
```
<style>
  body {
    background-color: black;
    color: green;
    font-family: monospace;
  }

</style>
<body>
  <h1>Hello World</h1>
</body>
```

由于h1没有显示指定color和font-family，h1会继承color: green和font-family: monospace两个属性。

一般文本类的属性都是可以继承的，例如color，font-size，font-family等。

与之对应有些属性时不能继承的，例如border，padding，margin，background等。
其实也很好理解这些属性为何不能继承，因为一旦这些属性可以继承，那么会影响到了整个布局，例如，我们在父元素上加个边框，但是其子元素，后代元素都继承了边框，那就不得不去写更多的代码来消除继承的影响，这样的结果肯定不是CSS设计的初衷。

<br>

## color的16进制表示有时候可以简写
red's hex code #FF0000 can be shortened to #F00. 
This shortened form gives one digit for red, one digit for green, and one digit for blue.

<br>

## css定义和使用变量
To create a CSS variable, you just need to give it a name with two hyphens in front of it and assign it a value like this:
定义：--penguin-skin: gray;

使用：background: var(--penguin-skin);

fallback: 当找不到变量-penguin-skin时，使用black
```
background: var(--penguin-skin, black);
```

example: Improve Compatibility with Browser Fallbacks
```css
<style>
  :root {
    --red-color: red;
  }
  .red-box {
    background: red;
    background: var(--red-color);
    height: 200px;
    width:200px;
  }
</style>
<div class="red-box"></div>
```
如果有的浏览器不支持css变量定义，就会回退到background: red;

<br>

## Inherit CSS Variables
To make use of inheritance, CSS variables are often defined in the :root element.
example:
```css
:root {
  --penguin-skin: black;
}
```
然后可以在css中通过var直接使用,其第二个参数是回退，表示--penguin-skin不存在时，回退为gray:
```css
.penguin-top {
  top: 10%;
  left: 25%;
  background: var(--penguin-skin, gray);
  width: 50%;
  height: 45%;
  border-radius: 70% 70% 60% 60%;
}
```
-> ./basic/variable.html

<br>

## input框文本居右
```css
<input type="text" value="xxx"  size="100" style="text-align:right" />
```

## css元素重叠的方法
1、给元素设置负margin，负margin可以让元素的占用空间变小，后面的元素可以覆盖当前的元素；
2、使用position属性，利用绝对定位、相对定位来让多个元素进行重叠。

## bottom
The effect of bottom depends on how the element is positioned (i.e., the value of the position property):
- When position is set to absolute or fixed, the bottom property specifies the distance between the element's outer margin of bottom edge and the inner border of the bottom edge of its containing block.
- When position is set to relative, the bottom property specifies the distance the element's bottom edge is moved above its normal position.
- When position is set to sticky, the bottom property is used to compute the sticky-constraint rectangle.
- When position is set to static, the bottom property has no effect.

When both top and bottom are specified, position is set to absolute or fixed, and height is unspecified (either auto or 100%) both the top and bottom distances are respected. In all other situations, if height is constrained in any way or position is set to relative, the top property takes precedence and the bottom property is ignored.

reference: https://developer.mozilla.org/en-US/docs/Web/CSS/bottom

## overflow
- visible(default): Content is not clipped(剪除，剪掉) and may be rendered outside the padding box.
- hidden: Content is clipped if necessary to fit the padding box.
- scroll: Browsers always display scrollbars whether or not any content is actually clipped, preventing scrollbars from appearing or disappearing as content changes.
- auto: Depends on the user agent. If content fits inside the padding box, it looks the same as visible, but still establishes a new block formatting context. Desktop browsers provide scrollbars if content overflows.

The overflow property is specified as one or two keywords chosen from the list of values below. 
If two keywords are specified, the first applies to overflow-x and the second to overflow-y. 
Otherwise, both overflow-x and overflow-y are set to the same value.

overflow是基于是否超过padding box来决定行为。

### 实例：打开 Modal 时禁止 body 滚动
打开弹窗的时候，会发现背后的内容还是可以滚动，我们需要在弹窗出现时禁用滚动，在弹窗消失时恢复。
```
/ 打开 Modal 时，禁止 body 滚动
document.body.style.overflow = 'hidden';

// 恢复滚动
document.body.style.removeProperty('overflow');
```

reference: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow

## height、min-height、max-height
1. 一般不设置height大小, height由其children决定。
2. For percentage-based heights to work, the parent must have an explicitly defined height.（当height使用百分比时，父元素必须明确指定height大小）
3. A better approach is to use the viewport-relative vh units, which you reviewed in chapter A height of 100 vh is exactly the height of the viewport. 
The most common use, though, is to create columns of equal height. This too can be solved without a percentage.
（需要设置height大小时，更建议使用vh）
4. 当同一行两列需要等高时，使用flex布局（推荐）或 table布局（不推荐）
5. Two properties that can be immensely helpful are min-height and max-height Instead of explicitly defining a height.

- min-height means the element will be at least as high as you specify, 
and if the content doesn’t fit, the browser will allow the element to grow naturally to prevent overflow.
- max-height allows an element to size naturally, up to a point.

## vertical-align
A vertical-align declaration only affects <strong>inline and table-cell</strong> elements.