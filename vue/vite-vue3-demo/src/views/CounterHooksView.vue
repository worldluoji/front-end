<template>
  <div @click="increment">{{ count }}</div>
</template>
  
<script setup lang="ts">
import useCounter from '../hooks/useCounter.ts';
const { count, increment } = useCounter(10);
</script>
  