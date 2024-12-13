<template>
    <div @click="increment">{{ count }}</div>
  </template>
  
  <script setup>
  import useCounter from '@/hooks/useCounter.ts';
  const { count, increment } = useCounter(10);
  </script>
  