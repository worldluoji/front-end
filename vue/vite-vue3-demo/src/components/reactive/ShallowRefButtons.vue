<template>
    <div class="container">
      <p>用户信息: {{ user.name }} - {{ user.age }}</p>
      <button @click="updateName">更新名字</button>
      <button @click="updateAge">更新年龄</button>
      <button @click="updateView">更新视图</button>
    </div>
</template>
  
<script setup lang="ts">
  import { shallowRef, triggerRef } from 'vue';
  
  // 使用 shallowRef 创建一个浅层响应式的引用
  const user = shallowRef({
    name: '张三',
    age: 25,
  });
  
  // 更新对象内部的属性
  const updateName = () => {
    user.value.name = '李四';
  };
  
  // 替换整个对象会触发视图更新
  const updateAge = () => {
    user.value.age = 30;
  };

  const updateView = () => {
    // 手动触发视图更新
    triggerRef(user);
  };
</script>

<style scoped>
  .container {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>