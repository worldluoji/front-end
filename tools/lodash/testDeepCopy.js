import _ from 'lodash';
let originalObject = { a: 1, b: { c: 2 } };
let copiedObject = _.cloneDeep(originalObject);

console.log(copiedObject); // { a: 1, b: { c: 2 } }

copiedObject.b.c = 3;

console.log(copiedObject);
console.log(originalObject);