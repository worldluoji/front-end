# 原子化CSS
## 什么是原子化CSS（Atomic CSS)
与原子化相对应的就是组件化，比如在以前我们使用的bootstrap，它提供了现成的样式解决方案，
或者自己编写的一个样式class也是组件化，原子化就是将一个css类只对应一个规则，比如编写一个btn，组件化的开发方式是
```
<button type="button btn-success" class="btn">Basic</button>
```
原子化
```
<button class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
  Click me
</button>
```
这时候有人就问了，这不是相当于style属性吗
```
<button style="padding: 1rem, 2rem; font-family: 'semi'; font-weight: bold; ...">
  Click me
</button>
```
那原子化CSS的优势在哪儿呢？

1. 不用想类名！相信很多人在编写样式类的时候经常会纠结类名，原子化提供的类名都是能够一眼就能知道大概意思又比直接编写style更加简洁

2. ”无需离开您的HTML，即可快速建立现代网站“，这是Tailwindcss官网的引入语，确实，对于现在组件化开发的方式来说，单个组件文件相比以前一个html对应一个页面来说代码量要小很多，可能就几行html的组件代码，直接在html中编写样式是个更好的选择

3. 利用原子化框架提供的预设原子类，极大地提高开发效率，将更多时间用在页面构造而不是重复地编写相似的代码

4. IDE支持，VS Code 的 Tailwind CSS 智能提示扩展涵盖了所有的类。在编辑器内既可得到智能的自动完成建议、提示及类定义等功能，而且无需配置。

## 常用的原子化CSS框
Tailwind CSS、Unocs

## 参考
https://juejin.cn/post/7028841960752283656