# provide-inject
在 Vue 3 中，`provide` 和 `inject` 是一对用于父子组件之间传递数据的 API。它们提供了一种更灵活的方式，可以在不依赖 props 或事件的情况下，在组件树中共享状态或函数。这对于跨越多层嵌套的组件传递数据尤其有用，可以避免“props 钻透”的问题。

### `provide` 和 `inject` 的作用

- **`provide`**：父组件通过 `provide` 提供一些属性或方法给它的所有子孙组件。
- **`inject`**：子组件使用 `inject` 来接收来自祖先组件提供的值。

### 使用 `<script setup>` API 实现 `provide` 和 `inject`

#### 在父组件中使用 `provide`

在父组件中，你可以使用 `provide` 函数来定义要提供的属性或方法。如果你使用的是 `<script setup>`，你需要从 Vue 导入 `provide` 并调用它。

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <h1>Parent Component</h1>
    <ChildComponent />
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';

// 定义要提供的数据或方法
const message = ref('Hello from parent!');
const greet = () => console.log('Greeting from parent!');

// 提供数据和方法
provide('message', message);
provide('greet', greet);
</script>
```

#### 在子组件中使用 `inject`

在子组件中，你可以使用 `inject` 函数来接收由祖先组件提供的值。同样地，如果你使用的是 `<script setup>`，你需要从 Vue 导入 `inject` 并调用它。

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <p>Injected Message: {{ injectedMessage }}</p>
    <button @click="injectedGreet">Call Greet</button>
  </div>
</template>

<script setup>
import { inject } from 'vue';

// 注入提供的数据和方法
const injectedMessage = inject('message');
const injectedGreet = inject('greet');

// 如果需要确保注入的值存在，可以使用非空断言 (!)
// const requiredMessage = inject('message')!;
</script>
```

### 设置默认值和类型检查（TypeScript）

当你调用 `inject` 时，可以提供一个默认值，以防在组件树中找不到对应的 `provide` 值。这对于确保组件的健壮性非常重要。此外，如果你正在使用 TypeScript，还可以为注入的值指定类型，以获得更好的开发体验和编译时检查。

```html
<!-- ChildComponent.vue with TypeScript -->
<template>
  <div>
    <p>Injected Message: {{ injectedMessage?.text }}</p>
    <button @click="injectedGreet">Call Greet</button>
  </div>
</template>

<script setup lang="ts">
import { inject, Ref } from 'vue';

// 定义接口或类型
interface IMessage {
  text: string;
}

// 注入并设置默认值
const injectedMessage = inject<Ref<IMessage>>('message', null);

// 注入方法
const injectedGreet = inject<(msg?: string) => void>('greet', () => console.log('Default greet'));

// 如果你需要确保注入的值存在，可以使用非空断言 (!)
// const requiredMessage = inject<Ref<IMessage>>('message')!;
</script>
```

### 注意事项

- **性能影响**：`provide` 和 `inject` 不会触发额外的渲染开销，但是它们确实会在每次组件更新时重新计算依赖关系。因此，在性能敏感的应用程序中，应该谨慎使用。
- **避免过度使用**：尽管 `provide` 和 `inject` 提供了便利，但过度使用可能导致代码难以追踪和维护。尽量只对确实需要跨层级共享的状态或逻辑使用它们。
- **命名约定**：为了使代码更易读和维护，建议为 `provide` 和 `inject` 的键名使用一致且描述性的名称。

通过上述方式，你可以在 `<script setup>` 中有效地使用 `provide` 和 `inject` 来构建更加灵活和模块化的 Vue 3 应用程序。这不仅简化了数据传递，还提高了代码的可维护性和扩展性。

## provide 源码
```ts
export function provide(
  key,
  value,
) {
  //拿到当前组件的vue实例提供的provides对象
  let provides = currentInstance.provides
  //拿到父组件的vue实例提供的provides对象
  const parentProvides =
    currentInstance.parent && currentInstance.parent.provides
  // 如果父组件和当前组件的provides对象相等
  if (parentProvides === provides) {
    // 基于父组件的provides对象拷贝出一个新的对象
    provides = currentInstance.provides = Object.create(parentProvides)
  }
  // 如果provides对象中有相同的key，那么就会直接覆盖。
  provides[key] = value
}
```
所以，父组件链上多个组件对同一个 key 提供了值，那么离得更近的组件将会“覆盖”链上更远的组件所提供的值。

## inject 源码
```ts
export function inject(
  key,
) {
  //currentInstance是一个存储当前vue实例的全局变量，在vue组件初始化时会赋值。
  //初始化完成后会被重置为null
  const instance = currentInstance

  if (instance || currentApp) {
    // 拿到父组件或者currentApp中提供的provides对象
    const provides = instance
      ? instance.parent.provides
      : currentApp!._context.provides
    // 从provides对象中拿到相同key的值
    if (provides && key in provides) {
      return provides[key]
    }
  } else if (__DEV__) {
    // 不是在setup中或者runWithContext中调用，就会发出警告
    warn(`inject() can only be used inside setup() or functional components.`)
  }
}
```
只有在setup期间currentInstance全局变量的值为当前组件的vue实例对象，当vue实例初始化完成后currentInstance已经被赋值为null。所以当我们在非setup 期间调用inject方法会警告：inject() can only be used inside setup() or functional components.

## 使用app.runWithContext()打破inject只能在setup 期间调用的限制
官方解释runWithContext()为“使用当前应用作为注入上下文执行回调函数”

runWithContext方法接收的参数和返回的值。这个方法接收一个参数，参数是一个回调函数。这个回调函数会在app.runWithContext()执行时被立即执行，并且app.runWithContext()的返回值就是回调函数的返回值。

上面代码中currentApp!._context.provides中的currentApp就是官方解释的“注入的上下文”，所以我们才可以在非setup期间执行inject，并且还可以拿到注入的值。
```ts
const userType = app.runWithContext(() => {
  // 拿到app中注入的userType字段
  return inject("userType");
});
```

runWithContext()源码
```ts
runWithContext(fn) {
  // 将调用runWithContext方法的对象赋值给全局对象currentApp
  currentApp = app
  try {
    // 立即执行传入的回调函数
    return fn()
  } finally {
    currentApp = null
  }
}
```
这里的app就是调用runWithContext方法的对象，你可以简单的理解为this。调用app.runWithContext()就会将app对象赋值给全局变量currentApp，然后会立即执行传入的回调fn。当执行到回调中的inject("userType")时，由于我们在上一行代码已经给全局变量currentApp赋值为app了，所以就可以从app中拿到对应key的provider值。