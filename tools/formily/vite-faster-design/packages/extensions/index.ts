import { pluginManager } from "epic-designer"
import { setupPublicMethod } from './script/index.js'

// 定义组件模块的类型
interface ComponentModule {
     default: any;
}

const components = import.meta.glob<ComponentModule>('./components/**/*.ts', { eager: true })

// 安装扩展
export function setupDesignerExtensions(): void {
     // 注册组件
     Object.entries(components).forEach(([_, module]) => {
          pluginManager.registerComponent(module.default)
     });

     // 注册公共方法
     setupPublicMethod()
}