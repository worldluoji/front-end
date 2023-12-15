# single-spa
single-spa is a framework for bringing together multiple JavaScript microfrontends in a frontend application.

single-spa 是一个将多个单页面应用聚合为一个整体应用的 JavaScript 微前端框架。 使用 single-spa 进行前端架构设计可以带来很多好处，例如:
- 在同一页面上使用多个前端框架 而不用刷新页面 (React, Vue, Angular)
- 独立部署每一个单页面应用
- 新功能使用新框架，旧的单页应用不用重写可以共存
- 改善初始加载时间，延迟加载代码

single-spa和qiankun都是通过监听url change事件，在路由变化时匹配到渲染的子应用并进行渲染。
这种基于路由监听渲染是single-spa最早实现的，作为出现最早、最有影响力的微前端框架，single-spa被很多框架和公司借鉴。
所以，可以把single-spa看作一个应用容器，负责不同应用间的重定向。

<br>

## single-spa生命周期函数
```
bootstrap() 
mount() 
unmount()
unload()
```
- 在某一个微前端应用第一次被激活时调用bootstrap()，每一次被加载时调用mount(),每一次卸载时调用unmount();
- 这三个生命周期方法都是异步的;
- single-spa保证不会在boostrap()完成之前调用mount().
- The unload lifecycle is an optionally implemented lifecycle function. It will be called whenever an application should be unloaded. This will not ever happen unless someone calls the unloadApplication API. If a registered application does not implement the unload lifecycle, then it assumed that unloading the app is a no-op. The purpose of the unload lifecycle is to perform logic right before a single-spa application is unloaded. Once the application is unloaded, the application status will be NOT_LOADED and the application will be re-bootstrapped.

The motivation for unload was to implement the hot-loading of entire registered applications, but it is useful in other scenarios as well when you want to re-bootstrap applications, but perform some logic before applications are re-bootstrapped.

<br>

## app-shell demo
### registerApplication
registerApplication会将应用程序代码映射到一个URL上：
```
singleSpa.registerApplication(
    name: "inspire",
    app: () => import("http://localhost:3002/pages.min.js"),
    activeWhen:({ pathname }) => pathname === "/",
    customProps: { // 自定义 props，从子应用的 bootstrap, mount, unmount 回调可以拿到
        authToken: 'xc67f6as87f7s9d'
    }
);
```
三个参数：
1. 唯一标识名称
2. loadingFn 函数，返回一个加载应用程序代码的promise
3. activityFn 函数，在每一次URL改变时调用，该函数接受当前路由地址location做为参数，当返回true时，对应的微前端会被激活

参考：https://single-spa.js.org/docs/configuration

- 当应用首次被激活时，single-spa通过loadingFn获取相关JS代码并进行初始化
- 当一个已经激活的应用被注销时，single-spa调用该应用程序的unmount函数，令其销毁自己
- 还有一种情况，同一时间可以不止一个应用程序被激活，比如全局导航，它可能是一个最初就被加载的特殊微前端，在所有路由中都处于激活状态，这个概念被称为portals

### 三种架构
team-inspire使用了Svelte, team-decide使用了React, team-checkout使用了Vue.

single-spa对各个框架都有适配，team-inspire/pages.js, 通过'sing-spa-svelte', 导出了三个生命周期函数。

每个工程都通过rollup打包为了pages.min.js文件， single-spa运行时只会加载该文件


### demo工程运行
```
npm run single_spa
```

<br>

##  一些概念
### 微前端
A microfrontend is a microservice that exists within a browser.

Microfrontends are sections of your UI, often consisting of dozens of components, that use frameworks like React, Vue, and Angular to render their components. Each microfrontend can be managed by a different team and may be implemented using its own framework. It is practical and suggested to use just one framework for all your microfrontends, although you may add additional frameworks when migrating or when experimenting.

Each microfrontend has its own git repository, its own package.json file, and its own build tool configuration. As a result, each microfrontend has an independent build process and an independent deploy / CI. This generally means that each repo has fast build times.

single-spa的几种微前端类型：

<table>
<thead><tr><th>Topic</th><th>Application</th><th>Parcel</th><th>Utility</th></tr></thead>
<tbody>
    <tr><td>Routing</td><td>has multiple routes</td><td>has no routes</td><td>has no routes</td></tr>
    <tr><td>API</td><td>declarative API</td><td>imperative API</td><td>exports a public interface</td></tr>
    <tr><td>Renders UI</td><td>renders UI</td><td>renders UI</td><td>may or may not render UI</td></tr>
    <tr><td>Lifecycles</td><td>single-spa managed lifecycles</td><td>custom managed lifecycles</td><td>external module: no direct single-spa lifecycles</td></tr>
    <tr><td>When to use</td><td>core building block</td><td>only needed with multiple frameworks</td><td>useful to share common logic, or create a service</td></tr>
</tbody>
</table>

Application: Applications use a declarative API called registerApplication. Your single-spa config defines applications ahead of time and defines the conditions for when each application is active, but it doesn't mount the applications directly.

Parcel: Parcels exist in many ways as an escape hatch from the normal declarative flow. They exist primarily to allow you to reuse pieces of UI across applications when those applications are written in multiple frameworks. example: application1 is written in Vue and contains all the UI and logic to create a user. application2 is written in React and needs to create a user. Using a single-spa parcel allows you to wrap your application1 Vue component in a way that will make it work inside application2 despite the different frameworks. Think of parcels as a single-spa specific implementation of webcomponents. 只有在涉及到跨框架的应用之间进行组件调用时，我们才需要考虑parcel的使用。

Utility： A utility is an in-browser module that (generally) has it's own repository and CI process. It exports a public interface of functions and variables that any other microfrontend can import and use. A utility microfrontend is just like any other microfrontend, except it doesn't serve as a single-spa application or parcel.

Each single-spa microfrontend is an in-browser JavaScript module.
An in-browser JavaScript module is when imports and exports are not compiled away by your build tool, but instead are resolved within the browser. This is different from build-time modules, which are supplied by your node_modules and compiled away before they touch the browser.

<br>

## 总结
### single-spa 只做两件事
- 提供生命周期概念，并负责调度子应用的生命周期
- 挟持 url 变化事件和函数，url 变化时匹配对应子应用，并执行生命周期流程。

### 三大分类： 
- Application：子应用，和 url 强相关，交由 single-spa 调用生命周期 
- Parcel：组件，和 url 无关，手动调用生命周期 
- Utility Module：统一将公共资源导出的模块

### “重要”概念：
- Root Config：指主应用的 index.html + main.js。
- HTML 负责声明资源路径，JS 负责注册子应用和启动主应用
- Application：要暴露 bootstrap, mount, umount 三个生命周期，一般在 mount 开始渲染子 SPA 应用 * 
- Parcel：也要暴露 bootstrap, mount, unmount 三个生命周期，可以再暴露 update 生命周期。
parcel 可大到一个 Application，也可以小到一个功能组件。与 Application 不同的是 Parcel 需要开发都手动调用生命周期。

### single-spa-react, single-spa-vue...
是给子应用快速生成 bootstrap, mount, unmount 的生命周期函数的工具库。

### single-spa-css
隔离前后两个子应用的 CSS 样式。
在子应用 mount 时添加子应用的 CSS，在 unmount 时删除子应用的 CSS。

如果要在多个子应用进行样式隔离，可以有两种方法：
- Shadow DOM，样式隔离比较好的方法，但是穿透比较麻烦
- Scoped CSS，在子应用的 CSS 选择器上添加前缀做区分，可以使用 postcss-prefix-selector 这个包来快速添加前缀。
  
### single-spa-leaked-globals
在子应用 mount 时给 window 对象恢复/添加一些全局变量，如 jQuery 的 $ 或者 lodash 的 _，在 unmount 时把 window 对象的变量删掉。

实现了“如果主应用一个url只有一个页面”情况下的 JS 沙箱。

### single-spa-layout
和 Vue Router 差不多，主要功能是可以在 index.html 指定在哪里渲染哪个子应用。

## 参考：
- https://single-spa.js.org/docs/microfrontends-concept
- https://single-spa.js.org/docs/module-types
- https://zhuanlan.zhihu.com/p/378346507
- https://www.jianshu.com/p/23f37053c1d9