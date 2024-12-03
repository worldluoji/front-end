import parser from '@babel/parser';

const code = `function square(n) {
  return n * n;};`
const result = parser.parse(code)
console.log(result);