import { workerData } from 'worker_threads';

// 连接到共享内存
const sharedView = new Int32Array(workerData);

// 每秒计数器加 1
setInterval(() => {
    sharedView[0]++;
}, 1000);