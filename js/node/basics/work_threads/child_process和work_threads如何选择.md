# child_process和work_threads如何选择
在 Node.js 中，`child_process` 和 `worker_threads` 都是用于并行处理的模块，但它们的适用场景不同：

### **1. `child_process`（子进程）**
**适用场景：**
- **运行独立的程序或脚本**：需要执行外部命令、Shell 脚本或非 Node.js 程序（如 Python/Rust 等）。
- **高隔离性需求**：子进程拥有独立的内存和资源，崩溃不会影响主进程。
- **多进程架构**：利用多核 CPU（每个进程绑定一个 CPU 核心）。
- **长时间运行的任务**：如后台服务、定时任务等。
- **需要完整操作系统资源**：如独立的端口、文件描述符等。

**常用 API：**
- `child_process.spawn()`：流式处理大量数据（如日志处理）。
- `child_process.exec()`：执行简单命令并获取输出。
- `child_process.fork()`：启动新的 Node.js 进程（自带 IPC 通信）。

**示例：**
```javascript
const { fork } = require('child_process');
const child = fork('heavy-task.js');
child.send({ data: input }); // 通过 IPC 通信
```

---

### **2. `worker_threads`（工作线程）**
**适用场景：**
- **CPU 密集型任务**：如图像处理、数学计算等需要阻塞主线程的操作。
- **共享内存需求**：通过 `SharedArrayBuffer` 高效共享数据（避免 IPC 序列化开销）。
- **轻量级并行**：线程比进程更轻量，启动更快，内存占用更低。
- **避免阻塞事件循环**：将耗时任务转移到工作线程，保持主线程响应性。
- **同进程内任务**：所有线程共享同一个 Node.js 进程和 V8 实例。

**常用 API：**
- `new Worker(filePath)`：创建线程。
- `parentPort.postMessage()`：线程间通信。
- `worker.terminate()`：终止线程。

**示例：**
```javascript
const { Worker } = require('worker_threads');
const worker = new Worker('./cpu-task.js', { workerData: input });
worker.on('message', result => console.log(result));
```

---

### **关键区别**
| **特性**               | `child_process`                 | `worker_threads`              |
|------------------------|---------------------------------|-------------------------------|
| **隔离性**             | 高（独立进程）                  | 低（共享进程内存）            |
| **启动开销**           | 高（复制内存）                  | 低（轻量级线程）              |
| **通信开销**           | 高（IPC 需序列化）              | 低（可共享内存）              |
| **适用任务**           | 跨程序/高隔离任务               | CPU 密集型/同进程任务         |
| **资源占用**           | 高（独立 V8 实例）              | 低（共享 V8 实例）            |
| **崩溃影响**           | 子进程崩溃不影响主进程          | 线程崩溃可能导致整个进程退出  |

---

### **选择建议**
- **用 `child_process` 当：**
  - 需要调用外部程序或脚本。
  - 任务需要完全隔离（如安全沙盒）。
  - 利用多核 CPU 运行独立进程。

- **用 `worker_threads` 当：**
  - 需要加速 Node.js 内部的 CPU 密集型任务。
  - 需要高效共享内存（如大数据处理）。
  - 避免进程创建开销，追求更高性能。

> **注意**：I/O 密集型任务（如网络请求）通常不需要二者，直接用异步 I/O 即可。