const s = 'abcd';

// The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code unit at the given index.
// charCodeAt可以获取字符的 ASCII码
console.log(s.charCodeAt(0), s.charAt(0), s.codePointAt(0));
console.log(s.charCodeAt(2), s.charAt(2), s.codePointAt(2));

const s2 = '你好世界';

// The codePointAt() method returns a non-negative integer that is the Unicode code point value at the given position
// 返回指定索引处字符的Unicode码点值。它可以正确处理由多个UTF-16码位组成的字符（如某些表情符号和特殊字符）。
console.log(s2.charCodeAt(0), s2.charAt(0), s2.codePointAt(0));
console.log(s2.charCodeAt(2), s2.charAt(2), s2.codePointAt(2));


console.log(String.fromCharCode(20320), String.fromCodePoint(20320));

console.log('*****************************');

const str2 = '😀';
console.log(str2.length);
console.log(str2.charCodeAt(0), str2.charCodeAt(1));
console.log(str2.codePointAt(0));