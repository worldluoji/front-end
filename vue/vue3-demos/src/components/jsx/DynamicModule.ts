
import { createApp, h } from 'vue';

// import ModuleComponent from './AModule';
import ModuleComponent from './BModule.vue';

// 实现动态渲染组件的过程
export const createModule = () => {
  // 创建动态节点DOM
  const dom = document.createElement('div');
  // 把 DOM 追加到页面 body标签里. as HTMLBodyElement
  const body = document.querySelector('body') as HTMLBodyElement;
  body.appendChild(dom);
  
  let module1: any;

  // 返回当前组件的操作实例, 其中封装了挂载和卸载组件的方法
  return {
    open: (params: any) => {
      console.log('open...');
      module1 = createApp({
        render() {
          return h(ModuleComponent, { params: params });
        }
      });
      // 把组件 ModuleComponent 作为一个独立应用挂载在 DOM 节点上
      module1.mount(dom);
    },
    close: () => {
      console.log('close...');
      // 卸载组件
      module1.unmount();
      // 销毁动态节点
      dom.remove();
    }
  };
};