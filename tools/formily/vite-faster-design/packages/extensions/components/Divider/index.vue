<template>
    <nut-divider>{{ attrs.text || ''}}</nut-divider>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>