# single-spa
single-spa is a framework for bringing together multiple JavaScript microfrontends in a frontend application.

single-spa 是一个将多个单页面应用聚合为一个整体应用的 JavaScript 微前端框架。 使用 single-spa 进行前端架构设计可以带来很多好处，例如:
- 在同一页面上使用多个前端框架 而不用刷新页面 (React, Vue, Angular)
- 独立部署每一个单页面应用
- 新功能使用新框架，旧的单页应用不用重写可以共存
- 改善初始加载时间，延迟加载代码

可以把single-spa看作一个应用容器，负责不同应用间的重定向。

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
    "inspire",
    () => import("http://localhost:3002/pages.min.js"),
    ({ pathname }) => pathname === "/"
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

参考：
- https://single-spa.js.org/docs/microfrontends-concept
- https://single-spa.js.org/docs/module-types