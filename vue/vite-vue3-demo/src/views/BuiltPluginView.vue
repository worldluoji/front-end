<template>
  <div class="dynamc-component">
    <KeepAliveRadio />
    <hr />
    <div class="outer">
      <OriginModal />
    </div>
    <div class="outer">
      <TeleportModal />
    </div>
  </div>
</template>

<script setup lang="ts">
import KeepAliveRadio from "@/components/builtplugin/KeepAliveRadio.vue";
import OriginModal from "@/components/builtplugin/OriginModal.vue";
import TeleportModal from "@/components/builtplugin/TeleportModal.vue";
</script>

<style scoped>
.outer {
  margin-top: 3px;
}
</style>
