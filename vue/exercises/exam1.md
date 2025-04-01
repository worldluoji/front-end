以下是一套中高难度的Vue3试题，包含概念、原理和动手题目，建议完成时间90分钟：

---

### 一、概念题（每题5分，共25分）
1. Composition API 与 Options API 的核心区别是什么？在什么场景下推荐使用Composition API？
2. Vue3的响应式系统基于Proxy实现，相比Vue2的Object.defineProperty有哪些优势？
3. Teleport组件的作用是什么？请举例说明其使用场景
4. 解释Vue3中Fragment、Suspense这两个内置组件的设计目的
5. 什么是"编译时信息优化"（PatchFlags）？它如何提升虚拟DOM的diff性能？

---

### 二、原理题（每题10分，共30分）
1. 请描述`reactive()`和`ref()`的底层实现差异，为什么基本类型数据推荐用ref？
2. 当同时使用`<script setup>`和`export default`时，哪些选项会被合并？为什么？
3. 分析以下代码的响应式更新流程：
```javascript
const state = reactive({ count: 0 })
effect(() => {
  console.log(state.count)
})
state.count++
```

---

### 三、动手题（共45分）
1. **代码重构**（10分）  
将以下Options API组件改为Composition API写法：
```vue
<template>
  <div>{{ fullName }}</div>
</template>

<script>
export default {
  data() {
    return { firstName: 'John', lastName: 'Doe' }
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  }
}
</script>
```

2. **自定义指令**（10分）  
编写一个v-focus指令，要求：  
• 在元素插入DOM后自动获得焦点  
• 支持通过修饰符`.lazy`实现延迟500ms聚焦

3. **性能优化**（10分）  
现有长列表渲染性能问题，请给出至少3种Vue3的优化方案，并写出示例代码片段

4. **组合式函数**（15分）  
实现一个useMousePosition组合函数：  
• 实时追踪鼠标在视口中的坐标  
• 提供`start()`和`stop()`方法控制监听  
• 返回值为响应式{x, y}对象  
• 在组件卸载时自动移除监听

---

### 四、综合题（20分）
**场景**：需要开发一个实时数据仪表盘，要求：  
• 多个可视化组件共享全局状态  
• 支持动态加载异步组件  
• 具备错误边界处理能力  
• 优化首屏加载速度

**问题**：  
1. 请设计状态管理方案，对比Vuex4和Pinia的适用性  
2. 如何结合Suspense和异步组件实现加载状态？  
3. 使用哪些Vue3特性可以有效提升性能？  
4. 编写一个错误边界组件，捕获子组件的JavaScript错误

---

### 答案要点（部分示例）：

**一.3题示例答案**  
Teleport用于将组件模板内容渲染到DOM中其他位置。典型场景：  
• 模态框：避免被父组件的overflow:hidden裁剪  
```vue
<teleport to="#modal-container">
  <div class="modal">...</div>
</teleport>
```

**三.4题示例答案**  
```javascript
import { onMounted, onUnmounted, reactive } from 'vue'

export function useMousePosition() {
  const pos = reactive({ x: 0, y: 0 })
  
  const update = e => {
    pos.x = e.clientX
    pos.y = e.clientY
  }

  const start = () => window.addEventListener('mousemove', update)
  const stop = () => window.removeEventListener('mousemove', update)

  onMounted(start)
  onUnmounted(stop)

  return { 
    pos,
    start,
    stop
  }
}
```