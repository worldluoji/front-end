# CSS
CSS (Cascading Style Sheets，层叠样式表），本质上就是声明规则，然后产生各种效果。

A key part of CSS development comes down to writing rules in such a way that they’re predictable.

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
```
id selector : #xxx
class selector : .xxx
[type='radio'] {
  margin: 20px 0px 20px 0px;
}

```

<br>

## CSS的组成
```
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

## font "degrade" 
There are several default fonts that are available in all browsers. 
These generic font families include monospace, serif and sans-serif
When one font isn't available, you can tell the browser to "degrade" to another font.

For example, if you wanted an element to use the Helvetica font, 
but degrade to the sans-serif font when Helvetica isn't available, you will specify it as follows:
```
p {
  font-family: Helvetica, sans-serif;
}
```
Generic font family names are not case-sensitive. Also, they do not need quotes because they are CSS keywords.

## padding、margin
An element's padding controls the amount of space between the element's content and its border.
```
padding: 40px 20px 20px 40px; 
```
顺时针，第一个是top

```
padding: 40px 20px;
```
上下40px, 左右20px

```
padding: 40px 30px 20px;
```
top 40px, bottom 20px, 左右30px

An element's margin controls the amount of space between an element's border and surrounding elements.
用法和padding一致

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
```
.padded {
  font-size: 16px;
  padding: 1em;
}
```
那么，这里1em=16px，表示上下左右padding都是16px;
如果.padded没有设置font-size, 就会继承父元素的font-size，即此时1em等于父元素的font-size

还有一种情况
```
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

# line-height
The line-height CSS property sets the height of a line box. It's commonly used to set the distance between lines of text. On block-level elements, it specifies the minimum height of line boxes within the element. 
The line-height property is unusual in that it accepts both units and unitless values.

When you use a unitless number, that declared value is inherited, meaning its computed value is recalculated for each inheriting child element. 
This will almost always be the result you want. 
Using a unitless number lets you set the line height on the body and then forget about it for the rest of the page, unless there are particular places where you want to make an exception.

-> ./basic/line-height.html

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

## color的16进制表示有时候可以简写
red's hex code #FF0000 can be shortened to #F00. 
This shortened form gives one digit for red, one digit for green, and one digit for blue.

## css定义和使用变量
To create a CSS variable, you just need to give it a name with two hyphens in front of it and assign it a value like this:
定义：--penguin-skin: gray;

使用：background: var(--penguin-skin);

fallback: 当找不到变量-penguin-skin时，使用black
```
background: var(--penguin-skin, black);
```

example: Improve Compatibility with Browser Fallbacks
```
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

## Inherit CSS Variables
To make use of inheritance, CSS variables are often defined in the :root element.
example:
```
:root {
  --penguin-skin: black;
}
```
然后可以在css中通过var直接使用,其第二个参数是回退，表示--penguin-skin不存在时，回退为gray:
```
.penguin-top {
  top: 10%;
  left: 25%;
  background: var(--penguin-skin, gray);
  width: 50%;
  height: 45%;
  border-radius: 70% 70% 60% 60%;
}
```

## media query
使用 @media 查询，你可以针对不同的媒体类型定义不同的样式。
@media 可以针对不同的屏幕尺寸设置不同的样式，特别是如果你需要设置设计响应式的页面，@media 是非常有用的。
当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

语法：
```
@media not|only mediatype and (mediafeature and|or|not mediafeature) {
  CSS-Code;
}
```

not, and, 和 only 可用于联合构造复杂的媒体查询，您还可以通过用逗号分隔多个媒体查询，将它们组合为一个规则:
- not: not 运算符用于否定媒体查询，如果不满足这个条件则返回 true，否则返回 false。 如果出现在以逗号分隔的查询列表中，它将仅否定应用了该查询的特定查询。 如果使用 not 运算符，则还必须指定媒体类型。
- only: only 运算符仅在整个查询匹配时才用于应用样式，并且对于防止较早的浏览器应用所选样式很有用。 当不使用 only 时，旧版本的浏览器会将 screen and (max-width: 500px) 简单地解释为 screen，忽略查询的其余部分，并将其样式应用于所有屏幕。 如果使用 only 运算符，则还必须指定媒体类型。
- , (逗号) 逗号用于将多个媒体查询合并为一个规则。 逗号分隔列表中的每个查询都与其他查询分开处理。 因此，如果列表中的任何查询为 true，则整个 media 语句均返回 true。 换句话说，列表的行为类似于逻辑或 or 运算符。
- and: and 操作符用于将多个媒体查询规则组合成单条媒体查询，当每个查询规则都为真时则该条媒体查询为真，它还用于将媒体功能与媒体类型结合在一起。

example1:
```
/*查询屏幕*/
@media screen and 条件 {
}
/*条件的写法*/
/*min-width:只要屏幕宽度超过这个值的设备样式就能生效*/
/*max-width:只要屏幕宽度小于这个值的设备样式就能生效*/

/* 表示可见区域大于1200px样式生效 */
@media screen and (min-width: 1200px) {
  .container {
    width: 1170px;
    background-color: red;
  }
}
/* 表示可见区域大于992px小于1200px样式生效 */
@media screen and (min-width: 992px) and (max-width: 1200px) {
  .container {
    width: 970px;
    background-color: blue;
  }
}
```

example2:
```
:root {
  --penguin-size: 300px;
  --penguin-skin: gray;
  --penguin-belly: white;
  --penguin-beak: orange;
}

@media (max-width: 350px) {
  :root {
    /* Only change code below this line */
    --penguin-size: 200px;
    --penguin-skin: black;
    /* Only change code above this line */
  }
}
```
当最大宽度为350px时，大小变为200px,且颜色变为黑色

media query参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/Media_Queries/Using_media_queries

## input框文本居右
```
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