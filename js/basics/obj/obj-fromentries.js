const entries = new Map([
    ['foo', 'bar'],
    ['baz', 42],
]);
console.log(entries);
  
const obj = Object.fromEntries(entries);
  
console.log(obj);


const entries2 = new Map();
entries2.set('foo', 'bar');
entries2.set('baz', 42);
const obj2 = Object.fromEntries(entries2);
console.log(obj2);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries