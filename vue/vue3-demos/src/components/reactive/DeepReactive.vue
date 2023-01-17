<script setup>
import { reactive, ref } from "vue";

// 在 Vue 中，状态都是默认深层响应式的。这意味着即使在更改深层次的对象或数组，你的改动也能被检测到。
const obj = reactive({
  nested: { count: 0 },
  arr: ["foo", "bar"],
});

const arr = ref([0]);

function mutateDeeply() {
  // 以下都会按照期望工作
  obj.nested.count++;
  obj.arr.push("fb" + obj.nested.count);
  arr.value.push(obj.nested.count);
}
</script>

<template>
  <div>
    <button @click="mutateDeeply">
      {{ obj.nested.count }}
    </button>
    <ul>
      <li v-for="(item, index) in obj.arr" :key="index">
        {{ item }}
      </li>
    </ul>
    <ul>
      <li v-for="(item, index) in arr" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
