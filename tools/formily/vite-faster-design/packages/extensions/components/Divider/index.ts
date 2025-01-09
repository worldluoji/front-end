import { type ComponentConfigModel } from "epic-designer";

export default {
  component: async () => await import("./index.vue"),
  groupName: "布局",
  icon: "icon-chukusaomiao",
  defaultSchema: {
    label: "分割线",
    type: "Divider",
    componentProps: {},
  },
  config: {
    attribute: [
      {
        label: "是否虚线",
        type: "select",
        componentProps: {
          options: [
            {
              label: "是",
              value: true,
            },
            {
              label: "否",
              value: false,
            },
          ],
          placeholder: "请选择",
        },
        field: "componentProps.dashed",
      },
      {
        label: "内容",
        type: "input",
        field: "componentProps.text",
      },
    ],
  },
} as ComponentConfigModel;
