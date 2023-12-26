const reverseWords = (s) => {
  let str = s.trim();
  str = str.replaceAll(/ +/g, ' ');
  let strs = str.split(' ');
  return strs.reverse().join(' ');
};

s = "  hello world     you ";

console.log(reverseWords(s));