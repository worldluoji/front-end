
/**
在 JavaScript 中，字符串的字典序比较可以使用全局函数 localeCompare 实现。该函数返回一个整数，表示两个字符串在字典序上的比较结果。
如果第一个字符串按字典序在第二个字符串之后，返回正数；如果两个字符串相等，则返回 0；否则返回负数。

localeCompare is used as follows:

string1.localeCompare(string2, [locales], [options])

Parameters:
string2 – The string to compare against.

locales (optional) – The language locale (e.g., "en", "es", "de"). Defaults to the system locale if not provided.

options (optional) – An object configuring the comparison behavior.
*/

console.log('bcd'.localeCompare('abcde'));

/**
    "upper" – Uppercase letters come first.

   "lower" – Lowercase letters come first.

    "false" – Follows locale-specific sorting. 
 */
console.log("a".localeCompare("B", "es", { caseFirst: "upper" })); // 1 ('B' comes before 'a')
console.log("a".localeCompare("B", "es", { caseFirst: "lower" })); // -1 ('a' comes before 'B')


// Ensures correct order for strings containing numbers.
console.log("archivo10".localeCompare("archivo2", "es", { numeric: true })); // 1 ('archivo2' comes before 'archivo10')
console.log("archivo10".localeCompare("archivo2", "es", { numeric: false })); // -1 (default behavior)

console.log('3'.includes(3)); // true

console.log('24'.endsWith(4));
console.log('24'.startsWith(2));

console.log('25\r\n '.trim());