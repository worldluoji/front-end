# 组合式 API 怎么封装出“类 Store”模块？
优势：更自由的逻辑组合, 更少的心智负担, 更轻的项目依赖
```ts
// user.ts
import { ref } from 'vue'

const token = ref('')
const info = ref(null)

const setToken = (t: string) => token.value = t
const setInfo = (i: any) => info.value = i

export function useUser() {
  return {
    token,
    info,
    setToken,
    setInfo,
  }
}
```
使用：
```ts
import { useUser } from '@/composables/user'
const user = useUser()
user.setToken('abc')
```

要是你怕每次都用一个新实例，也可以加缓存：
```ts
let instance: ReturnType<typeof createUser> | null = null

function createUser() {
  const token = ref('')
  ...
  return { token, ... }
}

export const useUser = () => {
  if (!instance) instance = createUser()
  return instance
}
```

---

## 什么时候用 Pinia 更合适？
Pinia 并不是没价值，它在以下场景更适用：
- 大型团队需要明确 store 组织结构
- 需要 SSR 支持的场景（如 Nuxt 3 有原生支持）
- 习惯“集中式状态管理”的开发者（类 Redux / Vuex）

如果你有几十个状态模块、多人维护、需要强类型约束和统一 DevTools，那 Pinia 是更稳的方案。
