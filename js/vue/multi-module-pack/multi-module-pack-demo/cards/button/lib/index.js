import RButton from './RButton'

// 通过 Vue.use(Button) 使用组件，按需导入
RButton.install = function (Vue) {
  Vue.component(RButton.name, RButton);
};

export default RButton