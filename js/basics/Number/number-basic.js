
console.log(Number.isInteger(3), Number.isInteger(3.0));

console.log(Number.isNaN(NaN), Number.isNaN(3));

console.log(Number.isFinite(Infinity));

// isSageInteger在超过了最大最小值范围时，会返回false, 其余和isInteger一样
console.log(Number.isSafeInteger(9007199254740991)); // true
console.log(Number.isSafeInteger(9007199254740992)); // false

console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.MAX_VALUE * 2); // Infinity
console.log(Number.MIN_VALUE); // 5e-324
console.log(Number.MIN_VALUE / 2); // 0
console.log(-Number.MAX_VALUE * 2); // -Infinity