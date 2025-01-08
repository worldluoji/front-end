import { pluginManager, type PublicMethodModel } from 'epic-designer'

const methodItem: PublicMethodModel = {
    name: "myFun",
    handler: ()=>{
        alert('myFun 被调用了')
    },
    describe: "这是一个测试函数描述"
}


export function setupPublicMethod(): void {
  pluginManager.addPublicMethod(methodItem)  
}