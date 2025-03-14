import process from "node:process";
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// node process_args.mjs arg1 arg2
console.log(process.argv);

// 如果我们使用 Node.js 时，给 Node.js 本身加上了参数，并不会影响 argv。
// node --harmony process_args.mjs arg1 arg2


// 所以可以知道，我们能够放心地使用 process.argv.slice(2) 来获取所需要的参数
console.log(process.argv.slice(2));


// 这是指执行 Node.js 进程时所在的目录，而不是当前脚本文件所在的目录。注意与 __dirname (仅commonjs有) 区分。
console.log('Current Working Directory:', process.cwd());


// Get the file URL of the current module
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = path.dirname(__filename);

// cd ..   node ./process/process_args.mjs arg1 arg2
console.log('file dir:', __dirname);
