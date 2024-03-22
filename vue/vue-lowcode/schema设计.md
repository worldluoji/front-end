# schema设计
应该包括协议版本(version)、依赖管理(library)、国际化(i18n)、状态管理(store)、数据源(dataSource)、生命周期(lifeCycles)、页面结构(htmlBody)等几部分


## 1. 协议版本(version)
代表着当前协议的版本，用于后续协议 break change 带来的兼容问题，可以通过版本来区分渲染器和解析器。而版本的升降级也是有规范可循的，如社区中比较常见的像semver，大体上的规则如下：
- major: 如果包含 Break Change(破坏更新)的内容;
- minor: 当你产出了一个新的功能的时候（无破坏更新）;
- patch: 当你修复了一个 BUG 问题的时候（无破坏更新）。

## 2. 依赖管理(library)
代表当前协议在编辑器中依赖的一些类库和包，为后续异步加载资源和动态引入留坑位。
在内部声明出依赖的名称、加载的资源地址(如组件库会导出 index.js 和 index.css 多个资源)，类库的声明名称等等。
那么可以分析得出如下依赖的大体结构
```
const librarys: SchemaModelConfig['librarys'] = [
  {
    name: 'dayjs',
    urls: [
      'https://unpkg.com/dayjs@1.11.7/dayjs.min.js'
    ],
    globalVar: 'dayjs'
  },
  {
    name: 'arco',
    urls: [
      'https://unpkg.com/@arco-design/web-react@2.46.3/dist/arco.min.js',
      'https://unpkg.com/@arco-design/web-react@latest/dist/arco-icon.min.js',
      'https://unpkg.com/@arco-design/web-react@2.46.3/dist/css/arco.css',
    ],
    globalVar: 'Arco'
  }
]
```

## 3. 国际化(i18n)
用于维护国际化项目时需要进行多语种的文案切换带来的业务诉求。参考业内成熟 i18n 的方案，多语种的协议字段就相对而言比较简单：
```
const i18n: SchemaModelConfig['i18n'] = {
  zh: {},
  eu: {},
  ...后续补充需要支持的多语种
},
```

## 4. 状态管理(store)
维护一份页面上的状态。方便后续做绑定通信和事件广播的实现，用于赋予整个页面的<strong>组件联动交互</strong>，最常见的就是点击相关按钮唤起相关弹窗类型组件。

当低代码产物为工程类型时，那么就会涉及到跨模块、跨页面这种全局状态管理，当然随之而来的是这块的配置会更加复杂，包括 Schema 的设计与配置的形式。


## 5. 数据源(dataSource)
数据源与远端挂钩，可以是远程的 JSON 文件，也可以是一个 fetch 请求，主要的目的是为了<strong>帮助页面组件支持动态渲染数据的能力</strong>。

一个请求包含以下几个重要的内容，请求资源 URI、Request、Header、Response => params | query | body ，所以在定义数据源的时候，我们将其抽象成如下结构：
```
const i18n: SchemaModelConfig['dataSource'] = [
  {
    key: 'string|uuid',
    name: 'getUserList',
    request: {
      url: 'https://localhost:3000/user/list',
      params: {
        pageSize: 10,
        current: 1,
      },
      method: 'GET',
      body: {},
      header: {}
      ...AxiosInstanceConfig
    }
  }
]

// 最终会抽象成一个函数调用来动态的执行。
lowcodeSandBox?.loadDataSource('getUserList', ...其他参数): Promise<any>
```

## 6. 生命周期(lifeCycles)
一个项目的使用中有初始化、使用中、销毁等多个不同的生命周期，每个状态需要做的事情也不同，
比如在程序初始化时会加载或者配置后续使用中需要的数据、资源等，同理对于低代码平台应用而言，搭建页面时与传统项目一样，同样需要自定义一套生命周期来帮助更好管理产物的拉取、Dom 渲染、数据更新等操作。


## 7. 页面结构(htmlBody)
与 虚拟 DOM 相似，本质上是对于当前页面渲染的抽象结构，便于跨平台之间的转换，为后续运行时渲染和动态出码垫定基础，提供后续结构化转换的能力。
```
{
  "ROOT": {
    "type": {
      "resolvedName": "Container"
    },
    "props": {
      "width": 800,
      "height": "100%",
      "paddingTop": 20,
      "paddingBottom": 20,
      "paddingLeft": 20,
      "paddingRight": 20,
      "background": "#FFFFFF"
    },
    "displayName": "基础容器",
    "custom": {},
    "hidden": false,
    "nodes": [
      "rpVYvatknx"
    ],
    "linkedNodes": {}
  },
  "rpVYvatknx": {
    "type": {
      "resolvedName": "Text"
    },
    "props": {},
    "displayName": "文本",
    "custom": {},
    "parent": "ROOT",
    "hidden": false,
    "nodes": [],
    "linkedNodes": {}
  }
}
```
在有了明确的定义结构后，我们就可以写出一个简单的Schema的数据结构:
```
const schema = JSON.stringify({
  version: 1.0.0,
  librarys: [],
  i18n: {
    zh: {},
    eu: {},
  },
  store: {},
  dataSource: {},
  lifeCycles: {},
  htmlBody: {
  "ROOT": {
    "type": {
      "resolvedName": "Container"
    },
    "props": {
      "width": 800,
      "height": "100%",
      "paddingTop": 20,
      "paddingBottom": 20,
      "paddingLeft": 20,
      "paddingRight": 20,
      "background": "#FFFFFF"
    },
    "displayName": "基础容器",
    "custom": {},
    "hidden": false,
    "nodes": [
      "rpVYvatknx"
    ],
    "linkedNodes": {}
  },
  "rpVYvatknx": {
    "type": {
      "resolvedName": "Text"
    },
    "props": {},
    "displayName": "文本",
    "custom": {},
    "parent": "ROOT",
    "hidden": false,
    "nodes": [],
    "linkedNodes": {}
  }
}
})
```