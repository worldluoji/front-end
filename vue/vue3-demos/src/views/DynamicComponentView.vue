<template>
  <div class="dynamc-component">
    <DynamicComponent1 :view="0.6" />
    <DynamicComponent2 />
    <hr>
    <DynamicComponent3 />
  </div>
</template>

<script setup lang="ts">
// @ is an alias to /src
import DynamicComponent1 from "@/components/dynamiccomponents/DynamicComponent1.vue";
import DynamicComponent2 from "@/components/dynamiccomponents/DynamicComponent2.vue";
import DynamicComponent3 from "@/components/dynamiccomponents/DynamicComponent3.vue";

</script>
