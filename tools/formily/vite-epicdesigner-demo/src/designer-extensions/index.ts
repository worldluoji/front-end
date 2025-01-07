import { pluginManager } from "epic-designer"
import Test from "./test"
import { setupPublicMethod } from './script/index'

// 安装扩展
export function setupDesignerExtensions(): void {

     // 注册组件
     pluginManager.registerComponent(Test);

     // 注册公共方法
     setupPublicMethod();
}