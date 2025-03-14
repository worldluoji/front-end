import { fork } from 'child_process';

// fork 允许我们创建一个 worker 子进程，它具有 Node.js 内置的消息机制
const worker = fork('./worker.mjs');

// 向子进程发送消息
worker.send('Hello from parent');

// 监听子进程发送的消息
worker.on('message', (message) => {
  console.log('Received from worker:', message);
});

// 监听子进程的退出事件
worker.on('exit', (code) => {
  console.log(`Worker exited with code ${code}`);
});
