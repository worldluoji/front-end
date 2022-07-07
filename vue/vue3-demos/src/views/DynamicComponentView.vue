<template>
  <div class="dynamc-component">
    <DynamicComponent1 view="0.6" />
    <DynamicComponent2 />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// @ is an alias to /src
import DynamicComponent1 from "@/components/dynamiccomponents/DynamicComponent1.vue";
import DynamicComponent2 from "@/components/dynamiccomponents/DynamicComponent2.vue";

@Options({
  components: {
    DynamicComponent2,
    DynamicComponent1,
  },
})
export default class DynamicComponentView extends Vue {}
</script>
