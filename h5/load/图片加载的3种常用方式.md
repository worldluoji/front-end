在日常的项目开发过程中，我们一般会遇到三种加载图片的场景:

在 HTML 或者 JSX 中，通过 img 标签来加载图片，如:
```
<img src="../../assets/a.png"></img>
```
在 CSS 中通过 background 属性加载图片，如:
```
background: url('../../assets/b.png') norepeat;
```
在 JavaScript 中，通过脚本的方式动态指定图片的src属性，如:
```
document.getElementById('hero-img').src = '../../assets/c.png'
```