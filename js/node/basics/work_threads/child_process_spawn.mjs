import { spawn } from 'child_process';

// 通过 spawn() 启动另一个 Node.js 进程来执行  myScript.js 脚本。
const child = spawn('node', ['myScript.js']);

// 监听子进程的标准输出
child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

// 监听子进程的退出事件
child.on('exit', (code) => {
  console.log(`child process exited with code ${code}`);
});