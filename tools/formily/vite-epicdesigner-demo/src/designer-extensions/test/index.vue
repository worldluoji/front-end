<template>
    <div class="container">
        <p>我是一个扩展模块</p>
        <p>组件id: {{ checkedNode?.id }}</p>
    </div>
</template>
<script lang="ts" setup>
import { inject, computed } from 'vue'
import { type Designer } from 'epic-designer'
const designer = inject('designer') as Designer

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