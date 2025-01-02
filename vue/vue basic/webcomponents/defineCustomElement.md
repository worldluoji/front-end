# defineCustomElement
`defineCustomElement` 是 Vue 3 提供的一个 API，它允许开发者创建自定义元素（Custom Elements），这是 Web Components 标准的一部分。通过 `defineCustomElement` 创建的组件可以像普通的 HTML 元素一样被使用，并且可以在任何支持 Web Components 的环境中工作，而不需要依赖于 Vue 的运行时。

以下是 `defineCustomElement` 的一些关键点：

1. **创建自定义元素**：
   使用 `defineCustomElement` 可以基于 Vue 组件选项来定义一个自定义元素。这使得你可以利用 Vue 的所有特性，如响应式数据、计算属性、监听器等，同时保持与原生 DOM 的兼容性。

2. **注册和使用**：
   定义好自定义元素后，可以通过 `customElements.define()` 方法将其注册到浏览器中。一旦注册，你就可以在 HTML 中直接使用这个新的标签名，就像使用 `<div>` 或者 `<span>` 一样。

3. **样式封装**：
   自定义元素可以使用 Shadow DOM 来封装样式，确保内部样式不会影响页面上的其他部分，反之亦然。这对于构建可复用的 UI 组件特别有用。

4. **Vue 特性支持**：
   虽然 `defineCustomElement` 创建的组件是自定义元素，但它们仍然可以使用 Vue 的模板语法、指令、生命周期钩子等功能。不过需要注意的是，某些 Vue 特性可能需要额外配置才能正常工作，例如插槽（slot）的支持。

5. **类型声明**：
   如果你在 TypeScript 环境下工作，`defineCustomElement` 返回的对象会自动带有正确的类型声明，有助于提高开发体验。

6. **性能优化**：
   因为自定义元素是独立的，并且通常只包含必要的逻辑，所以它们往往比完整的 Vue 应用更轻量，加载速度更快。

下面是一个简单的例子，展示了如何使用 `defineCustomElement`：

```javascript
import { defineCustomElement } from 'vue';

// 定义一个 Vue 组件
const MyElement = defineCustomElement({
  props: {
    title: String,
  },
  template: `<h1>{{ title }}</h1>`,
});

// 注册自定义元素
customElements.define('my-element', MyElement);

// 现在可以在 HTML 中使用 <my-element></my-element>
```

请记住，由于 `defineCustomElement` 是基于 Web Components 的，因此它的行为和普通 Vue 组件有一些不同之处，特别是在处理事件和属性时。

除了常规的组件选项，defineCustomElement() 还支持一系列特定于自定义元素的选项：
- styles：一个内联 CSS 字符串数组，用于提供应注入元素 shadow root 的 CSS。
- configureApp ：一个函数，可用于配置自定义元素的 Vue 应用实例。
- shadowRoot ：boolean，默认为 true。设置为 false 以在不带 shadow root 的情况下渲染自定义元素。这意味着自定义元素单文件组件中的 <style> 将不再被封装隔离。
- nonce ：string，如果提供，将在注入到 shadow root 样式标签上设置 nonce attribute。

## reference
- https://cn.vuejs.org/api/custom-elements.html#definecustomelement
- https://cn.vuejs.org/guide/extras/web-components.html