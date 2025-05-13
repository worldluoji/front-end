import { readFile, readFileSync } from 'fs';
import { createServer, connect } from 'net';

// timers → pending callbacks → poll → check → close callbacks

let lastTick = Date.now();


function logWithTick(message) {
  const now = Date.now();
  console.log(`[轮次间隔: ${now - lastTick}ms] ${message}`);
  lastTick = now;
}

// 微任务（如 Promise.then、queueMicrotask）和 process.nextTick() 的优先级高于宏任务。
Promise.resolve().then(() => {
  logWithTick('Microtask: Promise.then');
});

process.nextTick(() => {
  logWithTick('NextTick');
});

// 延迟其他异步操作以确保 nextTick 优先执行，setTimeout(fn, 0)宏任务 在下一个 timers 阶段执行，但受当前阶段任务和 I/O 完成时间影响。
setTimeout(() => {
  logWithTick('Timeout 0');

  // 1. timers 阶段
  setTimeout(() => {
    logWithTick('Timeout 1');
  }, 0);

  // 2. pending callbacks 阶段：主要处理某些系统级别的异步错误回调（如 TCP 连接错误）。
  const client = connect({ port: 8089 }, () => {
    logWithTick('Connected (成功连接)');
  });

  // TCP 错误回调的触发依赖系统底层通知，可能延迟到下一轮事件循环的 pending callbacks 阶段。其他异步操作（如 setImmediate、server.close）占用了当前轮次的后续阶段，导致 pending callbacks 被推迟。
  client.on('error', (err) => {
    logWithTick('Pending callback (TCP 错误)');
  });
  
  // 4. poll 阶段： 处理 I/O 回调（如 fs.readFile 的成功或失败回调）。
  readFile('test-file.txt', () => {
    logWithTick('Poll phase: File read');
    setImmediate(() => {
      logWithTick('Check phase inside Poll');
    });
  });

  // 5. check 阶段：处理setImmediate的回调。
  setImmediate(() => {
    logWithTick('Check phase');
  });

  // 6. close callbacks 阶段：处理资源关闭的回调
  // server.close() 的回调在 当前轮次的 close callbacks 阶段 执行。2. readFile 的异步操作 未能在当前轮次完成，导致其回调延迟到下一轮事件循环的 poll 阶段执行
  const server = createServer().listen(8080, () => {
    server.close(() => {
      logWithTick('Close callback');
    });
  });
}, 0);