# Scss是什么
Scss 是 Sass 3 引入新的语法，是Sassy CSS的简写，是CSS3语法的超集，也就是说所有有效的CSS3样式也同样适合于Sass。说白了Scss就是Sass的升级版，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能。也就是说，任何标准的 CSS3 样式表都是具有相同语义的有效的 SCSS 文件。另外，SCSS 还能识别大部分 CSS hacks（一些 CSS 小技巧）和特定于浏览器的语法，例如：古老的 IE filter 语法。

由于 Scss 是 CSS 的扩展，因此，所有在 CSS 中正常工作的代码也能在 Scss 中正常工作。也就是说，对于一个 Sass 用户，只需要理解 Sass 扩展部分如何工作的，就能完全理解 Scss。大部分扩展，例如变量、parent references 和 指令都是一致的；唯一不同的是，SCSS 需要使用分号和花括号而不是换行和缩进。

## Scss 与 Sass异同
Sass 和 Scss 其实就是同一种东西，我们平时都称之为 Sass，两者之间不同之处主要有以下两点：

1.文件扩展名不同，Sass 是以“.sass”后缀为扩展名，而 Scss 是以“.scss”后缀为扩展名。

2.语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 Scss 的语法书写和我们的CSS 语法书写方式非常类似。

我们不妨来看看下面两段代码，这样会更加直观，更容易理解。

简单的Sass代码:
```
#sidebar
width: 30%
background-color: #faa
```

对应的Scss代码
```
#sidebar {
  width: 30%;
  background-color: #faa;
}
```
现在一般都用scss了。