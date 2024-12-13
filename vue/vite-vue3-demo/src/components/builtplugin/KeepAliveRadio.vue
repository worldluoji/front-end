<template>
  <!-- https://staging-cn.vuejs.org/guide/built-ins/keep-alive.html -->
  <div>
    <label for="A"> A </label>
    <input type="radio" id="A" value="A" v-model="option" />
    <label for="B"> B </label>
    <input type="radio" id="B" value="B" v-model="option" />
    <p>current component {{ option }}</p>
    <!-- KeepAlive 可以保存动态组件的状态，即当我们切换动态组件，切回去后之前的数据还在 -->
    <KeepAlive :include="['TinyCounter']">
      <component :is="option == 'A' ? TinyCounter : TinyInputer"> </component>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TinyCounter from "./TinyCounter.vue";
import TinyInputer from "./TinyInputer.vue";
const option = ref("B"); // 使用setup组合模式，要用ref来设置模板中变量的值
</script>
