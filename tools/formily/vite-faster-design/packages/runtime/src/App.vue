<template>
  <div>
    <EBuilder :pageSchema="pageSchema" />
  </div>
</template>
<script lang="ts" setup>
import { EBuilder } from "epic-designer"

const pageSchema = {
  schemas: [
    {
      type: "page",
      id: "root",
      children: [
        {
          label: "输入框",
          type: "input",
          field: "input",
          icon: "epic-icon-write",
          input: true,
          componentProps: {
            defaultValue: "",
            placeholder: "请输入",
            size: "default",
            type: "text",
          },
          id: "gbm1xhrrj5s00",
        },
        {
          "label": "二维码",
          "type": "QRCode",
          "componentProps": {
            "size": "200",
            "text": "https://cn.bing.com/"
          },
          "id": "QRCode_nez2ppym"
        }
      ],
      componentProps: {
        style: {
          padding: "16px",
        },
      },
    },
  ],
};
</script>