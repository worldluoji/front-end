# 高级前端（Vue技术栈）面试题

## 一、Vue 核心基础

### Q1: Vue 3 相比 Vue 2 有哪些重大改进？为什么 Composition API 更适合大型项目？

#### Vue 2 的问题

```
1. 响应式基于 Object.defineProperty
   - 无法监听新增/删除属性（需要 Vue.set/delete）
   - 无法监听数组下标变化（Proxy 解决了）

2. 组件逻辑分散
   - 选项式 API（data/computed/methods/watch）导致相关逻辑分散
   - 大组件难以维护，逻辑复用靠 mixins（命名冲突、来源不清）

3. 打包体积大
   - 完整 Vue 2 约 30kb+，Vue 3 通过 tree-shaking 可缩减到 10kb 左右
```

#### Vue 3 的改进

```js
// 1. 响应式基于 Proxy
const obj = new Proxy(target, {
  get(target, key, receiver) {
    track(target, 'get', key)  // 依赖收集
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    trigger(target, 'set', key)  // 触发更新
    return Reflect.set(target, key, value, receiver)
  }
})
```

```
改进点：
├── 性能：Proxy 拦截整个对象，无需遍历属性
├── 响应式：支持新增/删除属性监听
├── 数组：支持数组下标监听
├── 递归：懒递归，只有访问时才深层代理
└── 集合：支持 Map/Set/WeakMap/WeakSet
```

#### Composition API 为什么更适合大型项目

```vue
<!-- Vue 2: 逻辑分散在各个选项中 -->
<script>
export default {
  data() { return { user: null, loading: false } },
  computed: {
    userName() { return this.user?.name }
  },
  methods: {
    async fetchUser() {
      this.loading = true
      this.user = await api()
      this.loading = false
    }
  },
  watch: {
    user(val) { console.log(val) }
  },
  mounted() { this.fetchUser() }
}
</script>

<!-- Vue 3: 逻辑内聚 -->
<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// 用户相关逻辑 - 自包含
const userState = (() => {
  const user = ref(null)
  const loading = ref(false)
  const userName = computed(() => user.value?.name)

  const fetchUser = async () => {
    loading.value = true
    user.value = await api()
    loading.value = false
  }

  watch(user, (val) => console.log(val))
  onMounted(fetchUser)

  return { user, loading, userName, fetchUser }
})()

// 权限相关逻辑 - 自包含
const permissionState = (() => {
  const permissions = ref([])
  const hasAdmin = computed(() => permissions.value.includes('admin'))
  return { permissions, hasAdmin }
})()

// 模板中按需使用
// userState.user, permissionState.hasAdmin
</script>
```

```
Composition API 优势：
│
├── 逻辑内聚：相关逻辑放一起，易理解
├── 逻辑复用：自定义 hook 可跨组件/项目复用
│   └── useUser.js, usePermission.js, useFetch.js...
├── 类型推导：更好的 TypeScript 支持
├── 代码组织：按功能分文件，而非按选项类型分
└── Tree-shaking：未使用的 API 不打入包
```

---

### Q2: 响应式原理（ref vs reactive）

#### ref

```js
// ref 源码简化
function ref(value) {
  return new RefImpl(value)
}

class RefImpl {
  constructor(value) {
    // 如果是对象，用 reactive 包装
    this._rawValue = isObject(value) ? reactive(value) : value
    this._value = isObject(value) ? reactive(value) : value
  }

  get value() {
    track(this, 'get', 'value')  // 依赖收集
    return this._value
  }

  set value(newVal) {
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = isObject(newVal) ? reactive(newVal) : newVal
      trigger(this, 'set', 'value')  // 触发更新
    }
  }
}
```

#### reactive

```js
// reactive 源码简化
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      track(target, 'get', key)  // 依赖收集

      // 懒递归：只有访问时才深层代理
      if (isObject(res)) {
        return reactive(res)
      }
      return res
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      trigger(target, 'set', key)  // 触发更新
      return res
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key)
      trigger(target, 'delete', key)
      return res
    }
  })
}
```

#### 依赖收集与触发机制

```js
// 依赖收集核心
let activeEffect = null

function track(target, type, key) {
  if (activeEffect) {
    // targetMap = WeakMap<target, Map<key, Set<effect>>>
    const depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, depsMap = new Map())
    }
    const deps = depsMap.get(key)
    if (!deps) {
      depsMap.set(key, deps = new Set())
    }
    deps.add(activeEffect)  // 收集当前活跃的 effect
  }
}

function trigger(target, type, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const deps = depsMap.get(key)
  deps?.forEach(effect => effect())
}
```

#### ref vs reactive 区别

| 特性 | ref | reactive |
|------|-----|----------|
| 支持类型 | 基本类型 + 对象 | 仅对象/数组 |
| 访问方式 | `.value` | 直接 `obj.x` |
| 解构丢失响应式 | 会（需 `toRefs`） | 会（需 `toRaw`） |
| 重新赋值 | 整个替换触发更新 | 替换属性触发更新 |
| 底层实现 | 类包装 + getter/setter | Proxy |
| 类型推导 | 泛型 `Ref<T>` | 泛型 `Reactive<T>` |

#### shallowRef vs shallowReactive

```js
// shallowRef - 只有 .value 变化触发更新，嵌套对象不变
const state = shallowRef({ count: 0 })
state.value.count++  // 不触发更新！
state.value = { count: state.value.count + 1 }  // 触发更新

// shallowReactive - 只有第一层响应式
const state = shallowReactive({
  user: { name: 'John', address: { city: 'BJ' } }
})
state.user.name = 'Jane'      // 不触发更新（深层）
state.user = { name: 'Jane' }  // 触发更新（第一层）
```

#### 代码题解析

```js
const obj = reactive({ count: 0 })
const count = ref(0)

// obj.count++ 触发更新，因为修改的是响应式对象的属性
// count.value++ 触发更新，因为修改的是 ref 的 value

// 但如果是：
count.value++  // ✅ 触发更新
obj.count++    // ✅ 触发更新

// 重要区别：
// ref 的 value 是基本类型时，是值拷贝
// reactive 的属性是引用类型时，是引用拷贝
```

---

### Q3: 生命周期

#### Vue 3 生命周期图

```
setup
  ↓
onBeforeMount
  ↓
onMounted
  ↓
onBeforeUpdate ←→ updated（Watcher 触发）
  ↓
onBeforeUnmount
  ↓
onUnmounted
```

#### setup 与 Vue 2 生命周期对应

| Vue 2 | Vue 3 (setup) |
|-------|---------------|
| beforeCreate | - |
| created | setup |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeDestroy | onBeforeUnmount |
| destroyed | onUnmounted |
| errorCaptured | onErrorCaptured |
| - | onRenderTracked（调试用） |
| - | onRenderTriggered（调试用） |

#### 父子组件生命周期执行顺序

```
父 beforeCreate → 父 created → 父 beforeMount
  → 子 beforeCreate → 子 created → 子 beforeMount → 子 mounted
→ 父 mounted

更新时：
父 beforeUpdate → 子 beforeUpdate → 子 updated → 父 updated

卸载时：
父 beforeUnmount → 子 beforeUnmount → 子 unmounted → 父 unmounted
```

#### provide/inject vs props/emit

| 场景 | 推荐方案 |
|------|----------|
| 父子一对一传值 | props/emit |
| 爷孙隔代传值 | provide/inject |
| 跨级共享状态 | Pinia/Vuex |
| 事件总线 | mitt（兄弟/无关系组件） |

```js
// 父组件
import { provide, ref } from 'vue'
const theme = ref('dark')
provide('theme', theme)        // 响应式（子组件修改会影响父）
provide('themeValue', 'dark')   // 非响应式

// 子组件
import { inject } from 'vue'
const theme = inject('theme')
const themeValue = inject('themeValue', 'light') // 默认值
```

---

### Q4: 虚拟 DOM 与 Patch 算法

#### 什么是虚拟 DOM

```js
// 虚拟 DOM 是一个 JS 对象，描述真实 DOM 结构
const vnode = {
  type: 'div',
  props: { class: 'container', onClick: () => {} },
  children: [
    { type: 'span', props: {}, children: 'Hello' },
    { type: 'button', props: { disabled: true }, children: 'Click' }
  ]
}
```

#### 虚拟 DOM 优缺点

```
优点：
├── 跨平台：不仅浏览器，还可用于 Native/Server
├── 避免直接操作 DOM：开发体验好，性能有保障
├── 批量更新：合并多次 DOM 操作
└── 可预判/可比较：便于 Diff 算法

缺点：
├── 内存开销：JS 对象比真实 DOM 节点大
├── 首屏渲染：需将 VNode 转为真实 DOM
└── 极端场景：直接操作 DOM 可能更快（如大量动画）
```

#### Vue 的 Patch（Diff）算法

```
Vue 3 使用 "快速路径 + 递归对比" 的策略：

1. 同级比较：只比较同一层级的节点，不跨级比较
2. 四种命中策略（从新前到旧前、从新后到旧后、新后与旧前、旧后与新前）
3. 头尾双指针向中间逼近

旧：[A, B, C, D]
新：[A, B, E, C, D]

第一步：A vs A → 命中，指针前进
旧：[A, B, C, D]  ←→
新：[A, B, E, C, D]  ←→

第二步：B vs B → 命中，指针前进
旧：[A, B, C, D]       ←
新：[A, B, E, C, D]  ←→

第三步：C vs E → 未命中
第四步：C vs C → 命中（复用节点）
第五步：D vs D → 命中

结果：只需要插入 E 节点
```

#### Vue 2 vs Vue 3 的 Diff

```
Vue 2：双端 Diff（类似上述）
Vue 3：采用最长递增子序列优化，减少移动次数

例如：
旧：[A, B, C, D, E]
新：[A, C, B, D, E]

Vue 2：可能需要多次移动
Vue 3：找出 [A, B, D, E] 的最长递增子序列 [A, B, D, E]，
      只需要把 C 移动到 B 后面即可
```

---

## 二、Vue 进阶

### Q5: 组件通信

#### 通信方式全览

| 方式 | 适用场景 | 特点 |
|------|----------|------|
| props/emit | 父子 | 强类型，单向数据流 |
| v-model | 表单父子 | 语法糖，双向绑定 |
| .sync | 父子双向 | Vue 3 已废弃，推荐 v-model |
| $attrs | 祖孙 | 包含 props 和事件 |
| provide/inject | 祖孙 | 跨级共享状态 |
| mitt/EventBus | 任意 | 事件总线，灵活但需注意清理 |
| Pinia/Vuex | 任意 | 全局状态管理 |
| ref/defineExpose | 父子 | 父调子方法 |

#### mitt 替代 EventBus

```js
// npm install mitt
import mitt from 'mitt'

// 创建mitter实例
const emitter = mitt()

// 组件 A：发射事件
emitter.emit('user-login', { id: 1, name: 'John' })

// 组件 B：监听事件
emitter.on('user-login', (payload) => {
  console.log('User logged in:', payload)
})

// 组件 C：也可监听
emitter.on('user-login', handleLogin)

// 清理（onUnmounted中）
emitter.off('user-login', handleLogin)

// 全部清除
emitter.all.clear()
```

```
mitt vs EventBus（Vue 2）：
├── mitt 更轻量（~200bytes vs ~1kb）
├── 原生 JS，不依赖 Vue
├── 支持所有事件（all Map）
└── 建议：小型项目用 mitt，大型项目用 Pinia
```

---

### Q6: 性能优化

#### v-if vs v-show

| 特性 | v-if | v-show |
|------|------|--------|
| 原理 | 条件渲染（DOM 删除/创建） | CSS display 控制 |
| 切换开销 | 高（创建/销毁） | 低（仅 CSS 切换） |
| 初始开销 | 低（不渲染则无 DOM） | 高（始终渲染） |
| 懒加载 | 支持（v-else） | 不支持 |
| 适用场景 | 条件很少改变 | 频繁切换 |

```vue
<!-- v-if: 适合条件很少改变 -->
<div v-if="isLoggedIn">
  <UserDashboard />
</div>

<!-- v-show: 适合频繁切换 -->
<Tabs v-show="activeTab === 'home'">
  <Home />
</Tabs>
```

#### computed vs methods

```js
// computed：有缓存，依赖不变时不重新计算
const fullName = computed(() => {
  console.log('computing...')  // 只执行一次
  return firstName.value + ' ' + lastName.value
})

// methods：每次调用都执行
const fullName = () => {
  console.log('computing...')  // 每次都执行
  return firstName.value + ' ' + lastName.value
}
```

#### v-memo

```vue
<!-- 只有 list 或 filter 变化时才重渲染 -->
<div v-memo="[list, filter]">
  <ExpensiveComponent v-for="item in filteredList" :key="item.id" />
</div>
```

#### 避免子组件不必要的更新

```vue
<script setup>
// 1. 使用 shallowRef / shallowReactive
const list = shallowRef([])

// 2. 使用 v-memo
<div v-memo="[searchQuery]">

// 3. defineAsyncComponent 懒加载
const AsyncChild = defineAsyncComponent(() => import('./Child.vue'))

// 4. 组件注册时加 name（可被 keep-alive 识别）
// 5. 使用 markRaw 标记不需要响应化的对象
import { markRaw } from 'vue'
const chart = markRaw(new ChartInstance())
</script>
```

---

### Q7: 自定义指令

```vue
<script setup>
// 全局指令（main.js）
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

// 或局部指令
const vFocus = {
  mounted(el) {
    el.focus()
  }
}
</script>

<template>
  <input v-focus />
</template>
```

---

### Q8: 渲染函数

```js
import { h, render, ref } from 'vue'

// h() 返回 VNode
// h(type, props, children)
const vnode = h('div', { class: 'container', onClick: handleClick }, [
  h('span', null, 'Hello'),
  h('button', { disabled: true }, 'Click')
])

// render() 将 VNode 挂载到 DOM
const container = document.getElementById('app')
render(vnode, container)
```

```
render 函数场景：
├── 需要完全动态控制 DOM 结构
├── 高级抽象组件（如 render props）
├── 性能极致优化（避免模板编译开销）
└── 通常配合 JSX 使用
```

---

## 三、TypeScript

### Q9: 泛型问题

```ts
// 问题：fetch 返回 Promise<unknown>，无法推断 T
async function fetchData<T>(url: string): T {
  return fetch(url).then(res => res.json()) // 返回 unknown
}

// 修复方案
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(res.statusText)
  return res.json() as T  // 类型断言
}

// 或使用泛型约束
async function fetchData<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json() as T)
}

// 使用
interface User { name: string; age: number }
const user = await fetchData<User>('/api/user')
```

---

### Q10: DeepReadonly 实现

```ts
type DeepReadonly<T> = T extends (infer U)[]
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends object
    ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
    : T

// 分解：
// 1. 如果 T 是数组，递归处理数组元素
// 2. 如果 T 是对象，递归处理每个属性
// 3. 否则返回 T 本身

// 测试
type X = DeepReadonly<{
  user: { name: string; hobbies: string[] }
  coords: { lat: number; lng: number }
}>

// X = {
//   readonly user: {
//     readonly name: string
//     readonly hobbies: readonly string[]
//   }
//   readonly coords: {
//     readonly lat: number
//     readonly lng: number
//   }
// }
```

---

## 四、工程化

### Q11: Vite 原理

```
Vite 核心：开发时用 ESM，生产时用 Rollup

开发模式：
├── 不打包：直接用 ESM 加载源文件
├── 按需编译：只有访问到的模块才编译
├── HMR：模块热替换，精确更新
└── 预构建：用 esbuild 将依赖转为 ESM（约 100x 更快）

原理图：
┌─────────────────────────────────────┐
│           Browser                    │
│  <script type="module" src="/src/main.js"> │
└──────────────┬──────────────────────┘
               │ ESM Import
               ▼
┌─────────────────────────────────────┐
│           Vite Dev Server           │
│  ┌──────────────────────────────┐  │
│  │  1. 改写 import              │  │
│  │     /src/main.js → /@modules/│  │
│  │  2. 编译（Vue/TS/JSX）       │  │
│  │     esbuild 极快              │  │
│  │  3. 返回 ESM                  │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

```
Webpack vs Vite：
│
├── 开发启动
│   ├── Webpack：从入口递归打包整个项目（可能 30s+）
│   └── Vite：启动即可请求（< 1s）
│
├── HMR
│   ├── Webpack：重打包相关模块（可能 1s+）
│   └── Vite：精准替换（< 100ms）
│
├── 生产构建
│   ├── Webpack：bundle（打包体积大）
│   └── Vite：code-splitting（按需加载）
│
└── 适用场景
    ├── Webpack：大型复杂项目，CSS Modules，monorepo
    └── Vite：中小型项目，Vue/React，Svelte
```

---

### Q12: CI/CD

```
前端 CI/CD 流程：
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  Code   │ →  │  Build  │ →  │  Test   │ →  │ Deploy  │
│  Push   │    │         │    │         │    │         │
└─────────┘    └─────────┘    └─────────┘    └─────────┘

典型流程：
1. 开发者 push 代码到 Git
2. CI 触发（GitHub Actions / GitLab CI / Jenkins）
3. 安装依赖（npm ci --prefer-offline 加速）
4. Lint + 单元测试 + E2E 测试
5. 构建产物（Webpack / Vite build）
6. 部署到测试环境
7. 部署到生产环境

缓存优化：
├── npm 依赖缓存：~/.npm
├── 构建产物缓存：dist/
└── 依赖锁定：package-lock.json
```

---

### Q13: 性能监控

```
Core Web Vitals：
├── FCP (First Contentful Paint)：首次内容绘制 < 1.8s
├── LCP (Largest Contentful Paint)：最大内容绘制 < 2.5s
├── CLS (Cumulative Layout Shift)：累计布局偏移 < 0.1
└── INP (Interaction to Next Paint)：交互延迟 < 200ms

触发重排/重绘的操作：
├── 重排（Reflow）：元素尺寸、位置、边框变化
│   └── offsetTop, offsetWidth, scrollTop, getComputedStyle
├── 重绘（Repaint）：外观变化但不影响布局
│   └── visibility, color, background

避免重排：
├── 使用 transform/opacity 做动画
├── 使用 flex 布局
├── 批量 DOM 操作（先隐藏，操作完再显示）
└── 使用 CSS will-change 提示浏览器
```

---

## 五、框架生态

### Q14: Vue Router

#### router.push vs replace

```js
// push：追加历史记录（可后退）
router.push('/home')
router.push({ path: '/home', query: { id: 1 } })

// replace：替换当前记录（不可后退）
router.replace('/home')
router.replace({ path: '/home', params: { id: 1 } })
```

#### 导航守卫执行顺序

```
1. 导航触发
   ↓
2. 失活的组件 beforeRouteLeave
   ↓
3. 全局 beforeEach
   ↓
4. 路由独享 beforeEnter（若有）
   ↓
5. 解析异步路由组件
   ↓
6. 激活的组件 beforeRouteEnter
   ↓
7. 全局 beforeResolve
   ↓
8. 导航确认
   ↓
9. 组件 mounted、updated
```

#### 权限控制

```js
// 路由配置
const routes = [
  {
    path: '/admin',
    component: Admin,
    meta: { requiresAuth: true, roles: ['admin'] }
  }
]

// 全局守卫
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }

  if (to.meta.roles && !to.meta.roles.includes(auth.role)) {
    return next({ path: '/403' })
  }

  next()
})
```

---

### Q15: Pinia

#### Pinia vs Vuex 4

| 特性 | Pinia | Vuex 4 |
|------|-------|--------|
| TypeScript | 原生支持 | 需要 ts 支持 |
| API | 极简 | 较复杂 |
| mutations | 无 | 有 |
| 热更新 | 支持 | 支持 |
| 体积 | ~1kb | ~4kb |
| 持久化 | 需插件 | 需插件 |

#### storeToRefs

```js
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

// 普通解构会丢失响应式
const { count, name } = counter  // ❌ 失去响应式

// storeToRefs 保持响应式
const { count, name } = storeToRefs(counter)  // ✅

// actions 不需要 storeToRefs（本身是函数）
const { increment } = counter  // ✅
```

---

### Q16: SSR/SSG

| 模式 | 适用场景 | 首屏 | SEO | 交互 |
|------|----------|------|-----|------|
| CSR | 后台系统、SPA | 慢 | 差 | 即时 |
| SSR | 电商、论坛、内容站 | 快 | 好 | 需水合 |
| SSG | 博客、文档、落地页 | 最快 | 好 | 需水合 |
| ISR | 内容站 + 频繁更新 | 快 | 好 | 需水合 |

---

## 六、实战编码

### Q17: useThrottle 实现

```ts
import { ref, onUnmounted } from 'vue'

interface ThrottleOptions {
  immediate?: boolean  // 是否立即执行
  trailing?: boolean   // 是否尾部执行
}

export function useThrottle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options: ThrottleOptions = {}
) {
  const { immediate = false, trailing = true } = options

  let timer: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null

  const throttled = (...args: Parameters<T>) => {
    if (timer) {
      lastArgs = args
      return
    }

    // 立即执行
    if (immediate) {
      fn(...args)
    }

    timer = setTimeout(() => {
      timer = null
      // 尾部执行
      if (trailing && lastArgs) {
        fn(...lastArgs)
        lastArgs = null
      }
    }, delay)
  }

  onUnmounted(() => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  })

  return throttled
}

// 使用
const handleScroll = useThrottle((event: Event) => {
  console.log('scroll', event)
}, 300, { immediate: true, trailing: true })
```

---

### Q18: v-model 组件（支持修饰符）

```vue
<script setup>
// 父组件
// <CustomInput v-model.number.trim="value" />

const props = defineProps<{
  modelValue: string | number
  modifiers?: {
    number?: boolean
    trim?: boolean
  }
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const inputRef = ref<HTMLInputElement>()

const handleInput = (event: Event) => {
  let value = (event.target as HTMLInputElement).value

  if (props.modifiers?.trim) {
    value = value.trim()
  }

  if (props.modifiers?.number) {
    value = Number(value)
  }

  emit('update:modelValue', value)
}

// 支持父组件调用 focus
defineExpose({
  focus: () => inputRef.value?.focus()
})
</script>

<template>
  <input
    ref="inputRef"
    :value="modelValue"
    @input="handleInput"
  />
</template>
```

---

### Q19: 分页列表（带 loading）

```vue
<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Item {
  id: number
  title: string
}

const items = ref<Item[]>([])
const page = ref(1)
const pageSize = ref(20)
const loading = ref(false)
const error = ref<string | null>(null)
const hasMore = ref(true)

// 防抖
const searchQuery = ref('')
const debouncedQuery = refDebounced(searchQuery, 300)

const fetchData = async () => {
  if (loading.value || !hasMore.value) return

  loading.value = true
  error.value = null

  try {
    const res = await api.getItems({
      page: page.value,
      pageSize: pageSize.value,
      query: debouncedQuery.value
    })

    if (page.value === 1) {
      items.value = res.data
    } else {
      items.value.push(...res.data)
    }

    hasMore.value = res.data.length === pageSize.value
    page.value++
  } catch (e) {
    error.value = e instanceof Error ? e.message : '加载失败'
  } finally {
    loading.value = false
  }
}

// 搜索时重置
watch(debouncedQuery, () => {
  page.value = 1
  hasMore.value = true
  fetchData()
})

// 初始加载
onMounted(() => fetchData())

// 上拉加载
const handleScroll = (e: Event) => {
  const el = e.target as HTMLElement
  const threshold = 100
  if (el.scrollHeight - el.scrollTop - el.clientHeight < threshold) {
    fetchData()
  }
}
</script>

<template>
  <div @scroll="handleScroll">
    <!-- 列表 -->
    <div v-for="item in items" :key="item.id">
      {{ item.title }}
    </div>

    <!-- Loading -->
    <div v-if="loading && items.length > 0">加载中...</div>

    <!-- Error -->
    <div v-if="error" @click="fetchData">重试</div>

    <!-- 空状态 -->
    <div v-if="!loading && items.length === 0">
      {{ error ? error : '暂无数据' }}
    </div>
  </div>
</template>
```

---

## 七、开放问题

### Q20: 你们项目的性能瓶颈在哪？怎么排查的？

```
常见性能瓶颈：
├── 首屏加载：资源过大、阻塞渲染
├── 接口响应：慢查询、未分页
├── 渲染性能：大量数据、重排重绘
├── 内存泄漏：未清理的定时器、闭包、事件监听

排查工具：
├── Chrome DevTools Performance：分析帧率、火焰图
├── Lighthouse：性能评分
├── WebPageTest：多地区测试
├── 业务埋点：自定义性能指标
└── 错误监控：Sentry
```

### Q21: 怎么设计一个可复用的组件库？

```
组件库设计原则：
├── 原子化：从最小单元开始（Button、Input、Icon）
├── 组合：复杂组件由简单组件构成
├── 一致性：统一的命名、设计语言、API 风格
├── 可定制：支持主题、Props 扩展、Slot

目录结构：
src/
├── components/
│   ├── Button/
│   │   ├── index.vue
│   │   ├── index.ts          # 导出类型
│   │   └── __tests__/
│   └── ...
├── hooks/
│   ├── useLoading.ts
│   └── useModal.ts
├── styles/
│   ├── variables.scss
│   └── reset.css
└── index.ts                  # 统一导出

发布：
├── npm 包
├── 按需加载：unplugin-vue-components
└── CDN / ESM
```

### Q22: TypeScript 在团队落地的困难点是什么？怎么解决的？

```
困难点：
├── 团队学习成本
├── any 类型滥用
├── 类型定义不完整
├── 升级破坏兼容性

解决方案：
├── 渐进式迁移：新建文件用 TS，逐步改造旧文件
├── 严格模式：从 strict: false 开始，逐步开启
├── 配置 tsconfig：noImplicitAny、strictNullChecks
├── 代码审查：禁止 @ts-ignore
├── 工具链：TypeScript 编译器 + IDE 支持
└── 文档沉淀：类型规范、最佳实践
```

---

## 评分标准

```
优秀答案特征：
├── 能说出核心原理（如 Proxy vs defineProperty）
├── 能画图/写伪代码解释（如 Diff 算法流程）
├── 能对比方案优缺点（如 v-if vs v-show）
├── 有实际项目经验（如性能优化案例）
└── 能扩展延伸（如 Vue 3 的编译器优化）

高频淘汰点：
├── 只会用不理解原理
├── 混淆 computed 和 methods
├── 不了解 HMR 原理
└── 没有工程化概念
```
