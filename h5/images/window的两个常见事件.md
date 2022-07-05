# window的两个常见事件

## window.onload
- window.onload() 方法用于在网页加载完毕后立刻执行的操作，即当 HTML 文档加载完毕后，立刻执行某个方法。
- window.onload() 通常用于 <body> 元素，在页面完全载入后(包括图片、css文件等等)执行脚本代码。

窗口加载事件:
```
window.onload = function(){} 
    或者 
window.addEventListener('load',function(){})
```
注意：
- 有了window.onload就可以把JS代码写到页面元素的上方，因为onload是等页面内容全部加载完毕，再去执行处理函数;
- 但是window.onload传统注册事件方式只能写一次，如果有多个，会以最后一个window.onload = function(){}为准。
  

还有一个非常相似的 document.addEventListener('DOMContentLoaded',function(){})   DOMContentLoaded触发事件时，仅当DOM(主要的标签元素)加载完成时就会触发，不包括样式表、图片等
```
document.addEventListener('DOMContentLoaded', function () {
    alert(33);
})

```

<br>

## window.onresize
window.onresize是调整窗口大小加载事件，当触发时就调用的处理函数。
绑定事件的两种方式：
```
window.onresize = function(){} 
或者
window.addEventListener('resize',function(){})
```
    
example:
```
window.onresize = function () {
    console.log(window.innerWidth);
    console.log('变化了！');
    // 只要窗口大小发生变化，就会触发
    // 以前没css3的时候，经常用这个事件完成响应式布局。window.innerWidth获取当前屏幕宽度
    if (window.innerWidth <= 800) {
        div.style.display = 'none';
    } else {
        div.style.display = 'block';
    }
}
```
          