
let str = 'hello buffer';

let b = Buffer.from(str, 'utf8');

console.log(b.toString('utf8'));