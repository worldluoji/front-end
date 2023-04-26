# microfrontend

## 定义
A microfrontend is a microservice that exists within a browser.

Microfrontends are sections of your UI, often consisting of dozens of components, that use frameworks like React, Vue, and Angular to render their components. Each microfrontend can be managed by a different team and may be implemented using its own framework. It is practical and suggested to use just one framework for all your microfrontends, although you may add additional frameworks when migrating or when experimenting.

Each microfrontend has its own git repository, its own package.json file, and its own build tool configuration. As a result, each microfrontend has an independent build process and an independent deploy / CI. This generally means that each repo has fast build times.

微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。

## 特点
微前端架构具备以下几个核心价值：

1. 技术栈无关
主框架不限制接入应用的技术栈，微应用具备完全自主权

2. 独立开发、独立部署
微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新

3. 增量升级
在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略

4. 独立运行时
每个微应用之间状态隔离，运行时状态不共享

技术栈无关是微前端的初衷。


## 参考资料
- https://qiankun.umijs.org/zh/guide
- https://martinfowler.com/articles/micro-frontends.html