import { methodA } from "./module-a.js"
methodA()

/*
如果在 Node.js 环境中，你可以在package.json中声明type: "module"属性:

// package.json
{
  "type": "module"
}
然后 Node.js 便会默认以 ES Module 规范去解析模块:

node main.js
// 打印 a
*/