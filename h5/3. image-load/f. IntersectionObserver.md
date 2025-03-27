# IntersectionObserver
传统的实现方法是，监听到scroll事件后，调用目标元素（绿色方块）的getBoundingClientRect()方法，
得到它对应于视口左上角的坐标，再判断是否在视口之内。
这种方法的缺点是，由于scroll事件密集发生，计算量很大，容易造成性能问题。

目前有一个新的 IntersectionObserver API，可以自动"观察"元素是否可见，Chrome 51+ 已经支持。
由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。

## 使用方法
```
var io = new IntersectionObserver(callback, option);
```
callback函数的参数（entries）是一个数组，每个成员都是一个IntersectionObserverEntry对象。
举例来说，如果同时有两个被观察的对象的可见性发生变化，entries数组就会有两个成员。
```
var io = new IntersectionObserver(
  entries => {
    console.log(entries);
  }
);
```

进行观察：
```
// 开始观察
io.observe(document.getElementById('example'));
// io.observe(elementA) io.observe(elementB) ...

// 停止观察
io.unobserve(element);

// 关闭观察器
io.disconnect();
```

### IntersectionObserverEntry 对象

```
{
  time: 3893.92,
  rootBounds: ClientRect {
    bottom: 920,
    height: 1024,
    left: 0,
    right: 1024,
    top: 0,
    width: 920
  },
  boundingClientRect: ClientRect {
     // ...
  },
  intersectionRect: ClientRect {
    // ...
  },
  intersectionRatio: 0.54,
  target: element
}
```
各属性含义：
```
time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
target：被观察的目标元素，是一个 DOM 节点对象
rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
boundingClientRect：目标元素的矩形区域的信息
intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
intersectionRatio：目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0
```

## 参考
https://ruanyifeng.com/blog/2016/11/intersectionobserver_api.html