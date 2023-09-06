# scss是什么
scss 是 sass 3 引入新的语法，是sassy CSS的简写，是CSS3语法的超集，也就是说所有有效的CSS3样式也同样适合于sass。说白了scss就是sass的升级版，其语法完全兼容 CSS3，并且继承了 sass 的强大功能。也就是说，任何标准的 CSS3 样式表都是具有相同语义的有效的 scss 文件。另外，scss 还能识别大部分 CSS hacks（一些 CSS 小技巧）和特定于浏览器的语法，例如：古老的 IE filter 语法。

由于 scss 是 CSS 的扩展，因此，所有在 CSS 中正常工作的代码也能在 scss 中正常工作。也就是说，对于一个 sass 用户，只需要理解 sass 扩展部分如何工作的，就能完全理解 scss。大部分扩展，例如变量、parent references 和 指令都是一致的；唯一不同的是，scss 需要使用分号和花括号而不是换行和缩进。

## scss 与 sass异同
sass 和 scss 其实就是同一种东西，我们平时都称之为 sass，两者之间不同之处主要有以下两点：

1.文件扩展名不同，sass 是以“.sass”后缀为扩展名，而 scss 是以“.scss”后缀为扩展名。

2.语法书写方式不同，sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 scss 的语法书写和我们的CSS 语法书写方式非常类似。

我们不妨来看看下面两段代码，这样会更加直观，更容易理解。

简单的sass代码:
```
#sidebar
width: 30%
background-color: #faa
```

对应的scss代码
```
#sidebar {
  width: 30%;
  background-color: #faa;
}
```
现在一般都用scss了。