<template>
    <nut-image :src="attrs.url || ''" width=100 height=100 />
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>