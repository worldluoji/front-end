import { type ComponentConfigModel } from 'epic-designer'

export default {
  component: async () => await import('./index.vue'),
  groupName:"自定义组件",
  icon: "epic-icon-write",
  defaultSchema: {
    label: '测试扩展组件',
    type: 'test',
    componentProps: {
    }
  },
  config: {
    attribute: [
      {
        label: '属性1',
        type: 'input',
        field: 'name'
      }
    ]
  }
} as ComponentConfigModel