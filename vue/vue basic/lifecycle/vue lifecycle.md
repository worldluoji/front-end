#  Vue 生命周期

1. beforeCreate（新对象诞生）
Vue对象用新方法实例化。它创建一个Vue类的对象来处理DOM元素。对象的这个生命阶段可以通过beforeCreated 挂钩来访问 。我们可以在这个钩子中插入我们的代码，在对象初始化之前执行。

2. created （具有默认特性的对象）
在这个生命阶段，对象及其事件完全初始化。 created 是访问这个阶段并编写代码的钩子。

3. beforeMounted（对象在DOM中适合形状）
DOM未完成挂载，数据初始化完成，但是数据的双向绑定还是显示{{}}，这是因为Vue采用了Virtual DOM（虚拟Dom）技术。先占住了一个坑。

4. mounted（DOM已准备就绪并放置在页面内）
一旦模板准备就绪。它将数据放入模板并创建可呈现元素。用这个新的数据填充元素替换DOM元素。这一切都发生在mounted钩子上。
数据和DOM都完成挂载，在上一个周期占位的数据把值给渲染进去。可以在这边请求，不过created请求会更好一些。这个周期适合执行初始化需要操作DOM的方法。

5. beforeUpdate（更改已完成，但尚未准备好更新DOM）
只要是页面数据改变了都会触发，数据更新之前，页面数据还是原来的数据，当你请求赋值一个数据的时候会执行这个周期，如果没有数据改变不执行。

6. updated（在DOM中呈现的更改）
只要是页面数据改变了都会触发，数据更新完毕，页面的数据是更新完成的。
beforeUpdate和updated要谨慎使用，因为页面更新数据的时候都会触发，在这里操作数据很影响性能和容易死循环。

7. beforeDestroy（对象准备死掉）
就在Vue对象被破坏并从内存中释放之前， deforeDestroy 钩子被触发，并允许我们在其中处理我们的自定义代码，这时候还能访问数据。

8. destroyed（对象停止并从内存中删除）
该 destroyed 钩子被成功运行销毁对象上调用。


<img src="vue3的生命周期.png" />

可以看到，在Vue3中, 多了setup composition, 其在beforeCreate之前执行。
并且，beforeDestroy和 destroyed 变为了 beforeUnmount 和 unmounted.

<br>

## 新的调试钩子函数
们还可以在Vue3中使用两个全新的钩子函数来进行调试。他们是：
- onRenderTracked
- onRenderTriggered

这两个事件都带有一个DebuggerEvent，它使我们能够知道是什么导致了Vue实例中的重新渲染。
```
export default {
  onRenderTriggered(e) {
    debugger
    // 检查哪个依赖项导致组件重新呈现
  }
}
```

## 父子组件生命周期
在Vue.js中，父子组件的生命周期钩子按照一定的顺序触发。当一个父组件被创建或更新时，它的子组件也会相应地经历创建或更新的过程。以下是父子组件生命周期钩子的大致顺序：

### 父组件挂载阶段

1. `beforeCreate` 父组件
2. `created` 父组件
3. `beforeMount` 父组件

此时父组件开始编译，如果在这个过程中需要渲染子组件，则会进入到子组件的生命周期。

4. `beforeCreate` 子组件
5. `created` 子组件
6. `beforeMount` 子组件
7. `mounted` 子组件

8. `mounted` 父组件

### 父组件更新阶段

当父组件的状态发生变化并导致重新渲染时：

1. `beforeUpdate` 父组件

接着是子组件的更新过程（如果子组件依赖的数据发生了变化）：

2. `beforeUpdate` 子组件
3. `updated` 子组件

4. `updated` 父组件

### 销毁阶段

当父组件被销毁时，它会先销毁所有的子组件：

1. `beforeDestroy` 子组件
2. `destroyed` 子组件

然后才会销毁自己：

3. `beforeDestroy` 父组件
4. `destroyed` 父组件

请注意，在Vue 3中，`beforeDestroy` 和 `destroyed` 钩子已经被重命名为 `beforeUnmount` 和 `unmounted`，但它们的功能和触发时机保持不变。

每个组件的生命周期钩子提供了在不同阶段执行代码的机会，比如可以在 `mounted` 钩子中发起网络请求获取数据，或者在 `beforeDestroy` 中清理定时器等。

## reference
https://cn.vuejs.org/api/composition-api-lifecycle.html