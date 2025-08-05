# keep-alive
Vue 中的 `keep-alive` 组件是一个非常有用的内置组件，用于缓存动态组件的状态，避免组件的重新渲染。这在需要频繁切换且状态需要保留的场景中特别有用，例如导航菜单中的页面切换。

### 实现原理

1. **缓存机制**:
   - `keep-alive` 组件内部维护了一个缓存对象，用于存储被包裹组件的实例。
   - 当被包裹的组件首次被渲染时，`keep-alive` 会将其实例保存到缓存中。
   - 当组件被切换出去时，`keep-alive` 不会销毁组件实例，而是将其保留在缓存中。
   - 当组件再次被激活时，`keep-alive` 会从缓存中取出之前保存的实例并重新插入到 DOM 中，而不是重新创建一个新的实例。

2. **生命周期钩子**:
   - `keep-alive` 会影响被包裹组件的生命周期钩子。
   - 当组件被缓存时，会触发 `deactivated` 生命周期钩子。
   - 当组件从缓存中被激活时，会触发 `activated` 生命周期钩子。
   - 这两个钩子可以用来执行一些特定的逻辑，例如保存和恢复组件的状态。

3. **缓存策略**:
   - `keep-alive` 支持多种缓存策略，可以通过 `include` 和 `exclude` 属性来指定哪些组件需要被缓存。
   - `include` 属性接受一个字符串或正则表达式，表示只有匹配的组件会被缓存。
   - `exclude` 属性接受一个字符串或正则表达式，表示匹配的组件不会被缓存。
   - `max` 属性可以设置缓存的最大数量，超出后会根据 LRU（最近最少使用）算法移除旧的缓存。

### 示例代码

```html
<template>
  <div id="app">
    <button @click="currentView = 'Home'">Home</button>
    <button @click="currentView = 'About'">About</button>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentView: 'Home'
    };
  },
  components: {
    Home: {
      template: '<div>Home Component</div>',
      activated() {
        console.log('Home activated');
      },
      deactivated() {
        console.log('Home deactivated');
      }
    },
    About: {
      template: '<div>About Component</div>',
      activated() {
        console.log('About activated');
      },
      deactivated() {
        console.log('About deactivated');
      }
    }
  }
};
</script>
```

### 内部实现细节

1. **缓存对象**:
   - `keep-alive` 组件内部有一个 `cache` 对象，用于存储组件实例。
   - 每个组件实例的缓存键通常是组件的名称或路径。

2. **激活和去激活**:
   - 当组件被激活时，`keep-alive` 会从 `cache` 中取出组件实例并调用 `activated` 钩子。
   - 当组件被去激活时，`keep-alive` 会将组件实例保存到 `cache` 中并调用 `deactivated` 钩子。

3. **缓存管理**:
   - `keep-alive` 会根据 `include` 和 `exclude` 属性来决定是否缓存某个组件。
   - 如果设置了 `max` 属性，当缓存数量超过限制时，会根据 LRU 算法移除最旧的缓存。


---

## keep-alive嵌套
在 Vue 中， keep-alive  用于缓存组件，而  onActivated  钩子会在组件被激活（从缓存中取出显示）时触发。当  keep-alive  嵌套两次时，组件被激活的场景会增加，从而导致  onActivated  可能被多次触发，具体原因如下：

核心原因：嵌套的  keep-alive  会形成多层缓存上下文

- 外层  keep-alive  和内层  keep-alive  是两个独立的缓存容器，各自维护自己的缓存组件。
- 当组件处于内层  keep-alive  中时，它的显示/隐藏可能同时受到外层和内层  keep-alive  的影响：
1. 当内层  keep-alive  切换组件时，若当前组件从内层缓存中被激活，会触发一次  onActivated 。
2. 若外层  keep-alive  也发生切换（例如外层包裹的组件整体被激活），内层的组件可能会再次从外层缓存中被激活，导致  onActivated  再次触发。

简单来说，嵌套的  keep-alive  让组件处于“多层缓存”中，每次从任意一层缓存中被激活时， onActivated  都会执行，因此可能出现多次触发的情况。
