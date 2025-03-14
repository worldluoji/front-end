import process from "node:process";

// node process_stdin.mjs > output.txt < input.txt

process.stdin.setEncoding('utf8');
let inputData = '';

// process.stdin 是一个可读流（Readable Stream）
process.stdin.on('data', (chunk) => {
    inputData += chunk;
});

process.stdin.on('end', () => {
    console.log('Input data:', inputData);
    // 在这里处理输入数据
});