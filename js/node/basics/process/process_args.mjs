import process from "node:process";

// node process_args.mjs arg1 arg2
console.log(process.argv);

// 如果我们使用 Node.js 时，给 Node.js 本身加上了参数，并不会影响 argv。
// node --harmony process_args.mjs arg1 arg2


// 所以可以知道，我们能够放心地使用 process.argv.slice(2) 来获取所需要的参数
console.log(process.argv.slice(2));
