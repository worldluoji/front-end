# components设计

在编辑器中，我们的物料组件大体上可以分为如下几种：
- 基础物料：低代码平台提供的基础组件库，如容器、布局（分栏，栅格）等通用类型的相关组件。甚至于按钮、弹窗等组件它都是基础组件；
- 业务物料：针对于某些特定场景业务的组件，比如说商城的规格选择组件、营销活动组件等等都属于是业务集成化的组件库；
- 定制化物料：如果接入团队又或者是贡献者团队，可以根据 CLI 来创建组件插口，发布后即可通过异步资源加载的方式对接到低代码编辑器的插座口上去，实现远程物料的载入。


编辑器在展示组件列表时，需要组件提供以下几个信息：
- 分类：当前所处的分类，用于后续组件分组和归类使用（非必填）；
- 名称：物料在编辑器列表中显示的名称信息；
- 图标：物料在编辑器列表中显示的图标信息；
- 属性面板：通常在选中某个物料组件的时候，都会展示当前能够设置参数值的一个属性面板，它能够方便操作者可视化的为物料来设置当前的属性参数。


基于这些信息，我们基本上确定了一个物料需要的参数，下面的话我们就来定义一下MaterialType这个接口类型：
```
/**
 * 素材组件的类型
 */
export interface MaterialComponentType {
  /** 
   * @name 组件名称
   * @description 一个组件必须声明一个名称。
   */
  displayName: string;

  /** 
   * @name 组件icon
   * @description 组件的图标，如果不存在会以NodeType首字母做示例
   */
  icon?: string;

  /**
   * @name 分类
   * @description 组件可以包含一个分类，默认为基础组件。
   */
  category?: MaterialCategory;

  /**
   * @name 默认的props
   * @description 默认props，会在初始化时设置进内容面板
   */
  props?: RenderNodeType['props'];
  
  /**
   * @name 额外附加属性
   */
  related: Record<string, any>;

  /**
   * @name 其他
   * @description 留坑，方便后续其他属性的添加。
   */
  [K : string]: any
}
```

当组件完成后，自然而然的会在 main.ts 中导出当前的物料组件。

设计时，需要考虑一件事情，那就是: <strong>在构建时区分产物，针对不同环境下提供不同的资源</strong>。
比如，在编辑器环境下，由于需要做属性设置的动作，往往物料组件上会挂载相对应的一些设置器，而在真实浏览的时候并不需要关注这方面的动作。
因此设置器存放在组件上其实是占用了包大小的，因此在构建上需要做一些调整。

物料组件目录如下：
```
- button
  - index.ts|tsx
	- view.ts|tsx
	- controller.ts|tsx
  - README.md
	- styles.ts|css
```
在 index.ts 中，需要导出一份整合版的物料组件，将之前提到过的一些物料组件描述挂载到组件当中去：
```
import { View } from './view'
import { Controller } from './controller'

export const Button = View

Button._config = {
  displayName: '基础按钮',
  category: 'base',
  icon: '<your icon addr>',
  props: {
    type: 'primary',
  },
  related: {
    settings: <Controller/>
  }
  ...多余属性继续添加，
}
```
在构建时，则会在 script 中分别创建 build:views 和 build:materials 两个构建命令, 
build:views只构建组件，不包括组件面板等；build:materials则是完整的构建。

在设计器中使用全量物料，在真实出码和运行时环境中使用最小渲染单元的组件即可。


在开发物料中，并不建议将所有物料的 Schema 协议都固定，这样的约束性太强。
页面级别的 Schema 协议是可以统一的，但我们建议每个物料模块的 Schema 协议都应该做到独立且内聚，

我们的物料设计是将配置项目独立打包成一个配置模块提供给设计器使用，这样的优势在于: 开发物料的过程中不会有非常高的技术债务且可以快速与已有的组件库进行集成，给开发物料的同学增加最大的灵活度。

<br>

## 物料管理
相比于编辑器，物料的管理其实也是一个相对独立的工程。针对不同的场景可以有以下几种解决方案：
- 单独维护自己业务线的物料，通过 NPM 的形式进行迭代，发布时更新。业务组清晰的熟悉自身需要提供出去的物料能力，因此单独维护是较为稳妥的实现方式。
缺点方面则是复用性差，无法做推广兼容;
- 物料中心：将物料托管至物料平台中管理，借助 CI/CD 的能力可以稳定高效的迭代物料，提供出 NPM 包与 CDN 资源，
方便开发者本地依赖接入或者是异步资源加载的形式接入到编辑器内。