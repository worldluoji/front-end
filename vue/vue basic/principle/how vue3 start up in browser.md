# vue3如何在浏览器中跑起来的

<img src="./vue%20full%20screen.jpeg" />

前端框架需要处理的最核心的两个流程，就是首次渲染和数据更新后的渲染。

## 首次渲染
createApp 就是项目的初始化渲染入口。
ensureRenderer 返回的对象去创建 app，并且重写了 app.mount 方法；
在 mount 方法内部，查找 mount 传递的 DOM 元素，并且调用 ensureRenderer 返回的 mount 方法，进行初始化渲染:

https://github.com/vuejs/vue-next/blob/master/packages/runtime-dom/src/index.ts#L66

tips: 查看源码的时候，可以先把一些无用的信息删除，方便自己梳理主体的逻辑。看 Vue 代码，和今天主题无关的无用信息有哪些，__COMPAT__ 代码是用来兼容 Vue 2 的，__DEV__ 代码是用来调试的，我们可以把这些代码删除之后，得到下面的简化版 createApp 源码。

简化后的代码：
```
export const createApp = ((...args) => {
  const app = ensureRenderer().createApp(...args)
  const { mount } = app
  // 重写mount
  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
    const container = normalizeContainer(containerOrSelector)
    if (!container) return

    const component = app._component
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML
    }
    container.innerHTML = ''
    const proxy = mount(container, false, container instanceof SVGElement)
    if (container instanceof Element) {
      container.removeAttribute('v-cloak')
      container.setAttribute('data-v-app', '')
    }
    return proxy
  }
  return app
}) 
function normalizeContainer(container){
  if (isString(container)) {
    const res = document.querySelector(container)
  }
  return container
}
```
这里 ensureRenderer 函数，内部通过 createRenderer 函数，创建了一个浏览器的渲染器，并且缓存了渲染器 renderer，这种使用闭包做缓存的方式，你在日常开发中也可以借鉴这种思路。
```
// 浏览器dom操作
import { nodeOps } from './nodeOps'
// 浏览器dom属性更新
import { patchProp } from './patchProp'
import { createRenderer } from '@vue/runtime-core'
const rendererOptions = extend({ patchProp }, nodeOps)

let renderer: Renderer<Element | ShadowRoot> | HydrationRenderer

function ensureRenderer() {
  return (
    renderer ||
    (renderer = createRenderer<Node, Element | ShadowRoot>(rendererOptions))
  )
}  
```
createRenderer 函数传递的参数是 nodeOps 和 patchProp 的合并对象。
通过 ensureRenderer 存储这些操作方法后，createApp 内部就可以脱离具体的渲染平台了，这也是 Vue 3 实现跨端的核心逻辑：
```
export const nodeOps: Omit<RendererOptions<Node, Element>, 'patchProp'> = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null)
  },
  remove: child => {
    const parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },
  createElement: (tag, isSVG, is, props): Element => {
    const el = isSVG
      ? doc.createElementNS(svgNS, tag)
      : doc.createElement(tag, is ? { is } : undefined)

    if (tag === 'select' && props && props.multiple != null) {
      ;(el as HTMLSelectElement).setAttribute('multiple', props.multiple)
    }
    return el
  },

  createText: text => doc.createTextNode(text),

  createComment: text => doc.createComment(text),

  setText: (node, text) => {
    node.nodeValue = text
  },

  setElementText: (el, text) => {
    el.textContent = text
  },
  parentNode: node => node.parentNode as Element | null,
  nextSibling: node => node.nextSibling,
  querySelector: selector => doc.querySelector(selector),
... 
}
```
https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/renderer.ts#L290

createRenderer 是调用 baseCreateRenderer 创建的，baseCreateRenderer 函数内部有十几个函数，代码行数合计 2000 行左右，
也是 Vue 源码最复杂的一个函数。

平台上所有的 insert、remove 函数，这些函数都是 nodeOps 传递进来的，然后定义了一些列 patch、mount、unmount 函数，通过名字我们不难猜出，
这就是 Vue 中更新、渲染组件的工具函数，比如 mountElement 就是渲染 DOM 元素、mountComponent 就是渲染组件 updateComponent 就是更新组件。
```
export function createRenderer<
  HostNode = RendererNode,
  HostElement = RendererElement
>(options: RendererOptions<HostNode, HostElement>) {
  return baseCreateRenderer<HostNode, HostElement>(options)
}

function baseCreateRenderer(){
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
  const patch = ()=>... //一个函数
  const processText = ()=>...
  const processCommentNode = ()=>...
  const processElement = ()=>...
  const mountElement = ()=>...
  const mountChildren = ()=>...
  const patchElement = ()=>...
  const patchBlockChildren = ()=>...
  const patchProps = ()=>...
  const processComponent = ()=>...
  const mountComponent = ()=>...
  const updateComponent = ()=>...
  const setupRenderEffect = ()=>...
  const patchChildren = ()=>...
  const patchKeyedChildren = ()=>...
  const unmount = ()=>...
  const unmountComponent = ()=>...
  const unmountComponent = ()=>...
  const unmountComponent = ()=>...
  const unmountComponent = ()=>...
  const render: RootRenderFunction = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true)
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG)
    }
    flushPostFlushCbs()
    container._vnode = vnode
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  }
}
```

调用 createApp 方法
```
const app = ensureRenderer().createApp(...args)
```
实际上是 createAPI 的返回值，并且给 createAPI 传递了 render 方法。
```
export function createAppAPI<HostElement>(
  render: RootRenderFunction,
  hydrate?: RootHydrateFunction
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent, rootProps = null) {
    const context = createAppContext()
    let isMounted = false

    const app: App = (context.app = {
      _context: context,
      _instance: null,
      use(plugin: Plugin, ...options: any[]) ,
      component(name: string, component?: Component): any {
        if (!component) {
          return context.components[name]
        }
        context.components[name] = component
        return app
      },
      directive(name: string, directive?: Directive)
      mount(
        rootContainer: HostElement,
        isHydrate?: boolean,
        isSVG?: boolean
      ): any {
        if (!isMounted) {
          const vnode = createVNode(
            rootComponent as ConcreteComponent,
            rootProps
          )
          vnode.appContext = context
          // 核心的逻辑
          if (isHydrate && hydrate) {
            hydrate(vnode as VNode<Node, Element>, rootContainer as any)
          } else {
            render(vnode, rootContainer, isSVG)
          }
          return getExposeProxy(vnode.component!) || vnode.component!.proxy
        } 
      },

      provide(key, value) {
        context.provides[key as string] = value
        return app
      }
    })

    return app
  }
}
```
内部创建了一个 app 对象，app 上注册了我们熟悉的 use、component 和 mount 等方法。

mount 内部执行的是传递进来的 render 方法，也就是上面的 render 方法。
container 就是我们 app.mount 中传递的 DOM 元素，对 DOM 元素进行处理之后，执行 patch 函数实现整个应用的加载。

render -> patch(container._vnode || null, vnode, container, null, null, null, isSVG)

patch 传递的是 container._vnode，也就是上一次渲染缓存的 vnode、本次渲染组件的 vnode，以及容器 container。
```
  const patch: PatchFn = (
    n1,
    n2,
    container,
    anchor = null,
    parentComponent = null,
    parentSuspense = null,
    isSVG = false,
    slotScopeIds = null,
    optimized = __DEV__ && isHmrUpdating ? false : !!n2.dynamicChildren
  ) => {
    // 两次虚拟dom完全一样 啥也不用干
    if (n1 === n2) {
      return
    }
    // 虚拟dom节点类型不一样， unmount老的虚拟dom，并且n1赋值null
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1)
      unmount(n1, parentComponent, parentSuspense, true)
      n1 = null
    }
    // n2是要渲染的虚拟dom，我们获取type，ref和shapeFlag
    const { type, ref, shapeFlag } = n2
    switch (type) {
      case Text:
        // 文本
        processText(n1, n2, container, anchor)
        break
      case Comment:
        // 注释
        processCommentNode(n1, n2, container, anchor)
        break
      case Static:
        // 静态节点
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG)
        } else if (__DEV__) {
          patchStaticNode(n1, n2, container, isSVG)
        }
        break
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
        break
      default:
        // 运运算判断操作类型
        if (shapeFlag & ShapeFlags.ELEMENT) {
          // html标签
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          )
        } else if (shapeFlag & ShapeFlags.COMPONENT) {
          // 组件
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          )
        } else if (shapeFlag & ShapeFlags.TELEPORT) {
          ;(type as typeof TeleportImpl).process(
            n1 as TeleportVNode,
            n2 as TeleportVNode,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          )
        } else if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
          ;(type as typeof SuspenseImpl).process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          )
        } else if (__DEV__) {
          warn('Invalid VNode type:', type, `(${typeof type})`)
        }
    }

    // set ref
    if (ref != null && parentComponent) {
      setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2)
    }
  }
```
其中 n1 是上次渲染的虚拟 DOM，n2 是下次要渲染的虚拟 DOM。

首先可以把 n1 和 n2 做一次判断，如果虚拟 DOM 的节点类型不同，就直接 unmount 之前的节点。
因为比如之前是 Button 组件，现在要渲染 Container 组件，就没有计算 diff 的必要，直接把 Button 组件销毁再渲染 Container 即可。

如果 n1 和 n2 类型相同，比如都是 Button 组件或者都是 div 标签，我们需要判断具体的类型再去执行不同的函数，
比如 processText、processFragment、processElement 以及 processComponent 等函数。

ShapeFlags 可以帮助我们快速判断需要操作的类型，利用了位运算。

<br>

## processComponent 方法
首次渲染的 App 是一个组件，所以要执行的就是 processComponent 方法。
```
  const processComponent = (
    n1: VNode | null,
    n2: VNode,
    container: RendererElement,
    anchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {
    n2.slotScopeIds = slotScopeIds
    if (n1 == null) {
      if (n2.shapeFlag & ShapeFlags.COMPONENT_KEPT_ALIVE) {
        ;(parentComponent!.ctx as KeepAliveContext).activate(
          n2,
          container,
          anchor,
          isSVG,
          optimized
        )
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        )
      }
    } else {
      updateComponent(n1, n2, optimized)
    }
  }
```
首次渲染的时候，n1 就是 null，所以会执行 mountComponent；如果是更新组件的时候，n1 就是上次渲染的 vdom，需要执行 updateComponent。

mountComponent 函数内部会对组件的类型进行一系列的判断，还有一些对 Vue 2 的兼容代码，
核心的渲染逻辑就是 setupComponent 函数和 setupRenderEffect 函数。
```
  import {setupComponent} from './component'
  const mountComponent: MountComponentFn = (
  ) => {
    // 2.x compat may pre-creaate the component instance before actually
    // mounting
    const compatMountInstance =
      __COMPAT__ && initialVNode.isCompatRoot && initialVNode.component
    const instance: ComponentInternalInstance =
      compatMountInstance ||
      (initialVNode.component = createComponentInstance(
        initialVNode,
        parentComponent,
        parentSuspense
      ))

    // resolve props and slots for setup context
    if (!(__COMPAT__ && compatMountInstance)) {

      setupComponent(instance)

    }
     (
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    )

    if (__DEV__) {
      popWarningContext()
      endMeasure(instance, `mount`)
    }
  }
```
setupComponent，要完成的就是执行我们写的 setup 函数。
可以看到，内部先初始化了 props 和 slots，并且执行 setupStatefulComponent 创建组件，而这个函数内部从 component 中获取 setup 属性，
也就是 script setup 内部实现的函数，就进入到我们组件内部的 reactive、ref 等函数实现的逻辑了。
```
export function setupComponent(
  instance: ComponentInternalInstance,
  isSSR = false
) {
  isInSSRComponentSetup = isSSR

  const { props, children } = instance.vnode
  const isStateful = isStatefulComponent(instance)
  initProps(instance, props, isStateful, isSSR)
  initSlots(instance, children)

  const setupResult = isStateful
    ? setupStatefulComponent(instance, isSSR)
    : undefined
  isInSSRComponentSetup = false
  return setupResult
}

function setupStatefulComponent(
  instance: ComponentInternalInstance,
  isSSR: boolean
) {
  const Component = instance.type as ComponentOptions
  // 执行setup
  const { setup } = Component
  if (setup) {
    const setupContext = (instance.setupContext =
      setup.length > 1 ? createSetupContext(instance) : null)

    setCurrentInstance(instance)
    pauseTracking()
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      ErrorCodes.SETUP_FUNCTION,
      [instance.props, setupContext]
    )
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance)
    } else {
      handleSetupResult(instance, setupResult, isSSR)
    }
  } else {
    finishComponentSetup(instance, isSSR)
  }
}

export function callWithErrorHandling(
  fn: Function,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
) {
  let res
  try {
    res = args ? fn(...args) : fn()
  } catch (err) {
    handleError(err, instance, type)
  }
  return res
}
```

另一个 setupRenderEffect 函数，就是为了后续数据修改注册的函数。

组件首次加载会调用 patch 函数去初始化子组件，注意 setupRenderEffect 本身就是在 patch 函数内部执行的，所以这里就会递归整个虚拟 DOM 树，
然后触发生命周期 mounted，完成这个组件的初始化。

页面首次更新结束后，setupRenderEffect 不仅实现了组件的递归渲染，还注册了组件的更新机制。


### Dom创建
template
```
<div id="app">
  <p>hello world</p>
  <Rate :value="4"></Rate>
</div>
```
->
```
function render(){
  return h('div',{id:"app"},children:[
    h('p',{},'hello world'),
    h(Rate,{value:4}),
  ])
}
```
createVNode 函数创建项目的虚拟 DOM，可以看到 Vue 内部的虚拟 DOM，也就是 vnode，就是一个对象，通过 type、props、children 等属性描述整个节点。
```

const vnode = createVNode(    
  rootComponent as ConcreteComponent,
  rootProps
)
function _createVNode() {

  // 处理属性和class
  if (props) {
    ...
  }

  // 标记vnode信息
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : __FEATURE_SUSPENSE__ && isSuspense(type)
    ? ShapeFlags.SUSPENSE
    : isTeleport(type)
    ? ShapeFlags.TELEPORT
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : isFunction(type)
    ? ShapeFlags.FUNCTIONAL_COMPONENT
    : 0

  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  )
}

function createBaseVNode(type,props,children,...){
    const vnode = {
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    children,
    shapeFlag,
    patchFlag,
    dynamicProps,
     ...
  } as VNode
  // 标准化子节点
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children)
  } else if (children) {
    vnode.shapeFlag |= isString(children)
      ? ShapeFlags.TEXT_CHILDREN
      : ShapeFlags.ARRAY_CHILDREN
  }
  return vnode
}
```
createVNode 负责创建 Vue 中的虚拟 DOM，而 mount 函数的核心逻辑就是使用 setupComponent 执行我们写的 `<script setup>`，使用 setupRenderEffect 监听组件的数据变化。
所以我们来到 setupRenderEffect 函数中，去完整地剖析 Vue 中虚拟 DOM 的更新逻辑.

在 setupRenderEffect 内部的 componentUpdateFn 中，updateComponentPreRenderer 更新了属性和 slots，并且调用 renderComponentRoot 函数创建新的子树对象 nextTree，
然后内部依然是调用 patch 函数:
```
const componentUpdateFn = ()=>{
  if (!instance.isMounted) {
      //首次渲染
      instance,
        parentSuspense,
        isSVG
      )
      。。。
  }else{
    let { next, bu, u, parent, vnode } = instance
    if (next) {
      next.el = vnode.el
      updateComponentPreRender(instance, next, optimized)
    } else {
      next = vnode
    }
    const nextTree = renderComponentRoot(instance)
      patch(
        prevTree,
        nextTree,
        // parent may have changed if it's in a teleport
        hostParentNode(prevTree.el!)!,
        // anchor may have changed if it's in a fragment
        getNextHostNode(prevTree),
        instance,
        parentSuspense,
        isSVG
      )
    }
}

// 注册effect函数
const effect = new ReactiveEffect(
  componentUpdateFn,
  () => queueJob(instance.update),
  instance.scope // track it in component's effect scope
)
const update = (instance.update = effect.run.bind(effect) as S      chedulerJob)
update()

const updateComponentPreRender = (
  instance: ComponentInternalInstance,
  nextVNode: VNode,
  optimized: boolean
) => {
  nextVNode.component = instance
  const prevProps = instance.vnode.props
  instance.vnode = nextVNode
  instance.next = null
  updateProps(instance, nextVNode.props, prevProps, optimized)
  updateSlots(instance, nextVNode.children, optimized)

  pauseTracking()
  // props update may have triggered pre-flush watchers.
  // flush them before the render update.
  flushPreFlushCbs(undefined, instance.update)
  resetTracking()
}
```
effect 函数，负责注册组件，这个函数也是 Vue 组件更新的入口函数。

组件注册了 update 方法，这个方法使用 effect 包裹后，当组件内的 ref、reactive 包裹的响应式数据变化的时候就会执行 update 方法，
触发组件内部的更新机制。

<br>

## patch 函数
在 patch 函数中，会针对不同的组件类型执行不同的函数，组件我们会执行 processComponent，HTML 标签我们会执行 processElement
```
  function path(n1, n2, container){
    const { type, shapeFlag } = n2
    switch (type) {
      case Text:
        processText(n1, n2, container)
        break
      // 还有注释，fragment之类的可以处理，这里忽略
      default:
        // 通过shapeFlag判断类型
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, anchor)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container)
        }
    }
    
  }

  function processComponent(n1, n2, container) {
    // 老规矩，么有n1就是mount
    if (!n1) {
      // 初始化 component
      mountComponent(n2, container)
    } else {
      updateComponent(n1, n2, container)
    }
  }
```
由于更新之后不是首次渲染了，patch 函数内部会执行 updateComponent:
```
const instance = (n2.component = n1.component)!
if (shouldUpdateComponent(n1, n2, optimized)) {

  // normal update
  instance.next = n2
  // in case the child component is also queued, remove it to avoid
  // double updating the same child component in the same flush.
  invalidateJob(instance.update)
  // instance.update is the reactive effect.
  instance.update()
  
} else {
  // no update needed. just copy over properties
  n2.component = n1.component
  n2.el = n1.el
  instance.vnode = n2
}
```

### patchElement
组件的子元素是由 HTML 标签和组件构成，组件内部的递归处理最终也是对 HTML 标签的处理，
所以，最后组件的更新都会进入到 processElement 内部的 patchElement 函数中。

在函数 patchElement 中我们主要就做两件事，更新节点自己的属性和更新子元素。

Vue 3 中性能优化的思想，通过 patchFlag 可以做到按需更新：
- 如果标记了 FULL_PROPS，就直接调用 patchProps。
- 如果标记了 CLASS，说明节点只有 class 属性是动态的，其他的 style 等属性都不需要进行判断和 DOM 操作。

内部执行 hostPatchProp 进行实际的 DOM 操作。
<strong>Vue 3 的虚拟 DOM 真正做到了按需更新，这也是相比于 React 的一个优势</strong>
```
  const patchElement = (
    n1: VNode,
    n2: VNode,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {
    const el = (n2.el = n1.el!)
    let { patchFlag, dynamicChildren, dirs } = n2
    patchFlag |= n1.patchFlag & PatchFlags.FULL_PROPS

    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ

    // full diff
    patchChildren(
      n1,
      n2,
      el,
      null,
      parentComponent,
      parentSuspense,
      areChildrenSVG,
      slotScopeIds,
      false
    )

    if (patchFlag > 0) {

      if (patchFlag & PatchFlags.FULL_PROPS) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          isSVG
        )
      } else {
        // class是动态的
        if (patchFlag & PatchFlags.CLASS) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, 'class', null, newProps.class, isSVG)
          }
        }

        // style样式是动态的
        if (patchFlag & PatchFlags.STYLE) {
          hostPatchProp(el, 'style', oldProps.style, newProps.style, isSVG)
        }

        // 属性需要diff
        if (patchFlag & PatchFlags.PROPS) {
          // 
          const propsToUpdate = n2.dynamicProps!
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i]
            const prev = oldProps[key]
            const next = newProps[key]
            // #1471 force patch value
            if (next !== prev || key === 'value') {
              hostPatchProp(
                el,
                key,
                prev,
                next,
                isSVG,
                n1.children as VNode[],
                parentComponent,
                parentSuspense,
                unmountChildren
              )
            }
          }
        }
      }
      //文本是动态的
      if (patchFlag & PatchFlags.TEXT) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children as string)
        }
      }
    } 
  }
```
子元素的更新是 patchChildren 函数负责的，这个函数也是虚拟 DOM 中难度最高的一个函数。

首先我们把子元素分成了文本、数组和空三个状态，新老子元素分别是这三种状态的一个，构成了不同的执行逻辑。这样 patchChildren 内部大致有五种情况需要处理：
- 如果新的子元素是空， 老的子元素不为空，直接卸载 unmount 即可。
- 如果新的子元素不为空，老的子元素是空，直接创建加载即可。
- 如果新的子元素是文本，老的子元素如果是数组就需要全部 unmount，是文本的话就需要执行 hostSetElementText。
- 如果新的子元素是数组，比如是使用 v-for 渲染出来的列表，老的子元素如果是空或者文本，直接 unmout 后，渲染新的数组即可。
- 最复杂的情况就是新的子元素和老的子元素都是数组。
  
最后一种情况，需要判断出可以复用的 DOM 元素，如果一个虚拟 DOM 没有改动或者属性变了，不需要完全销毁重建，而是更新一下属性，最大化减少 DOM 的操作，
这个任务就会交给 patchKeyedChildren 函数去完成。
```
  const patchChildren: PatchChildrenFn = (
    n1,
    n2,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized = false
  ) => {
    const c1 = n1 && n1.children
    const prevShapeFlag = n1 ? n1.shapeFlag : 0
    const c2 = n2.children

    const { patchFlag, shapeFlag } = n2
    // fast path
    if (patchFlag > 0) {
      if (patchFlag & PatchFlags.KEYED_FRAGMENT) {
        // this could be either fully-keyed or mixed (some keyed some not)
        // presence of patchFlag means children are guaranteed to be arrays
        patchKeyedChildren(
          c1 as VNode[],
          c2 as VNodeArrayChildren,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
        return
      } else if (patchFlag & PatchFlags.UNKEYED_FRAGMENT) {
        // unkeyed
        patchUnkeyedChildren(
          c1 as VNode[],
          c2 as VNodeArrayChildren,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
        return
      }
    }

    // children has 3 possibilities: text, array or no children.
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // text children fast path
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        unmountChildren(c1 as VNode[], parentComponent, parentSuspense)
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2 as string)
      }
    } else {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // prev children was array
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          // two arrays, cannot assume anything, do full diff
          patchKeyedChildren(
            c1 as VNode[],
            c2 as VNodeArrayChildren,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          )
        } else {
          // no new children, just unmount old
          unmountChildren(c1 as VNode[], parentComponent, parentSuspense, true)
        }
      } else {
        // prev children was text OR null
        // new children is array OR null
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
          hostSetElementText(container, '')
        }
        // mount new if array
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          mountChildren(
            c2 as VNodeArrayChildren,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          )
        }
      }
    }
  }
```

## 总结
总结一下，Vue 响应式驱动了组件之间的数据通信机制，数据更新之后，组件会执行 intance.update 方法，
update 方法内部执行 patch 方法进行新老子树的 diff 计算。

在更新函数中，主要做了两件事，pathProps 更新节点自身的属性，这里面使用了 pathFlags 做到了按需更新；
patchChildren 执行子元素的更新。其中 patch 函数内部会只对节点内部的动态属性做更新，这种按需更新的机制是 Vue 性能优秀的一个原因。

函数内部针对新老子元素不同的状态，执行不同的逻辑。根据子元素是否为空或者数组，以及新元素是否为空或者数组，分别执行对应的删除或者 mount 逻辑，
其中最复杂的就是新的子元素和老的子元素都是数组。

为了最大化减少 DOM 操作，patchKeyedChildren 使用了最长递增子序列来实现，并且相比于 React 的虚拟 DOM diff，新增了双端的预先判断 + 最长递增子序列算法来实现，
这也是 Vue 性能比较优秀的另外一个原因。