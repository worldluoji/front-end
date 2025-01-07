<template>
    <div class="container">
        <p>我是一个扩展模块</p>
        <p>组件id: {{ checkedNode?.id }}</p>
        <p>组件placement: {{ attrs?.placement }}</p>
    </div>
</template>
<script lang="ts" setup>
import { inject, computed, useAttrs } from 'vue'
import { type Designer } from 'epic-designer'
const designer = inject('designer') as Designer

// useAttrs() 返回的是一个响应式的引用（ref），这意味着当父组件传递给子组件的非 prop 属性发生变化时，attrs 也会相应地更新
// 配置文件index.ts里的配置，会自动绑定到attrs上（也就是组件的props属性）
let attrs = useAttrs()
console.log(1, attrs)

// 可以从designer.state里面取到选中的组件的配置的值
console.log(111, designer);
const checkedNode = computed(() => {
    return designer.state.checkedNode
})
</script>

<style scoped>
.container {
    padding: 4px 2px;
}
</style>