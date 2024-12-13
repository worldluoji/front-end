<template>
  <div class="reactive">
    <ReactiveButton />
    <hr />
    <DeepReactive />
    <hr />
    <ComputedCheckBoxVue />
  </div>
</template>

<script setup lang="ts">
import ReactiveButton from "@/components/reactive/ReactiveButton.vue"
import DeepReactive from "@/components/reactive/DeepReactive.vue"
import ComputedCheckBoxVue from "@/components/reactive/ComputedCheckBox.vue"
</script>