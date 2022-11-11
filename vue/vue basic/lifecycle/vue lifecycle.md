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