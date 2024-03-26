<template>
  <!-- <sl-button size="small" variant="primary">Click me</sl-button> -->
  <Render :schema="schema" />
</template>

<script setup lang="ts">
import Render from './components/Render.vue';
import { ref } from 'vue';
const schema = ref({});
schema.value = {
  version: "1.0.0",
  librarys: [],
  i18n: {
    zh: {},
    eu: {},
  },
  store: {},
  dataSource: {},
  lifeCycles: {},
  htmlBody: {
    "root": {
      "type": {
        "resolvedName": "Container"
      },
      "css": {
        "width": "100vw",
        "height": "100vh",
        "paddingTop": 20,
        "paddingBottom": 20,
        "paddingLeft": 20,
        "paddingRight": 20,
        "background": "#FFFFFF",
        "display": "flex",
        "border": "1px solid black",
        "align-items": "center",
        "justify-content": "center"
      },
      "props": {
        
      },
      "displayName": "基础容器",
      "custom": {},
      "hidden": false,
      "nodes": [
        "rpVYvatknx"
      ],
      "linkedNodes": {}
    },
    "rpVYvatknx": {
      "type": {
        "resolvedName": "sl-button"
      },
      "css": {},
      "props": {
        size: "small",
        variant: "primary"
      },
      "displayName": "按钮",
      "custom": {},
      "parent": "root",
      "hidden": false,
      "nodes": ["textsflsfdsf"],
      "linkedNodes": {}
    },
    "textsflsfdsf": {
      "type": {
        "resolvedName": "Text"
      },
      "css": {},
      "props": {
        v: 'click me'
      },
      "displayName": "文字",
      "custom": {},
      "parent": "rpVYvatknx",
      "hidden": false,
      "nodes": [],
      "linkedNodes": {}
    }
  }
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
</style>
