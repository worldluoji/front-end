# nextTick
在 Vue.js 中，`nextTick()` 是一个核心 API，用于处理 DOM 更新后的异步操作。理解它的关键在于掌握 Vue 的**异步更新队列机制**。

## 1. **获取更新后的 DOM**

当你修改了响应式数据，需要立即操作更新后的 DOM 时：

```vue
<script setup>
import { ref, nextTick } from 'vue'

const count = ref(0)
const divRef = ref()

async function increment() {
  count.value++
  
  // 此时 DOM 还未更新
  console.log(divRef.value.textContent) // 输出旧值
  
  await nextTick()
  // 现在 DOM 已更新
  console.log(divRef.value.textContent) // 输出新值
  
  // 可以安全操作 DOM
  divRef.value.style.color = 'red'
}
</script>

<template>
  <div ref="divRef">{{ count }}</div>
  <button @click="increment">增加</button>
</template>
```

## 2. **等待组件渲染完成**

在动态添加组件后，需要操作组件内的 DOM：

```vue
<script setup>
import { ref, nextTick } from 'vue'
import ChildComponent from './ChildComponent.vue'

const showChild = ref(false)
const childRef = ref()

async function addChild() {
  showChild.value = true
  
  // 必须等待组件渲染完成
  await nextTick()
  
  // 现在可以安全访问子组件的方法或 DOM
  childRef.value.someMethod()
  const childEl = childRef.value.$el
}
</script>

<template>
  <button @click="addChild">添加子组件</button>
  <ChildComponent v-if="showChild" ref="childRef" />
</template>
```

## 3. **处理异步更新队列**

Vue 会批量处理数据更新，`nextTick` 确保在所有更新完成后执行回调：

```vue
<script setup>
import { ref, nextTick } from 'vue'

const a = ref(0)
const b = ref(0)
const sum = ref(0)

async function updateBoth() {
  a.value = 10
  b.value = 20
  
  // 此时 a 和 b 的更新还在队列中
  console.log(sum.value) // 0
  
  // 等待所有同步更新完成
  await nextTick()
  
  // 计算最终结果
  sum.value = a.value + b.value
  console.log(sum.value) // 30
}
</script>
```

## 4. **解决 v-if/v-show 切换后的 DOM 操作**

切换显示状态后操作 DOM 元素：

```vue
<script setup>
import { ref, nextTick } from 'vue'

const showInput = ref(false)
const inputRef = ref()

async function showAndFocus() {
  showInput.value = true
  
  // 必须等待 DOM 渲染完成
  await nextTick()
  
  // 现在可以安全聚焦
  inputRef.value.focus()
}
</script>

<template>
  <button @click="showAndFocus">显示并聚焦输入框</button>
  <input v-if="showInput" ref="inputRef" />
</template>
```

## 5. **集成第三方库**

初始化需要操作 DOM 的第三方库：

```vue
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Chart from 'chart.js'

const chartRef = ref()
const chartData = ref(/* 初始数据 */)

onMounted(async () => {
  // 等待初始渲染完成
  await nextTick()
  
  // 现在可以初始化图表
  new Chart(chartRef.value, {
    type: 'line',
    data: chartData.value
  })
})

async function updateChart() {
  // 更新数据
  chartData.value = /* 新数据 */
  
  // 等待 DOM 更新
  await nextTick()
  
  // 重新渲染图表
  // ... 图表更新逻辑
}
</script>

<template>
  <canvas ref="chartRef"></canvas>
</template>
```

## 6. **处理列表渲染**

在更新列表后操作列表项：

```vue
<script setup>
import { ref, nextTick } from 'vue'

const items = ref([1, 2, 3])
const listRef = ref()

async function addItem() {
  items.value.push(items.value.length + 1)
  
  // 等待列表渲染完成
  await nextTick()
  
  // 滚动到最后一个元素
  const lastItem = listRef.value.lastElementChild
  lastItem.scrollIntoView()
}
</script>

<template>
  <ul ref="listRef">
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>
  <button @click="addItem">添加项目</button>
</template>
```

## 7. **与 KeepAlive 结合使用**

处理动态组件的激活状态：

```vue
<script setup>
import { onActivated, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onActivated(async () => {
  // 等待组件完全激活
  await nextTick()
  
  // 恢复滚动位置
  window.scrollTo(0, savedPosition)
  
  // 重新获取数据
  await fetchData()
})
</script>
```

## 8. **使用模式对比**

### 回调模式
```javascript
nextTick(() => {
  // DOM 已更新
})
```

### Promise 模式（推荐）
```javascript
await nextTick()
// DOM 已更新
```

### Composition API
```javascript
import { nextTick } from 'vue'

// 在 async 函数中
async function handleClick() {
  data.value = 'new value'
  await nextTick()
  // 操作 DOM
}
```

## 注意事项

1. **不要滥用**：不是所有场景都需要 `nextTick`，只有在必须操作更新后 DOM 时才使用
2. **避免嵌套**：尽量避免在 `nextTick` 回调中再调用 `nextTick`
3. **错误处理**：使用 try-catch 包装可能出错的 DOM 操作
4. **性能考虑**：频繁的 DOM 操作会影响性能

## 实际示例：自动聚焦输入框

```vue
<script setup>
import { ref, nextTick } from 'vue'

const showModal = ref(false)
const inputRef = ref()

async function openModal() {
  showModal.value = true
  await nextTick()
  inputRef.value?.focus()
}

// 关闭时自动失焦
function closeModal() {
  showModal.value = false
  inputRef.value?.blur()
}
</script>

<template>
  <button @click="openModal">打开弹窗</button>
  
  <div v-if="showModal" class="modal">
    <input ref="inputRef" placeholder="自动聚焦" />
    <button @click="closeModal">关闭</button>
  </div>
</template>
```

**核心要点**：`nextTick` 是连接 Vue 响应式数据更新和实际 DOM 更新的桥梁，确保在数据变化后的下一个"tick"执行回调，此时 DOM 已经完成更新。