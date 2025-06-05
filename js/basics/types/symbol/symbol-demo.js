const sym1 = Symbol('description');
const sym2 = Symbol('description');
console.log(sym1 === sym2); // false

const ID = Symbol('id');
const user = {
    name: 'Alice',
    [ID]: '123'
}
user.age = 18;
console.log(user.name, user.age, user[ID]); // Alice 18 123
console.log('**********************');


for(let key in user){
    console.log(key, user[key]);
}

console.log('**********************');


// 防止属性名冲突
function extendObject(obj) {
    const uniqueKey = Symbol('extension');
    obj[uniqueKey] = 'Extension data';
    return obj;
}


const symbolKeys = Object.getOwnPropertySymbols(user);
console.log(symbolKeys); // [Symbol(id)]
console.log(user[symbolKeys[0]]); // '123'
