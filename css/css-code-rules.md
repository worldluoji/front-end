# CSS编码规范
## 1. 格式要规范
使用两个空格缩进，字符串使用单引号，要换行

good example
```
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
```
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
```
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
```
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
```
@keyframes kf {
  from { margin-top: 50px; }
  50%  { margin-top: 150px !important; } /* Noncompliant; ignored */
  to   { margin-top: 100px; }
}
```

good example
```
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

## 参考资料
- https://google.github.io/styleguide/htmlcssguide.html?ref=hackernoon.com
- https://github.com/cssdream/css-creating