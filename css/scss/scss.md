# scss
sass 是一种 CSS 的预编译语言。它提供了 变量（variables）、嵌套（nested rules）、 混合（mixins）、 函数（functions）等功能，
并且完全兼容 CSS 语法。sass 能够帮助复杂的样式表更有条理， 并且易于在项目内部或跨项目共享设计。

<br>

## 1. @mixin and @include
@mixin指令是另一种简化代码的方法。Mixins可以包含任意内容且可以传递参数，比'@extend'更加灵活和强大。
使用 @import 导入 mixin.scss 后，就可以用 include 语法去使用 Mixin 注册的代码块。
```
  @mixin reset-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @mixin horizontal-list {
    @include reset-list;

    li {
      display: inline-block;
      margin: {
        left: -2px;
        right: 2em;
      }
    }
  }

  nav ul {
    @include horizontal-list;
  }

  CSS OUTPUT：

  nav ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  nav ul li {
    display: inline-block;
    margin-left: -2px;
    margin-right: 2em;
  }
```
mixin还可以有入参：
```
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```

## 2. @at-root
The @at-root directive causes one or more rules to be emitted at the root of the document, 
rather than being nested beneath their parent selectors. It can either be used with a single inline selector:
```
    .parent {
      ...
      @at-root .child { ... }
    }

    Which would produce:

    .parent { ... }
    .child { ... }
```
## 3. @content
在引用混合样式的时候，可以先将一段代码导入到混合指令中，然后再输出混合样式，额外导入的部分将出现在 @content 标志的地方：
```
  @mixin apply-to-ie6-only {
    * html {
      @content;
    }
  }
  @include apply-to-ie6-only {
    #logo {
      background-image: url(/logo.gif);
    }
  }

  编译为

  * html #logo {
    background-image: url(/logo.gif);
  }
```
@content类似于一个占位符，或者插槽的作用。

## 4. @each的使用
```
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}

CSS OUTPUT

.icon-40px {
  font-size: 40px;
  height: 40px;
  width: 40px;
}

.icon-50px {
  font-size: 50px;
  height: 50px;
  width: 50px;
}

.icon-80px {
  font-size: 80px;
  height: 80px;
  width: 80px;
}
```
@each也可以用于map, 则是 @each $key,$value in $map

## 5. 关于default的说明
```
$content: "antzone" !default;
#main {
  content: $content;
}

编译为css代码如下:
#main {
  content: "antzone"; 
}
```
由于在声明默认值之前，并没有变量的赋值，所以就使用默认值。

再来看一段代码实例:
```
$content:"softwhy.com";
$content: "antzone" !default;
#main {
  content: $content;
}

编译成css代码如下:

#main {
  content: "softwhy.com"; 
}
```
由于在默认变量值声明之前，就已经有变量赋值了，所以就不再使用默认值。

## 6. mix
```
.foo{
  color: mix(#036, #d2e1dd);
  color: mix(#000, #fff, 75%);
}

Syntax
mix($color1, $color2, $weight)
```
- $color1	Required	Specifies the first color.
- $color2	Required	Specifies the second color.
- $weight	Optional	Specifies the percentage of mix of $color1 to $color2.
The $weight must be a number between 0% and 100% (both are inclusive). Default value is 50%.

<br>

## 7. modules
You don't have to write all your Sass in a single file. 
You can split it up however you want with the @use rule.
```
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
// styles.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

## 8. @extend
Using @extend lets you share a set of CSS properties from one selector to another.
```
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```

## 9. 操作符
在 CSS 中经常需要做数学计算。Sass 支持部分标准的 数学运算符，例如 +、-、*、math.div() 和 %。
```
@use "sass:math";

.container {
  display: flex;
}

article[role="main"] {
  width: math.div(600px, 960px) * 100%;
}

aside[role="complementary"] {
  width: math.div(300px, 960px) * 100%;
  margin-left: auto;
}
```
## 参考资料
https://www.sasscss.com/guide


## demo
vue/ui-demo