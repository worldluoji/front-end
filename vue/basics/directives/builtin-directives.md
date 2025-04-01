# builtin-directives
Vue.js 提供了一组内置的指令，用于在模板中声明式地绑定DOM元素的行为和数据。这些指令以`v-`开头，下面列举了一些常用的Vue指令及其简要说明：

### 1. `v-bind`

用于动态地绑定一个或多个属性，或一个组件的prop到表达式。

```html
<!-- 绑定class和style -->
<div v-bind:class="{'active': isActive}"></div>
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<!-- 简写 -->
<div :class="{'active': isActive}"></div>
```

### 2. `v-on`

用来监听DOM事件，以便执行JavaScript代码。

```html
<button v-on:click="doSomething"></button>
<!-- 简写 -->
<button @click="doSomething"></button>
```

### 3. `v-if`, `v-else`, `v-else-if`

条件渲染，根据表达式的真假值来决定是否渲染元素。

```html
<div v-if="seen">Now you see me</div>
<div v-else>Now you don't</div>
```

### 4. `v-show`

类似于`v-if`，但是它总是会渲染并且保持DOM元素，只是简单地切换CSS属性`display`。

```html
<h1 v-show="ok">Hello!</h1>
```

### 5. `v-for`

基于源数据多次渲染元素或模板块。

```html
<ul id="example-2">
  <li v-for="(item, index) in items" :key="item.id">
    {{ index }} - {{ item.message }}
  </li>
</ul>
```

### 6. `v-model`

创建双向数据绑定，在表单控件或者组件上使用。

```html
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

### 7. `v-slot`

用于定义作用域插槽的内容。自Vue 2.6.0起，`v-slot`成为指定插槽内容的新语法，并且可以与具名插槽和作用域插槽一起使用。

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

### 8. `v-pre`

跳过这个元素及其所有子节点的编译过程。可以用来显示原始的Mustache标签。

```html
<span v-pre>{{ This will not be compiled }}</span>
```

### 9. `v-cloak`

该指令保持在元素上直到关联实例结束编译。结合CSS规则如`[v-cloak] { display: none }`，可以隐藏未编译的Mustache标签直到实例准备完毕。

```html
<div v-cloak>
  {{ message }}
</div>
```

### 10. `v-once`

只渲染元素和组件一次。之后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。

```html
<span v-once>This will never change: {{ msg }}</span>
```