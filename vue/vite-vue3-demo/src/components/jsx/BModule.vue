<template>
    <div class="masking">
        <div class="l-dialog">
            {{ p.params.text }}
        </div>
    </div>
</template>

<script setup lang="ts">
const p = defineProps<{
    params: any
}>()
</script>

<style scoped>
.masking {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .3);
}

.l-dialog {
    width: 200px;
    height: 150px;
    text-align: center;
    margin: auto;
}
</style>