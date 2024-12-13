import { defineComponent } from 'vue';

// 用 JSX 语法实现一个Vue.js 3.x的组件
const ModuleComponent = defineComponent({
  setup(props, context) {
    return () => {
      return (
        <div>这是一个动态渲染的组件</div>
      );
    };
  }
});

export default ModuleComponent;