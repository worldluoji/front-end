<template>
  <div class="selfdefined-derective">
    <FocusLocal />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// @ is an alias to /src
import FocusLocal from "@/components/directives/FocusLocal.vue";

@Options({
  components: {
    FocusLocal,
  },
})
export default class SelfDefinedDirectiveView extends Vue {}
</script>
