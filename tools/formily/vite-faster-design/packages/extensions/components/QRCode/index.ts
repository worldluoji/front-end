import { type ComponentConfigModel } from "epic-designer";

export default {
  component: async () => await import("./index.vue"),
  groupName: "自定义",
  icon: "icon-fastdesignerweima",
  defaultSchema: {
    label: "二维码",
    type: "QRCode",
    componentProps: {},
  },
  config: {
    attribute: [
      {
        label: "尺寸",
        type: "input",
        field: "componentProps.size",
      },
      {
        label: "内容",
        type: "input",
        field: "componentProps.text",
      },
    ],
  },
} as ComponentConfigModel;
