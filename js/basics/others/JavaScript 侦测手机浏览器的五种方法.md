# JavaScript 侦测手机浏览器的五种方法

## 1. 最简单的方法就是分析浏览器的 user agent 字符串，它包含了设备信息。

JS 通过navigator.userAgent属性拿到这个字符串，只要里面包含mobi、android、iphone等关键字，就可以认定是移动设备。

```
if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
  // 当前设备是移动设备
}

// 另一种写法
if (
  navigator.userAgent.match(/Mobi/i) ||
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/iPhone/i)
) {
  // 当前设备是移动设备
}
```
这种方法的优点是简单方便，缺点是不可靠，因为用户可以修改这个字符串，让手机浏览器伪装成桌面浏览器。

Chromium 系的浏览器，还有一个navigator.userAgentData属性，也是类似的作用。不同之处是它将 user agent 字符串解析为一个对象，该对象的mobile属性，返回一个布尔值，表示用户是否使用移动设备。

const isMobile = navigator.userAgentData.mobile; 
注意，苹果的 Safari 浏览器和 Firefox 浏览器都不支持这个属性，具体情况可以查看 Caniuse 网站。

## 2. 通过屏幕宽度，判断是否为手机。

window.screen对象返回用户设备的屏幕信息，该对象的width属性是屏幕宽度（单位为像素）。
```
if (window.screen.width < 500) {
  // 当前设备是移动设备 
}
```
这个方法的缺点在于，如果手机横屏使用，就识别不了。

另一个属性window.innerWidth返回浏览器窗口里面的网页可见部分的宽度，比较适合指定网页在不同宽度下的样式。
```
const getBrowserWidth = function() {
  if (window.innerWidth < 768) {
    return "xs";
  } else if (window.innerWidth < 991) {
    return "sm";
  } else if (window.innerWidth < 1199) {
    return "md";
  } else {
    return "lg";
  }
};
```

## 3. window.orientation
第三种方法是侦测屏幕方向，手机屏幕可以随时改变方向（横屏或竖屏），桌面设备做不到。

window.orientation属性用于获取屏幕的当前方向，只有移动设备才有这个属性，桌面设备会返回undefined。
```
if (typeof window.orientation !== 'undefined') {
  // 当前设备是移动设备 
}
```
注意，iPhone 的 Safari 浏览器不支持该属性。


## 4. touch 事件
第四种方法是，手机浏览器的 DOM 元素可以通过ontouchstart属性，为touch事件指定监听函数。桌面设备没有这个属性。

```
function isMobile() { 
  return ('ontouchstart' in document.documentElement); 
}
```

## 5. window.matchMedia()
最后一种方法是结合 CSS 来判断。

CSS 通过 media query（媒介查询）为网页指定响应式样式。如果某个针对手机的 media query 语句生效了，就可以认为当前设备是移动设备。

window.matchMedia()方法接受一个 CSS 的 media query 语句作为参数，判断这个语句是否生效。

```
let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
```
上面示例中，window.matchMedia()的参数是一个 CSS 查询语句，表示只对屏幕宽度不超过 700 像素的设备生效。
它返回一个对象，该对象的matches属性是一个布尔值。如果是true，就表示查询生效，当前设备是手机。

除了通过屏幕宽度判断，还可以通过指针的精确性判断。
```
let isMobile = window.matchMedia("(pointer:coarse)").matches;
```
上面示例中，CSS 语句pointer:coarse表示当前设备的指针是不精确的。由于手机不支持鼠标，只支持触摸，所以符合这个条件。

有些设备支持多种指针，比如同时支持鼠标和触摸。pointer:coarse只用来判断主指针，此外还有一个any-pointer命令判断所有指针。

```
let isMobile = window.matchMedia("(any-pointer:coarse)").matches;
```
上面示例中，any-pointer:coarse表示所有指针里面，只要有一个指针是不精确的，就符合查询条件。

## 6. 工具包
可以使用别人写好的工具包。比如 react-device-detect，它支持多种粒度的设备侦测。
```
import {isMobile} from 'react-device-detect';

if (isMobile) {
  // 当前设备是移动设备
}
```
