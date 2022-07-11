<!-- 暂时无法使用script setup的形式 https://github.com/vuejs/rfcs/discussions/321 -->
<script lang="ts">
import { h } from "vue";

export default {
  props: {
    content: { type: String, required: true },
  },
  setup(props) {
    const vNode = h(
      "div",
      { id: "foo", style: { "background-color": "green" } },
      ["hello render", h("p", props.content)]
    );
    // 返回渲染函数
    return () => vNode;
  },
};
</script>
