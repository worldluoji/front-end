<template>
  <div class="dynamc-component">
    <DynamicComponent1 :view="0.6" />
    <DynamicComponent2 />
    <hr>
  </div>
</template>

<script setup lang="ts">
import DynamicComponent1 from "@/components/dynamiccomponents/DynamicComponent1.vue";
import DynamicComponent2 from "@/components/dynamiccomponents/DynamicComponent2.vue";
</script>
