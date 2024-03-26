<template>
  <Node :node-id="'root'" :schema="p.schema"/>
</template>

<script setup lang="ts">
import { ISchema } from '../types/schema';
import Node from './Node.vue';

const p = defineProps<{
  schema: ISchema;
}>();

</script>