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


## 应用场景
满足以下几点，你可能就不需要微前端

基于以上两个观点，我们可以概括出，存在以下场景时，你可能就不需要微前端：

1. 你/你的团队 具备系统内所有架构组件的话语权
简单来说就是，系统里的所有组件都是由一个小的团队开发的。
2. 你/你的团队 有足够动力去治理、改造这个系统中的所有组件
直接改造存量系统的收益大于新老系统混杂带来的问题。
3. 系统及组织架构上，各部件之间本身就是强耦合、自洽、不可分离的
系统本身就是一个最小单元的「架构量子」，拆分的成本高于治理的成本。
4. 极高的产品体验要求，对任何产品交互上的不一致零容忍
不允许交互上不一致的情况出现，这基本上从产品上否决了渐进式升级的技术策略

满足以下几点，你才确实可能需要微前端：

1. 系统本身是需要集成和被集成的 一般有两种情况： 
  a. 旧的系统不能下，新的需求还在来。
没有一家商业公司会同意工程师以单纯的技术升级的理由，直接下线一个有着一定用户的存量系统的。而你大概又不能简单通过 iframe 这种「靠谱的」手段完成新功能的接入，因为产品说需要「弹个框弹到中间」

  b. 你的系统需要有一套支持动态插拔的机制。
这个机制可以是一套精心设计的插件体系，但一旦出现接入应用或被接入应用年代够久远、改造成本过高的场景，可能后面还是会过渡到各种微前端的玩法。

2. 系统中的部件具备足够清晰的服务边界
通过微前端手段划分服务边界，将复杂度隔离在不同的系统单元中，从而避免因熵增速度不一致带来的代码腐化的传染，以及研发节奏差异带来的工程协同上的问题。 

还是那个老生常谈的理念，没有银弹，架构本身就是各种 trade–off。

## reference
- https://martinfowler.com/articles/micro-frontends.html
- https://micro-frontends.org/
- https://qiankun.umijs.org/zh/guide
- https://www.yuque.com/kuitos/gky7yw/fy3qri