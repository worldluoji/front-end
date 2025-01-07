import { type ComponentConfigModel } from "epic-designer";

export default {
  component: async () => await import("./index.vue"),
  groupName: "自定义控件",
  icon: "icon-chukusaomiao",
  defaultSchema: {
    label: "测试扩展组件",
    type: "test",
    componentProps: {},
  },
  config: {
    attribute: [
      {
        label: "被修改",
        type: "select",
        componentProps: {
          options: [
            {
              label: "bottomLeft",
              value: "bottomLeft",
            },
            {
              label: "bottomRight",
              value: "bottomRight",
            },
            {
              label: "topLeft",
              value: "topLeft",
            },
            {
              label: "topRight",
              value: "topRight",
            },
          ],
          placeholder: "请选择",
        },
        field: "componentProps.placement",
      },
      {
        label: "格式",
        type: "input",
        field: "componentProps.valueFormat",
        onChange: (el: any) => {
          console.log(el);
          console.log(el.componentAttributes.value[1].componentProps.options);
          el.componentAttributes.value[1].label = "lk33kk";

          el.componentAttributes.value[1] = {
            label: "被修改33",
            type: "input",
            componentProps: {
              options: [
                {
                  label: "bottomRight",
                  value: "bottomRight",
                },
                {
                  label: "topLeft",
                  value: "topLeft",
                },
                {
                  label: "topRight",
                  value: "topRight",
                },
              ],
              placeholder: "请选择22",
            },
            field: "componentProps.placement",
          };
        },
      },
    ],
  },
} as ComponentConfigModel;
