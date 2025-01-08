import { pluginManager } from "epic-designer"
import { setupPublicMethod } from './script/index.js'

import QRCode from './components/QRCode'

// 安装扩展
export function setupDesignerExtensions(): void {
     // 注册组件
     pluginManager.registerComponent(QRCode)

     // 注册公共方法
     setupPublicMethod()
}