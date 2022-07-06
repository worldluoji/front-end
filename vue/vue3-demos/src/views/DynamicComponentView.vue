<template>
  <div class="dynamc-component">
    <DynamicComponent2 />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// @ is an alias to /src
import DynamicComponent2 from "@/components/dynamiccomponents/DynamicComponent2.vue";

@Options({
  components: {
    DynamicComponent2,
  },
})
export default class DynamicComponentView extends Vue {}
</script>
