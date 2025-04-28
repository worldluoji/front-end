
/*
1. 模式 (?!pattern) 表示​​不匹配后面跟随指定模式的内容​​。括号内共排除 4 种模式（| 分隔）
2. .*: 匹配任意字符（除了换行符）

关键逻辑​​：从字符串的​​第一个字符开始​​，检查后续是否​​不满足排除条件​​，如果成立则匹配整个字符串。
*/
const reg = /^(?!\/(api|_next\/static|_next\/image|.*\.png$)).*/;
console.log(reg.test('/api/users'));
console.log(reg.test('/_next/static/logo.png'));
console.log(reg.test('/_next/image/img1.png'));
console.log(reg.test('/image/img1.png'));
console.log(reg.test('/dashboard'));