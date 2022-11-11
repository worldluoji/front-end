# Vue如何将JSON配置文件转化为网页的一种思路
- 简单的说：借助vue的createElement方法，将json 逐一解析成对应的组件，渲染即可。
- 使用slider插件实现上下或者左右翻页

## Vue的createElement方法
```
// 以下代码来自：https://cn.vuejs.org/v2/guide/render-function.html#createElement-参数

// @returns {VNode}
createElement(
  // {String | Object | Function}
  // An HTML tag name, component options, or async
  // function resolving to one of these. Required.
  'div',

  // {Object}
  // A data object corresponding to the attributes
  // you would use in a template. Optional.
  {
    // (see details in the next section below)
  },

  // {String | Array}
  // Children VNodes, built using `createElement()`,
  // or using strings to get 'text VNodes'. Optional.
  [
    'Some text comes first.',
    createElement('h1', 'A headline'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

## demo抽象
### 抽象步骤1
1. 移除注释
2. 把 createElement(tagName || componentOptions, {data}, children) 对应到上面的代码中，把 children 部分单独抽象成一个数组
```
// a component options demo:
const MyComponent = {
  props:['someProp'],
  render(h) { 
    return h('span', this.someProp)
  },
}

new Vue({
  el: '#app',
  // 这里的 render(createElement) 我们更常见的写法是：render(h) 
  // 关于这部分的解释，可以参见: https://segmentfault.com/q/1010000007130348?_ea=17466196
  render(createElement) {
    const pageJSON = [
      'Some text comes first.',
      createElement('h1', 'A headline'),
      createElement(MyComponent /** component options */, {
        props: {
          someProp: 'foobar'
        }
      })
    ]
    return h('div', {}, pageJSON)
  }
})
```

### 抽象步骤2
将配置参数单独抽象出来, 为一个JSON串。
```
// 
const PageJSON = [
  {component: 'span', text: 'Some text comes first.'},
  {component: 'h1', text: 'A headline'},
  {component: 'MyComponent', data: {props: {someProp: 'foobar'}} }
]
new Vue({
  el: '#app',
  render(h) {
    return h('div', {}, pageJSON.map(ele => {
      return h(ele.component, ele.text ? ele.text : ele.data)
    }))
  }
})

```

### 抽象步骤3
```
const WorkJSON = {
	title: '我是作品标题',
    description: '我是作品描述',
    created_time: '2019-09-01',
    updated_time: '2019-09-01',
    pages: [
      	elements: [
          {component: 'span', text: 'Some text comes first.'},
          {component: 'h1', text: 'A headline'},
          {component: 'MyComponent', data: {props: {someProp: 'foobar'}} }
        ],
    ],
}
new Vue({
  el: '#app',
  render(h) {
    return h('div', {}, WorkJSON.pages[0].elements.map(ele => {
      return h(ele.component, ele.text ? ele.text : ele.data)
    }))
  }
})
```

总结一下，就是把组件的各个参数抽象出来，使用render函数进行渲染。
JSON 里面包含了很多页面，每个页面里面包含了很多元素（多个组件）
最终这个JSON 会传给 render(h) 进行解析渲染。

## 参考资料
- https://github.com/ly525/luban-h5/blob/dev/front-end/h5/src/components/core/models/element.js
- https://github.com/ly525/luban-h5/blob/dev/front-end/h5/src/components/core/models/page.js
- https://www.yuque.com/luban-h5/docs/ug7xg5