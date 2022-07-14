<template>
    <div class="re-left-side">
      <button class="btn" @click="send">Button</button>
      <div v-if="show">
        <teleport to="main">
          <JButton />
        </teleport>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import JButton from './cards/JButton.vue'
const show = ref(false)
const send = () => {
  show.value = true
}
</script>

<style>
  .re-left-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
