<template>
  <p>{{ content }}</p>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class extends Vue {
  public content = "This is Foo page";
}
</script>
