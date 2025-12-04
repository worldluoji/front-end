import { readFile } from 'fs';
import { promisify, callbackify } from 'util';

// fs.readFile('./package.json', function callback(err, buf) {
//   const obj = JSON.parse(buf.toString('utf8'))
//   console.log(obj.name) // 'Example' -> package.json 包名
// })

// 将 fs.readFile() 转换为一个接受相同参数但返回 Promise 的函数。
const readFileAsync = promisify(readFile)

readFileAsync('./promisify and callbackify.md').then(res => {
  console.log(res.toString());
})

async function fn() {
  return 'hello callbackify';
}

const callbackFunction = callbackify(fn);

callbackFunction((err, ret) => {
  if (err) {
    throw err;
  }
  console.log(ret);
});