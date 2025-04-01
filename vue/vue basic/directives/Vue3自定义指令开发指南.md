以下为Vue3自定义指令开发指南（专注Composition API）：

### 一、核心概念
1. **指令生命周期**  
   ```typescript
   const myDirective = {
     // 元素挂载前（对应Vue2的bind）
     beforeMount(el, binding) {},
     
     // 元素挂载后（对应Vue2的inserted）
     mounted(el, binding, vnode) {},
     
     // 组件更新前（新增）
     beforeUpdate(el, binding) {},
     
     // 组件更新后（对应Vue2的update）
     updated(el, binding) {},
     
     // 元素卸载前（对应Vue2的unbind）
     unmounted(el) {}
   }
   ```

2. **参数解析**  
   ```typescript
   interface Binding {
     value: any;        // 指令值 v-dir="value"
     oldValue: any;     // 旧值（仅在beforeUpdate/updated可用）
     arg: string;       // 参数 v-dir:arg
     modifiers: {        // 修饰符 v-dir.modif
       [key: string]: boolean;
     };
     instance: ComponentPublicInstance | null; // 组件实例
   }
   ```

### 二、基础示例（自动聚焦）
```vue
<template>
  <input v-focus>
  <input v-focus.lazy>
</template>

<script setup>
// 组合式指令工厂函数
const useFocusDirective = (options = { delay: 0 }) => {
  let timeoutId = null
  
  return {
    mounted(el, { modifiers }) {
      const delay = modifiers.lazy ? options.delay : 0
      
      timeoutId = setTimeout(() => {
        el.focus()
        el._focusCleanup = () => clearTimeout(timeoutId)
      }, delay)
    },
    
    unmounted(el) {
      el._focusCleanup?.()
    }
  }
}

// 注册指令
const vFocus = useFocusDirective({ delay: 500 })
</script>
```

### 三、响应式指令示例
```vue
<template>
  <div v-pos="{ x, y }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 组合式逻辑复用
const usePosition = () => {
  const x = ref(0)
  const y = ref(0)
  
  const update = (e) => {
    x.value = e.clientX
    y.value = e.clientY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}

// 指令实现
const vPos = {
  mounted(el, { value }) {
    el.style.position = 'fixed'
    updatePosition(el, value)
  },
  
  updated(el, { value }) {
    updatePosition(el, value)
  }
}

const updatePosition = (el, { x, y }) => {
  el.style.left = `${x}px`
  el.style.top = `${y}px`
}

// 使用
const { x, y } = usePosition()
</script>
```

### 四、高级模式（组合式指令）
```typescript
// directives/useResize.ts
import { onMounted, onUnmounted } from 'vue'

export type ResizeHandler = (entries: ResizeObserverEntry[]) => void

export const useResizeDirective = (
  handler: ResizeHandler,
  options?: ResizeObserverOptions
) => {
  let observer: ResizeObserver | null = null

  const initObserver = () => {
    observer = new ResizeObserver(handler)
  }

  return {
    beforeMount() {
      if (!observer) initObserver()
    },

    mounted(el: HTMLElement) {
      observer?.observe(el, options)
    },

    updated(el: HTMLElement) {
      observer?.unobserve(el)
      observer?.observe(el, options)
    },

    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },

    stop() {
      observer?.disconnect()
    }
  }
}

// 组件中使用
<script setup>
import { useResizeDirective } from './directives/useResize'

const vResize = useResizeDirective((entries) => {
  entries.forEach(entry => {
    console.log('尺寸变化:', entry.contentRect)
  })
}, { box: 'content-box' })
</script>
```

### 五、最佳实践
1. **响应式更新**  
   使用`watch`处理值变化：
   ```typescript
   const vExample = {
     mounted(el, { value, instance }) {
       const stopWatch = watch(
         () => value, 
         (newVal) => updateElement(el, newVal)
       )
       
       // 存储清理函数
       el._cleanup = () => {
         stopWatch()
         // 其他清理逻辑
       }
     },
     
     unmounted(el) {
       el._cleanup?.()
     }
   }
   ```

2. **组件上下文访问**  
   ```typescript
   const vContext = {
     mounted(el, { instance }) {
       // 访问组件数据
       console.log(instance.$props)
       
       // 调用组件方法
       instance.exposed?.someMethod()
     }
   }
   ```

3. **TypeScript支持**  
   ```typescript
   import type { Directive, DirectiveBinding } from 'vue'
   
   interface MyDirectiveBinding extends DirectiveBinding {
     value: {
       color: string
       offset: number
     }
     modifiers: {
       animated?: boolean
     }
   }
   
   const MyDirective: Directive<HTMLElement, MyDirectiveBinding['value']> = {
     mounted(el, binding) {
       // 类型安全的访问
       const { color, offset } = binding.value
       const useAnimation = binding.modifiers.animated
       // ...
     }
   }
   ```

### 六、性能优化
1. **防抖处理**  
   ```typescript
   import { debounce } from 'lodash-es'

   const vResize = useResizeDirective(
     debounce((entries) => {
       // 处理逻辑
     }, 300)
   )
   ```

2. **条件观察**  
   ```typescript
   const vConditionalDirective = {
     mounted(el, { value }) {
       if (shouldObserve(value)) {
         startObservation(el)
       }
     },
     
     updated(el, { value, oldValue }) {
       if (value !== oldValue) {
         if (shouldObserve(value)) {
           startObservation(el)
         } else {
           stopObservation(el)
         }
       }
     }
   }
   ```

这些模式充分运用Vue3的Composition API特性，实现了：  
1. 逻辑复用通过工厂函数实现
2. 响应式数据与指令行为自动同步
3. 明确的资源清理机制
4. 完整的TypeScript类型支持
5. 性能敏感操作优化

实际开发中，建议将复杂指令逻辑封装为组合式函数，保持组件代码的简洁性。