
/* 在 JavaScript 中，字符串的字典序比较可以使用全局函数 localeCompare 实现。该函数返回一个整数，表示两个字符串在字典序上的比较结果。
如果第一个字符串按字典序在第二个字符串之后，返回正数；如果两个字符串相等，则返回 0；否则返回负数。*/

console.log('bcd'.localeCompare('abcde'));

console.log('3'.includes(3)); // true