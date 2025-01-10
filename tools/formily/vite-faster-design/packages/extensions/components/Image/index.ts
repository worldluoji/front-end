import { type ComponentConfigModel } from "epic-designer";

export default {
  component: async () => await import("./index.vue"),
  groupName: "自定义",
  icon: "",
  defaultSchema: {
    label: "图片",
    type: "Image",
    componentProps: {
        height: 100,
        width: 100
    },
  },
  config: {
    attribute: [
      {
        label: "地址",
        type: "input",
        field: "componentProps.url",
      },
      {
        label: "宽度",
        type: "number",
        field: "componentProps.width",
      },
      {
        label: "高度",
        type: "number",
        field: "componentProps.height",
      },
    ],
  },
} as ComponentConfigModel;
