const componentsContext = require.context('./', true, /\.js$/)
const components = {}

const formatContext = function () {
  // components.keys() => ['./button/index.js', './card/index.js', './index.js']
  componentsContext.keys().forEach(key => {
    // 为当前目录 不处理
    if (key === './index.js') { return }
    // 获取导入的组件module
    const component = componentsContext(key).default
    const { name } = component
    // components => { RButton: xxx, ... }
    components[name] = component
  })
}

const install = function (Vue) {
  for (const name in components) {
  // 将组件绑定到Vue上
    Vue.component(name, components[name])
  }
}

formatContext()

export default {
  install,
  ...components
}