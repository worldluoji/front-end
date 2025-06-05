let s = 'abcd';
s[1] = 'e'; // useless because js string is immutable
console.log(s); // abcd

s = `${s.slice(0, 1)}e${s.slice(2)}`;
console.log(s);

let newS = [...s];
newS[1] = 'f';
console.log(newS.join(''));