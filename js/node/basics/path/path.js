
const path = require('path')

console.log(__dirname)

console.log(path.resolve(__dirname, 'test'))

console.log('1:', path.join('folder1', 'folder2', 'folder3'));
console.log('2:', path.join('folder1', './folder2', '/folder3'));
console.log('3:', path.join('folder1', '/folder2', '../../folder3'));
console.log('----------');
console.log('4:', path.resolve('folder1', 'folder2', 'folder3'));
console.log('5:', path.resolve('folder1', './folder2', '/folder3'));
console.log('6:', path.resolve('folder1', '/folder2', '../../folder3'));

/**
* path.join 是简单拼接路径，遇到..就返回上一级, 遇到 ., ./, /都一视同仁拼接当前路径
* path.resolve 是从左到右，每遇到一个参数，就跟你进行cd目录操作一样!
*/