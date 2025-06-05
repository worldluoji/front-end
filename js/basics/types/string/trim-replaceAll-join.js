const reverseWords = (s) => {
  let str = s.trim();
  str = str.replaceAll(/ +/g, ' ');
  let strs = str.split(' ');
  return strs.reverse().join(' ');
};

let na = 'Jack';
let s = `  hello world     ${na} `;

console.log(reverseWords(s));