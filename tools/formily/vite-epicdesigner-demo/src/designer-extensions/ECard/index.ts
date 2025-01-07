import { type ComponentConfigModel } from "epic-designer";

export default {
  component: async () => await import("./index.vue"),
  groupName: "自定义控件",
  icon: "icon-chukusaomiao",
  defaultSchema: {
    label: "虚拟电子卡",
    type: "ECard",
    componentProps: {},
  },
  config: {
    attribute: [
      {
        label: "初始金额",
        type: "input",
        field: "componentProps.initMoney",
      },
    ],
  },
} as ComponentConfigModel;
