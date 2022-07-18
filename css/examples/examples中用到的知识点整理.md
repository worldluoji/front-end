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