<template>
    <div class="epic-designer-container">
      <EDesigner @save="handleSubmit" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { EDesigner, type PageSchema } from "epic-designer";
  
  /**
   * 点击保存按钮操作
   * @param e
   */
  function handleSubmit(e:PageSchema) {
    console.log(e);
  }
  </script>
  
  <style>
  .epic-designer-container {
    width: 100%;
    height: 800px;
    border: 1px solid var(--epic-border-color);
  }
  </style>