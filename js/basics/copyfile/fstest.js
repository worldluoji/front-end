// copyFile
// fs有copyFile和copyFileSync方法，其中output路径不存在会报错

// const fse = require('fs');
// fse.copyFileSync(input, output);
// 1
// 2
// copy
// fse有copy和copySync方法，其中output路径不存在，可以自动创建路径，并完成复制

// const fse = require('fs-extra');
// fse.copySync(input, output);

const fse = require('fs-extra');
fse.copySync('./a.txt', './b.txt');

fse.copySync('./a', './c');