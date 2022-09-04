import t from "./t.json5"
// 这里import进来的t已经被插件解析为js中的对象
let p = document.getElementById('content')
p.innerText = t.lineBreaks