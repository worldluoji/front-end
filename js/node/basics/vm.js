const vm = require('vm');  
  
// 创建一个虚拟机上下文  
const context = { x: 1 };  
vm.createContext(context);  
  
// 在虚拟机上下文中执行代码  
const code = 'x += 40; var y = 17;';  
vm.runInContext(code, context);  
  
// 访问虚拟机上下文中的变量  
console.log(context.x); // 输出：41  
console.log(context.y); // 输出：17