<template>
  <div>
    <!-- 使用注册名动态渲染组件 -->
    <component :is="view" />
    <!-- 渲染 HTML 元素 -->
    <component :is="href ? 'a' : 'span'">123</component>
  </div>
</template>

<script lang="ts">
import Foo from "./Fooo.vue";
import Bar from "./Bar.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Foo,
    Bar,
  },
})
export default class DynamicComponent2 extends Vue {
  public view = "Foo";
  public href = "c";
}
</script>
