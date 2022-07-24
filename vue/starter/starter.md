# Starter
渲染器(Starter)是围绕虚拟 Dom 存在的。
在浏览器中，我们把虚拟 Dom 渲染成真实的 Dom 对象，Vue 源码内部把一个框架里所有和平台相关的操作，抽离成了独立的方法。
所以，我们只需要实现下面这些方法，就可以实现 Vue 3 在某一个平台的渲染:

- 首先用 createElement 创建标签，还有用 createText 创建文本。
- 创建之后就需要用 insert 新增元素，通过 remove 删除元素，通过 setText 更新文本和 patchProps 修改属性。
- 然后再实现 parentNode、nextSibling 等方法实现节点的查找关系。

完成这些工作，理论上就可以在一个平台内实现一个应用了。

在 Vue 3 中的 runtime-core 模块，就对外暴露了这些接口，
runtime-core 内部基于这些函数实现了整个 Vue 内部的所有操作，然后在 runtime-dom 中传入以上所有方法。


## 核心逻辑
下面是 Vue 代码提供浏览器端操作的函数，这些 DOM 编程接口完成了浏览器端增加、添加和删除操作，
这些 API 都是浏览器端独有的，如果一个框架强依赖于这些函数，那就只能在浏览器端运行。

```
export const nodeOps: Omit<RendererOptions<Node, Element>, 'patchProp'> = {
  //插入元素
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null)
  },
  // 删除元素
  remove: child => {
    const parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },
  // 创建元素
  createElement: (tag, isSVG, is, props): Element => {
    const el = isSVG
      ? doc.createElementNS(svgNS, tag)
      : doc.createElement(tag, is ? { is } : undefined)

    if (tag === 'select' && props && props.multiple != null) {
      ;(el as HTMLSelectElement).setAttribute('multiple', props.multiple)
    }

    return el
  }
  //...其他操作函数
}
```

如果一个框架想要实现实现跨端的功能，那么渲染器本身不能依赖任何平台下特有的接口。
在下面的代码中，通过 createRenderer 函数创建了一个渲染器。

通过参数 options 获取增删改查所有的函数以后，在内部的 render、mount、patch 等函数中，需要去渲染一个元素的时候，
就可以通过 option.createElement 和 option.insert 来实现。

```
export default function createRenderer(options) {
  const {
      insert: hostInsert,
      remove: hostRemove,
      patchProp: hostPatchProp,
      createElement: hostCreateElement,
      createText: hostCreateText,
      createComment: hostCreateComment,
      setText: hostSetText,
      setElementText: hostSetElementText,
      parentNode: hostParentNode,
      nextSibling: hostNextSibling,
      setScopeId: hostSetScopeId = NOOP,
      cloneNode: hostCloneNode,
      insertStaticContent: hostInsertStaticContent
   } = options

  function render(vnode, container) {  }

  function mount(vnode, container, isSVG, refNode) {  }

  function mountElement(vnode, container, isSVG, refNode) {  }

  function mountText(vnode, container) {  }

  function patch(prevVNode, nextVNode, container) {  }

  function replaceVNode(prevVNode, nextVNode, container) {  }
  function patchElement(prevVNode, nextVNode, container) {  }
  function patchChildren(
    prevChildFlags,
    nextChildFlags,
    prevChildren,
    nextChildren,
    container
  ) {  }

  function patchText(prevVNode, nextVNode) {  }
  function patchComponent(prevVNode, nextVNode, container) {  }

  return { render }
}
```
Vue3源码可参考：https://github.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts


## 创建自定义渲染器
经过上面的分析，我们可以使用如下代码创建一个<em>具体平台的渲染器</em>，这也是 Vue 3 中的 runtime-dom 包主要做的事。
了解了 Vue 中自定义渲染器的实现方式后，我们还可以基于 Vue 3 的 runtime-core 包封装其他平台的渲染器，
让其他平台也能使用 Vue 内部的响应式和组件化等优秀的特性。其实就是调用createRenderer,再实现里面的方法：

```
const { render } = createRenderer({
  nodeOps: {
    createElement() {   },
    createText() {   }
    // more...
  },
  patchData
})
```
自定义渲染器让 Vue 脱离了浏览器的限制，我们只需要实现平台内部的增删改查函数后，就可以直接对接 Vue 3。
比方说，我们可以把 Vue 渲染到小程序平台，实现 Vue 3-minipp；
也可以渲染到 Canvas，实现 vue 3-canvas，把虚拟 dom 渲染成 Canvas；
甚至还可以尝试把 Vue 3 渲染到 threee.js 中，在 3D 世界使用响应式开发。
我们还可以在 Canvas 的封装上更进一步，并且实现对一些 Canvas 已有框架 Pixi.js 的封装，这样就可以通过 Vue 3 的响应式的开发方式，快速开发一个小游戏。

自定义渲染器的原理，就是把所有的增删改查操作暴露出去，使用的时候不需要知道内部的实现细节，
我们只需要针对每个平台使用不同的 API 即可。

### 实例：canvas stater



## 其它渲染器
社区也也有越来越多开源的 Vue 3 的自定义渲染器，比如：
- 小程序跨端框架 uni-app
- Vugel 可以使用 Vue 渲染 Webgl 等。
