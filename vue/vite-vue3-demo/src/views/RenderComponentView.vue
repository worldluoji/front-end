<template>
  <div class="myrender">
    <RenderComponent content="Using h() function to render this page..." />
    <JSXComponent username="渣渣灰" />
  </div>
</template>

<script setup lang="ts">
import RenderComponent from "@/components/render/RenderComponent.vue";
import JSXComponent from "@/components/render/JSXComponent.vue";
</script>
