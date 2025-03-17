//主线程
import { Worker } from 'worker_threads';
import { Buffer } from 'node:buffer';

// 创建一个 4 字节的共享内存, SharedArrayBuffer 将直接使用全局对象中的定义，而不需要从 node:buffer 模块导入。
const sharedBuffer = new SharedArrayBuffer(4);
const buffer = Buffer.from(sharedBuffer, 0, 4); 

// 启动 Worker 线程
const worker = new Worker('./worker.mjs', { workerData: sharedBuffer });

// 每秒打印 buffer 的内容
setInterval(() => {
    console.log(buffer); 
}, 1000);