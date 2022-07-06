<template>
  <p>页面载入时，input 元素自动获取焦点：</p>
  <input v-focus />
</template>

<!-- <script lang="ts">
import { Vue } from "vue-class-component";

const focus = {
  mounted: (el) => el.focus(),
};

export default class Focus extends Vue {
  public directives = { focus };
}
</script> -->
<script>
const focus = {
  mounted: (el) => el.focus(),
};

export default {
  directives: {
    // 在模板中启用 v-focus
    focus,
  },
};
</script>
