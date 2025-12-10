# onMounted and onActivated
在 Vue 3 中，`mounted` 和 `onActivated` 的执行情况取决于组件是否被 `<KeepAlive>` 包裹，以及是否是第一次进入：

## 1. 普通组件（没有使用 KeepAlive）
```vue
<template>
  <MyComponent />
</template>
```
- **`mounted` 会执行**（第一次进入时执行）
- **`onActivated` 不会执行**（因为组件没有被 KeepAlive 包裹）

## 2. KeepAlive 组件
```vue
<template>
  <KeepAlive>
    <MyComponent v-if="show" />
  </KeepAlive>
</template>
```

### 第一次进入组件时：
- ✅ **`mounted` 会执行**（组件首次挂载）
- ✅ **`onActivated` 也会执行**（组件首次激活）

执行顺序：`mounted` → `onActivated`

## 3. 后续的切换
当组件从 KeepAlive 缓存中重新激活时：

### 再次进入（第二次及以后）：
- ❌ **`mounted` 不会执行**（组件已挂载，不会重新挂载）
- ✅ **`onActivated` 会执行**（每次激活时都会执行）

## 4. 完整的生命周期示例
```vue
<script setup>
import { onMounted, onActivated, onDeactivated, onUnmounted } from 'vue'

onMounted(() => {
  console.log('mounted - 只执行一次')
})

onActivated(() => {
  console.log('activated - 每次进入都执行')
})

onDeactivated(() => {
  console.log('deactivated - 离开时执行（被缓存）')
})

onUnmounted(() => {
  console.log('unmounted - KeepAlive组件不会执行，普通组件离开时执行')
})
</script>
```

## 5. 实际场景对比

| 场景 | mounted | activated | 说明 |
|------|---------|-----------|------|
| 普通组件首次进入 | ✅ | ❌ | 只执行一次 mounted |
| KeepAlive组件首次进入 | ✅ | ✅ | 两者都执行 |
| KeepAlive组件再次进入 | ❌ | ✅ | 只执行 activated |
| 普通组件再次进入 | ✅ | ❌ | 每次都会重新挂载 |

## 6. 使用建议
```vue
<script setup>
import { onMounted, onActivated } from 'vue'

// 初始化数据（无论是否缓存都需要执行）
const initData = () => {
  // 初始化逻辑
}

// 重新获取数据（只希望在进入时刷新）
const refreshData = () => {
  // 刷新数据的逻辑
}

onMounted(() => {
  initData()  // 首次挂载执行
  refreshData() // 首次进入获取数据
})

onActivated(() => {
  refreshData() // 每次进入都刷新数据
})
</script>
```

## 总结
- **第一次进入 KeepAlive 组件**：`mounted` 和 `onActivated` 都会执行
- **后续进入 KeepAlive 组件**：只执行 `onActivated`
- **普通组件**：只执行 `mounted`，`onActivated` 不会执行

这样的设计让 KeepAlive 组件既能完成一次性初始化，又能在每次显示时执行特定逻辑。