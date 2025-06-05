
const a = ['123', 'hello', 456];

const jsonString = JSON.stringify(a);

console.log(jsonString, typeof jsonString);

const r = JSON.parse(jsonString);

console.log(r);