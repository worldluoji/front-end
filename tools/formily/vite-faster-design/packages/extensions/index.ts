import { pluginManager } from "epic-designer"
import { setupPublicMethod } from './script/index.js'

// 安装扩展
export function setupDesignerExtensions(): void {
     // ipmort组件后，再注册组件
     // pluginManager.registerComponent(Test)

     // 注册公共方法
     setupPublicMethod()
}