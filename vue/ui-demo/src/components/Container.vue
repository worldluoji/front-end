<template>
  <section class="el-container" :class="{ 'is-vertical': isVertical }">
    <slot />
  </section> 
</template>

<script lang="ts">
export default {
  name:'ElContainer'
}
</script>
<script setup lang="ts">

import {useSlots, computed, VNode, Component} from 'vue'

interface Props {
  direction?:string
}
const props = defineProps<Props>()

const slots = useSlots()

// 子元素中有 ElHeader 或 ElFooter 时为 vertical，否则看direction是否是vertical
const isVertical = computed(() => {
  if (slots && slots.default) {
    return slots.default().some((vn:VNode) => {
      const tag = (vn.type as Component).name
      return tag === 'ElHeader' || tag === 'ElFooter'
    })
  } else {
    return props.direction === 'vertical'
  }
})
</script>

<style lang="scss" scoped>
@import '../styles/mixin.scss';
@include b(container) {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  @include when(vertical) {
    flex-direction: column;
  }
}
</style>

<!-- 
    UI参考：https://e3.shengxinjing.cn/#/component/container
    上面的代码，我们使用 b(container) 生成.el-container 样式类，
    在内部使用 when(vertical)生成.el-container.is-vertical 样式类，去修改 flex 的布局方向 
-->