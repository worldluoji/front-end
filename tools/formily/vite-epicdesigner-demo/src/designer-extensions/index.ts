import { pluginManager } from "epic-designer"
import Test from "./test"

// 安装扩展
export function setupDesignerExtensions(): void {

     // 注册组件
     pluginManager.registerComponent(Test);
}