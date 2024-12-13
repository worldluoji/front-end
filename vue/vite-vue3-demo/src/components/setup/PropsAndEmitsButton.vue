<template>
  <button
    :style="{ color: color, 'border-radius': borderRadius }"
    @click="change()"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
// defineProps无法设置默认值，可以使用withDefaults包裹
interface Props {
  color?: string;
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "red",
  text: "Click Me",
});
console.log(props.color);

// 子组件调用父组件的方法使用defineEmits
const emit = defineEmits<{
  (e: "change", text: string): void;
}>();

const languages = ["TypeScript", "Java", "Golang"];
const change = () => {
  emit("change", "Hello " + languages[Math.floor(3 * Math.random())]);
};

const borderRadius = ref("10%");
const changeBorderRadius = (val: string) => {
  borderRadius.value = val;
};
// 通过defineExpose暴露方法，父组件通过模板 ref 的方式获取到当前组件的实例
defineExpose({
  changeBorderRadius,
});
</script>
