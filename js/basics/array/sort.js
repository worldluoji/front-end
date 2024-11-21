
function detectEnvironment() {
    if (typeof window !== 'undefined') {
      return 'Web';
    } else if (typeof global !== 'undefined' && typeof process !== 'undefined' && process.versions && process.versions.node) {
      return 'Node';
    } else {
      return 'Unknown';
    }
}
  

// sort直接改变原数组，toSored不改变原数组，返回排序后的数组
let a = [ { x:1 }, { x:-1 }, { x:0 }];
a.sort((n1, n2) => n1.x - n2.x);

console.log(a);


let b = [];
let en = detectEnvironment();
if (en === 'Web') {
    b = a.toSorted((n1, n2) => n2.x - n1.x);
} else if (en === 'Node') {
    // Node环境目前没有toSorted方法，可以通过解构来实现
    b = [...a].sort((n1, n2) => n2.x - n1.x);
}


console.log(b);
console.log(a);


let c = [10, 2, 3, 8, 1, 10, 4];
c.sort();
console.log(c); // [1, 10, 10, 2, 3, 4, 8]

c.sort((n1, n2) => n1 - n2);
console.log(c); // [1, 2, 3, 4, 8, 10, 10]