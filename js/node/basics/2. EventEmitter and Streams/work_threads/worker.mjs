import process from 'node:process';

// 监听父进程发送的消息
process.on('message', (msg) => {
    console.log('Worker received message:', msg);
    // 向父进程发送消息
    process.send('Hello from worker');
});
  
// 向父进程发送初始消息
process.send('Worker is ready');