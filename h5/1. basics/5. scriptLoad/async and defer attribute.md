# async and defer
在页面中引用各种的第三方脚本，如果第三方服务商出现了一些小问题，比如延迟之类的，就会使得页面白屏。
好在script提供了两种方式来解决上述问题，async和defer，这两个属性使得script都不会阻塞DOM的渲染。
但既然会存在两个属性，那么就说明，这两个属性之间肯定是有差异的。

## 1. defer属性
```
<script src="a.js" defer></script>
<script src="b.js" defer></script>
```
加了defer属性script标签的页面，运行流程如下：

1. 浏览器开始解析HTML页面
2. 遇到有defer属性的script标签，浏览器继续往下面解析页面，且会并行下载script标签的外部js文件
3. 解析完HTML页面，再执行刚下载的js脚本
（defer脚本会在文档渲染完毕后，DOMContentLoaded事件调用前执行，即刚刚解析完，且可保证执行顺序就是他们在页面上的先后顺序）

注意事项：
1. 内置js代码的script标签，以及动态生成的script标签，defer属性不生效
2. 有defer属性的script标签脚本文件里不能使用document.write方法
3. defer脚本会在DOMContentLoaded和load事件之前执行
4. defer只适用于外联脚本，如果script标签没有指定src属性，只是内联脚本，不要使用defer
如果有多个声明了defer的脚本，则会按顺序下载和执行

## 2. async属性
```
<script src="a.js" async></script>
<script src="b.js" async></script>
```
流程如下：
1. 浏览器开始解析页面
2. 遇到有async属性的script标签，会继续往下解析，并且同时另开进程下载脚本
3. 脚本下载完毕，浏览器停止解析，开始执行脚本，执行完毕后继续往下解析

注意事项：
1. 无法保证脚本的执行顺序，哪个脚本先下载完毕，就先执行哪个。
2. 也不能使用document.write方法。
3. async脚本会在加载完毕后执行，async脚本的加载不计入DOMContentLoaded事件统计，async会在load事件之前执行，但并不能确保与DOMContentLoaded的执行先后顺序。
4. 只适用于外联脚本，这一点和defer一致，如果有多个声明了async的脚本，其下载和执行也是异步的，不能确保彼此的先后顺序。

## 3. 使用场景区分：
1. 脚本之间没有依赖关系的，使用async
2. 脚本之间有依赖关系的，使用defer
3. 若同时使用async和defer，defer不起作用，async生效

## 4. 推荐的应用场景
- defer: 如果你的脚本代码依赖于页面中的DOM元素（文档是否解析完毕），或者被其他脚本文件依赖。
例：评论框、代码语法高亮、polyfill.js
- async: 如果你的脚本并不关心页面中的DOM元素（文档是否解析完毕），并且也不会产生其他脚本需要的数据。


## 5. 如何保证创建的script标签加载完成？
```
let scriptEle = document.createElement('script');
scriptEle.onload = function() {
    console.log('加载完了');
}
document.body.appendChild(scriptEle);
```