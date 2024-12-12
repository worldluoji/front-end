
let a = [1,[2,3],4];
let b = [...a];

b[1][1] = 6;
console.log(a);
console.log(b);
console.log(a[1] === b[1] ? '...是浅拷贝': '...不是浅拷贝');