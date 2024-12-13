<!-- https://staging-cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#script-setup -->
<script setup>
import { effect, reactive, ref, nextTick } from "vue";

const state = reactive({ count: 0 });

function increment() {
  state.count++;
  counter.num1++;
  // 你得注意 DOM 的更新并不是同步的。相反，Vue 将缓冲它们直到更新周期的 “下个时机” 以确保无论你进行了多少次声明更改，每个组件都只需要更新一次。
  // 若要等待一个状态改变后的 DOM 更新完成，你可以使用 nextTick() 这个全局 API
  nextTick(() => {
    // 访问更新后的 DOM
    console.log("Dom更新完毕");
  });
}

const counter = reactive({ num1: 1, num2: 2 });
let dummy = ref(0);
// 当counter.num1或者counter.num2改变，effect中的方法就会执行，从而更新dummy
// 在 effect 中获取 counter.num1 和 counter.num2 的时候，就会触发 counter 的 get 拦截函数；get 函数，会把当前的 effect 函数注册到一个全局的依赖地图中去。这样 counter.num1 在修改的时候，就会触发 set 拦截函数，去依赖地图中找到注册的 effect 函数，然后执行。
effect(() => {
  dummy.value = counter.num1 + counter.num2;
  console.log(dummy.value); // 每次counter.num1修改都会打印日志
});
</script>

<template>
  <div>
    <p>{{ dummy }}</p>
    <button @click="increment">
      {{ state.count }}
    </button>
  </div>
</template>
