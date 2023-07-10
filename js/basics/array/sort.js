

let a = [ { x:1 }, { x:-1 }, { x:0 }];
a.sort((n1, n2) => n1.x - n2.x);

console.log(a);