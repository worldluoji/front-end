# examples中用到的知识点整理
## 1. clamp
clamp() 函数接收三个用逗号分隔的表达式作为参数，按最小值、首选值、最大值的顺序排列。
```
{
    font-size: clamp(20px, 18px, 40px); 
    width: clamp(100px, 100%, 200px);
}
```
- 当首选值比最小值要小时，则使用最小值。
- 当首选值介于最小值和最大值之间时，用首选值。
- 当首选值比最大值要大时，则使用最大值。

## 2. background-clip : Determines the background painting area
background-clip  设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面。

background-position 10% 30% => 两个值的语法： 一个定义 x 坐标，另一个定义 y 坐标

参考：https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip

## 3. linear-gradient
```
/* 渐变轴为45度，从蓝色渐变到红色 */
linear-gradient(45deg, blue, red);

/* 从右下到左上、从蓝色渐变到红色 */
linear-gradient(to left top, blue, red);

/* 从下到上，从蓝色开始渐变、到高度 40% 位置是绿色渐变开始、最后以红色结束 */
linear-gradient(0deg, blue, green 40%, red);
```

参考资料：https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient

## 4. background-position 
background-position  属性为每一个背景图片设置初始位置。这个位置是相对于由 background-origin 定义的位置图层的。

background-position 默认值: 0% 0%, 效果等同于 left top。

参考资料：https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position

## 5. background-origin
```
background-origin: border-box
background-origin: padding-box
background-origin: content-box
background-origin: inherit
```
- border-box: 背景图片的摆放以 border 区域为参考
- padding-box: 背景图片的摆放以 padding 区域为参考
- content-box: 背景图片的摆放以 content 区域为参考

参考资料：https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin

## 6. background
简写的顺序如下: bg-color || bg-image || bg-position [ / bg-size]? || bg-repeat || bg-attachment || bg-origin || bg-clip

```
background-image: 设置背景图像, 可以是真实的图片路径, 也可以是创建的渐变背景;
background-position: 设置背景图像的位置;
background-size: 设置背景图像的大小;
background-repeat: 指定背景图像的铺排方式;
background-attachment: 指定背景图像是滚动还是固定;
background-origin: 设置背景图像显示的原点[background-position相对定位的原点];
background-clip: 设置背景图像向外剪裁的区域;
background-color: 指定背景颜色。
```

注意：
- background-position 和 background-size 属性, 之间需使用/分隔, 且position值在前, size值在后。
- 如果同时使用 background-origin 和 background-clip 属性, origin属性值需在clip属性值之前, 如果origin与clip属性值相同, 则可只设置一个值。

例子：
```
linear-gradient(90deg, var(--color-one), var(--color-two), var(--color-one)) 0 0 / var(--bg-size) 100%;
即对应: 
background-color background-position / background-size
```

参考资料：https://juejin.cn/post/6844903463273381901

## 7. transform-style
transform-style 设置元素的子元素是位于 3D 空间中还是平面中。
```
/* Keyword values */
transform-style: flat;
transform-style: preserve-3d;
```
默认是平面flat.

参考：https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-style


## 8. filter
filter表示滤镜，通常用于调整图像、背景和边框的渲染

```
/* <filter-function> values */
filter: blur(5px);  高斯模糊
filter: brightness(0.4); 明度
filter: contrast(200%); 对比度
filter: drop-shadow(16px 16px 20px blue); 输入图像应用阴影效果
filter: grayscale(50%); 灰度，值为 100% 则完全转为灰度图像，值为 0% 图像无变化
filter: hue-rotate(90deg); 色相旋转。angle 一值设定图像会被调整的色环角度值。值为 0deg，则图像无变化
filter: invert(75%); 值为 100% 则图像完全反转
filter: opacity(25%); 图像的透明程度
filter: saturate(30%); 图像饱和度
filter: sepia(60%); 图像转换为深褐色

/* Multiple filters */
filter: contrast(175%) brightness(3%);
```
参考：https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter

## 9. :nth-of-type  :nth-child(an+b)
:nth-of-type(n) 针对具有一组兄弟节点的标签，用 n 来筛选出在一组兄弟节点的位置
```
/* 在每组兄弟元素中选择第四个 <p> 元素 */
p:nth-of-type(4n) {
  color: lime;
}
```
:nth-child(an+b) 这个 CSS 伪类首先找到所有当前元素的兄弟元素，然后按照位置先后顺序从 1 开始排序，选择的结果为 CSS 伪类:nth-child 括号中表达式（an+b）匹配到的元素集合（n=0，1，2，3...）,
例如：2n+1 匹配位置为 1、3、5、7...的元素。你可以使用关键字 odd 来替换此表达式。

参考： 
- https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type
- https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child

## 10. 关于transform
tanslate 3d变换中的移动，z中的正方向面向用户,值越大，越靠近用户。

translateZ（100px）离用户更近了。

translateX 水平方向，translateY 垂直方向

translate(tx) 等价于 translateX(tx)

translate(tx, ty) 等价于 translateX(tx) translateX(ty)

rotate 如果为正值，则运动将为顺时针，如果为负值，则为逆时针。180°的旋转称为点反射 (point reflection)。

参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function


## 11. clip-path
The clip-path CSS property creates a clipping region that sets what part of an element should be shown.

参考： https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path