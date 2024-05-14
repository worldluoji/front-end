# CSS编码规范
## 1. 格式要规范
使用两个空格缩进，字符串使用单引号，要换行

good example
```css
html {
  font-family: 'open sans', arial, sans-serif;
}

h1,
h2,
h3 {
  font-weight: normal;
  line-height: 1.2;
}

.example {
  background: fuchsia;
  border: 1px solid;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  color: blue;
}
```

## 2. 越简洁越好
bad example:
```css
/* Not recommended: meaningless */
#yee-1901 {
padding-bottom: 2em;
padding-left: 1em;
padding-right: 1em;
padding-top: 0em;
}
/* Not recommended: does not separate the words “demo” and “image” */
.demoimage {
color: #ffffff
}
```

good example:
```css
/* Recommended: specific */
#gallery {
  padding: 0 1em 2em;
}

#login {
  font-size: .8em;
}

.demo-image {
  color: #fff
}
```

padding的简写（复合写法）的代表意思：
- padding：10px；上下左右都是10px
- padding：10px 10px；上下10px，左右10px
- padding：10px 0 10px；上 左右 下
- padding：10px 20px 30px 40px； 上右下左
- 
margin的复合写法同padding


## 3. Font declarations至少包含一个通用的字体声明（建议）
如果没有通用字体声明，就会使用浏览器的默认字体，因此建议至少设置一个通用字体，
以减少fade(回退)到浏览器默认字体对效果的影响，

通用字体比如：Serif, Sans-serif, cursive, fantasy, Monospace

bad example
```css
/* Noncompliant; there is no generic font family in the list */
a {
  font-family: Helvetica, Arial, Verdana, Tahoma; 
}
```

good example
```
a {
  font-family: Helvetica, Arial, Verdana, Tahoma, sans-serif;
}
```

## 4. !important 不能用在keyframes上
在一些浏览器中， !important 用在 keyframes 上会失效，因此不在keyframes上使用
!important

bad example
```css
@keyframes kf {
  from { margin-top: 50px; }
  50%  { margin-top: 150px !important; } /* Noncompliant; ignored */
  to   { margin-top: 100px; }
}
```

good example
```css
@keyframes kf {
  from { margin-top: 50px; }
  50%  { margin-top: 150px; }
  to   { margin-top: 100px; }
}
```

## 5. 所有组合选择器（>, +, ~, >>）前后保留一个空格（以空格表示的后代选择器除外）
good example
```
.foo > .bar + div ~ #baz {
  color: blue;
}
```

## 6. 避免重复修饰选择器
在一定意义上，这会降低选择器性能。

不推荐的写法：
```css
div#search {
  float: right;
}

ul.nav {
  overflow: hidden;
}
```
推荐的写法：
```css
#search {
  float: right;
}

.nav {
  overflow: hidden;
}
```

## 7. 可以使用 * 通用选择器。
`*` 通用选择器效率低是一个误区，如有必要可以使用。
例如：
```css
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box; 
}
```

但不要在选择器末尾使用 * 通用选择器。
CSS 选择器匹配规则是从右往左，例如：
```css
.mod .foo * {
  border-radius: 6px;
}
```

## 8. 无前缀属性一定要写在最后
由于 CSS 后面的属性会覆盖前面的，无前缀属性写在最后可以保证浏览器一旦支持了，则用标准的无前缀属性来渲染。

不推荐的写法：
```css
.foo {
  -webkit-border-radius: 6px;
  border-radius: 6px;
  -moz-border-radius: 6px;
}
```
推荐的写法：
```css
.foo {
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px; 
}
```

## 其它
- 如果需要 CSS Hacks，需详细注明解决什么问题。
- 尽量避免使用 IE 中的 CSS filters。
- font-weight普通字重使用normal，加粗使用bold。大部分字体只有两个字重，所以不建议使用容易混淆的数值表示方法。
- 如无特别精确的要求，推荐使用不带单位的line-height，这样当前元素的行高只与自身font-size成比例关系，使排版更加灵活。例如line-height:1.5 line-height: 1.5 ≠ line-height: 150%

## 参考资料
- https://google.github.io/styleguide/htmlcssguide.html?ref=hackernoon.com
- https://github.com/cssdream/css-creating