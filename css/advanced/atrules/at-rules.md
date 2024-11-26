# at-rules
At-rules are CSS statements that instruct CSS how to behave. 
They begin with an at sign, '@' (U+0040 COMMERCIAL AT), 
followed by an identifier and includes everything up to the next semicolon, ';' (U+003B SEMICOLON), or the next CSS block, whichever comes first.

<br>

## regular at-rules
There are several regular at-rules, designated by their identifiers, each with a different syntax:
- @charset — Defines the character set used by the style sheet.
- @import — Tells the CSS engine to include an external style sheet.
- @namespace — Tells the CSS engine that all its content must be considered prefixed with an XML namespace.

<br>

## nested at-rules
- @media — A conditional group rule that will apply its content if the device meets the criteria of the condition defined using a media query.
- @supports — A conditional group rule that will apply its content if the browser meets the criteria of the given condition.
- @page — Describes the aspect of layout changes that will be applied when printing the document.
- @font-face — Describes the aspect of an external font to be downloaded.
- @keyframes — Describes the aspect of intermediate steps in a CSS animation sequence.
- @counter-style — Defines specific counter styles that are not part of the predefined set of styles.
- @font-feature-values (plus @swash, @ornaments, @annotation, @stylistic, @styleset and @character-variant) — Define common names in font-variant-alternates for feature activated differently in OpenType.
- @property — Describes the aspect of custom properties and variables.
- @layer – Declares a cascade layer and defines the order of precedence in case of multiple cascade layers.

<br>

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

mediatype:
- all: 默认。用于所有媒体类型设备。
- print: 用于打印机。
- screen:	用于计算机屏幕、平板电脑、智能手机等。
- speech:	用于朗读页面的屏幕阅读器。

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

### prefers-reduced-motion
CSS 媒体查询特性 prefers-reduced-motion 用于检测用户的系统是否被开启了动画减弱功能。
```
<div class="animation">animated box</div>

.animation {
  animation: vibrate 0.3s linear infinite both;
}

@media (prefers-reduced-motion: reduce) {
  .animation {
    animation: none;
  }
}
```

<br>

### prefers-contrast
The prefers-contrast CSS media feature is used to detect 
whether the user has requested the web content to be presented with a lower or higher contrast.
```
<div class="contrast">low contrast box</div>

.contrast {
  width: 100px;
  height: 100px;
  outline: 2px dashed black;
}

@media (prefers-contrast: more) {
  .contrast {
    outline: 2px solid black;
  }
}
```

<br>

### Viewport orientation
Use the portrait and landscape modifiers to conditionally add styles when the viewport is in a specific orientation.

the following rule will apply its styles if the user's device has either a minimum height of 680px or is a screen device in portrait mode
```
@media (min-height: 680px), screen and (orientation: portrait) {
  /* … */
}
```

<br>

### print modifier
Use the print modifier to conditionally add styles that only apply when the document is being printed
```
@media not screen and (color), print and (color) {
  /* … */
}
```

<br>

## references
- https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast