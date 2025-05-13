
let a = [1,[2,3],4];
let b = [...a];

b[1][1] = 6;
console.log(a);
console.log(b);
console.log(a[1] === b[1] ? '...是浅拷贝': '...不是浅拷贝');

// Rest properties
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x, y, z);

// let { x, ...z, b } = { x: 1, y: 2, a: 3, b: 4 };
// console.log(x, y, z);
// VM149:1 Uncaught SyntaxError: Rest element must be last element