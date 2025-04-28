
let s = '!!!??!^^*@'; // 321211  连续相同的形成1位

// \1*：匹配前面捕获的组（即第一个括号内的内容）零次或多次。
let sa = s.match(/(.)\1*/g).map(x => x.length);

console.log(sa.join(''));