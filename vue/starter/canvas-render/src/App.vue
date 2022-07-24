<template>
<div @click="setName('vue3真棒')" :pos="[10,10,300,300]" fill="#eee">
    <h1 :pos="[20,20,200,100]" fill="red" color="#000">累加器{{count}}</h1>
    <span :pos="pos" fill="black" >Hello {{name}}</span>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const name = ref('vue3入门')
const pos = ref([20, 120, 200, 100])
const count = ref(1)
const setName = (n: string) => {
  name.value = n
  pos.value[1] += 20
  count.value += 2
}
</script>
