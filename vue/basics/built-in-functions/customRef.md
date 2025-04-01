# costomRef
`customRef()` 是 Vue 3 中的一个 API，它允许你创建自定义的 ref，可以对依赖追踪和触发更新的行为进行完全的控制。这对于需要更细粒度地控制响应式行为的情况非常有用。通过 `customRef()`，你可以实现延迟跟踪、防抖、节流等功能，也可以用来创建具有特定响应性规则的引用。

也就是说，customRef函数的返回值是一个ref对象。当我们对返回值ref对象进行“读操作”时，会被拦截到ref对象的get方法中。当我们对返回值ref对象进行“写操作”时，会被拦截到ref对象的set方法中。

`customRef()` 接受一个函数作为参数，这个函数会接收两个回调函数 `track` 和 `trigger`，你需要在返回的对象中使用这两个回调来手动控制依赖追踪和触发更新。

当我们对ref变量进行写操作时，此时会被拦截到Proxy的set方法，在set方法中会将收集到的依赖依次取出来执行，我们前面收集的依赖是render函数。所以render函数就会重新执行，执行render函数生成虚拟DOM，再生成真实DOM，这样浏览器中渲染的就是最新的ref变量的值。同样这里依赖触发也是在vue内部自动完成的，在我们的代码中无需手动去触发依赖。

搞清楚了依赖收集和依赖触发现在来讲track和trigger两个函数你应该就能很容易理解了，track和trigger两个函数可以让我们手动控制什么时候进行依赖收集和依赖触发。执行track函数就会手动收集依赖，执行trigger函数就会手动触发依赖，进行页面刷新。

### 使用 `customRef` 的基本结构

```javascript
import { customRef } from 'vue';

function useCustomRef(initialValue) {
  return customRef((track, trigger) => {
    let value = initialValue;

    return {
      get() {
        // 当组件读取该ref时调用track来注册追踪
        track();
        console.log('tracked');
        return value;
      },
      set(newValue) {
        // 当组件设置该ref的新值时调用trigger来触发视图更新
        value = newValue;
        console.log('triggered');
        trigger();
      }
    };
  });
}
```

### 示例：创建一个带有防抖功能的自定义 Ref

下面是一个创建防抖（debounce）效果的 `customRef` 的例子。这可以用于输入框的搜索场景，确保只有在用户停止输入一段时间后才触发搜索请求。

```vue
<template>
  <input v-model="debouncedSearchText" />
</template>

<script setup>
import { customRef } from 'vue';

function useDebouncedRef(value, delay) {
  let timeout;

  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      }
    };
  });
}

// 创建一个有200毫秒防抖时间的自定义ref
const debouncedSearchText = useDebouncedRef('', 200);
</script>
```

在这个例子中，`useDebouncedRef` 函数创建了一个新的 `customRef`，它会在设置新值时启动一个定时器，并且仅在设定的时间（`delay` 毫秒）之后没有新的设置操作发生时才会触发视图更新。

### 应用场景

- **防抖**：如上述示例，适用于需要减少频繁触发的事件处理。
- **节流**：限制某个操作在一定时间内只能执行一次，比如滚动事件或窗口调整大小事件。
- **异步数据获取**：当依赖的数据是从网络请求获取时，可以使用 `customRef` 来控制何时加载数据以及如何缓存结果。
- **延迟响应**：对于某些不需要立即响应的操作，可以设置一定的延迟，以提高用户体验或优化性能。

总之，`customRef` 提供了一种强大的方式来定制响应式逻辑，使开发者能够根据具体需求灵活调整组件的行为。