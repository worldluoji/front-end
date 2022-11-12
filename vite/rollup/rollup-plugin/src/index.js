import { a } from 'module-a';
// alias插件做了替换，module-a会被替换为./module-a.js

console.log(a);

const b = __TEST__;
console.log(b);