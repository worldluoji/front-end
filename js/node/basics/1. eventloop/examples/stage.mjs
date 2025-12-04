import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import * as http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 事件循环的六个阶段演示
console.log("🎯 开始事件循环演示...");

// 阶段1: timers（定时器）
setTimeout(() => {
    console.log("⏰ Timer阶段执行 - setTimeout");
}, 0);

// 阶段2: pending callbacks（系统操作回调）
process.nextTick(() => {
    console.log("🚀 nextTick - 在事件循环各阶段之间执行");
});

// 阶段3: idle, prepare（内部使用）
// 阶段4: poll（检索新的I/O事件）
fs.readFile(__filename, () => {
    console.log("📁 Poll阶段 - 文件读取完成");
});

// 阶段5: check（setImmediate）
setImmediate(() => {
    console.log("✅ Check阶段 - setImmediate");
});

// 阶段6: close callbacks（关闭事件回调）
const server = http.createServer();
server.on('close', () => {
    console.log("🔒 Close阶段 - 服务器关闭");
});

console.log("🎪 主线程执行完成，事件循环开始...");