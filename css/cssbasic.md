# css基础

## 1.  导入三方字体
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


## 2. font "degrade" 
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


## 3. boder
```
.thick-green-border {
  border-color: green;
  border-width: 10px;
  border-style: solid;
  border-radius: 50%;
}
```

## 4. id
There are several benefits to using id attributes: You can use an id to style a single element 
and later you'll learn that you can use them to select and modify specific elements with JavaScript.

id attributes should be unique. Browsers won't enforce this, but it is a widely agreed upon best practice. 

So please don't give more than one element the same id attribute.

## 5. padding
An element's padding controls the amount of space between the element's content and its border.
```
padding: 40px 20px 20px 40px; 
```
顺时针，第一个是top

## 6. margin
an element's margin controls the amount of space between an element's border and surrounding elements.
用法和padding一致

## 7. type selector
[type='radio'] {
  margin: 20px 0px 20px 0px;
}

id selector : #xxx

class selector : .xxx

## 8. unit
## 1) px:
Pixels are a type of length unit, which is what tells the browser how to size or space an item.

## 2) relative units:
rem是基于html元素的字体大小来决定，而em则根据使用它的元素的大小决定。

即em相对于父元素，rem相对于根元素。

## 3) in and mm refer to inches and millimeters, respectively. 这种绝对单位已经不再使用

## 4) 视口单位：vh、vw 推荐使用

## 9. body
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

## 10. multipla css
example1:
```
<style>
  body {
    background-color: black;
    font-family: monospace;
    color: green;
  }
  .pink-text {
    color: pink;
  }

  .blue-text {
    color: blue;
  }
</style>
<h1 class="pink-text blue-text">Hello World!</h1>
```
这时,blue覆盖pink,与css中定义的顺序有关，与class中哪个在前哪个在后无关。

example2:
```
<style>
  body {
    background-color: black;
    font-family: monospace;
    color: green;
  }
  .pink-text {
    color: pink;
  }

  #orange-text {
    color: orange;
  }
  
  .blue-text {
    color: blue;
  }

</style>
<h1 id="orange-text" class="pink-text blue-text">Hello World!</h1>
```

这时候颜色为orange, id selector优先级高。

example3:
In many situations, you will use CSS libraries. These may accidentally override your own CSS. 
So when you absolutely need to be sure that an element has specific CSS, you can use !important.
```
<style>
  body {
    background-color: black;
    font-family: monospace;
    color: green;
  }
  #orange-text {
    color: orange;
  }
  .pink-text {
    color: pink !important;
  }
  .blue-text {
    color: blue;
  }
</style>
<h1 id="orange-text" class="pink-text blue-text" style="color: white">Hello World!</h1>
```
通过!important， pink-text优先级最高。

总结：!important > style="xxx" > id selector > class selector

## 11. color的16进制表示有时候可以简写
red's hex code #FF0000 can be shortened to #F00. 
This shortened form gives one digit for red, one digit for green, and one digit for blue.

## 12. css定义和使用变量
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

## 13 Inherit CSS Variables
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

## 14. media query
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


15. input框文本居右
```
<input type="text" value="xxx"  size="100" style="text-align:right" />
```