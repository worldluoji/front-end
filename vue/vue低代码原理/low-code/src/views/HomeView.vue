<template>
  <MainLayout />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainLayout from '@/components/MainLayout.vue' // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    MainLayout
  }
})
</script>
