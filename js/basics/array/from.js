
const n = 6;
let a = Array.from({length: n})
            .map((e, i) => ' '
            .repeat(i) + 'I');

console.log(a);

let b = [1,2,3,4];
a = Array.from([...b, 5, 6]);
console.log(a);

let set = new Set();
set.add(8);
set.add(9);
a = Array.from(set);
console.log(a);