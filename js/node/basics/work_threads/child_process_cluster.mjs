import { isMaster, fork, on } from 'cluster';
import { createServer } from 'http';
import { cpus } from 'os';

/* fork 创建的工作进程可以很好地分配 CPU 资源。
 * 但有时候，我们又需要在进程间共享一些资源，比如网络端口号，这就要用到另一种创建子进程的方案——cluster。
 * 
 * cluster.fork() 的关键点
    共享端口：所有工作进程共享同一个端口（本例中为 8000）。这是由 cluster 模块内部处理的。

    负载均衡：主进程会自动将传入的连接（例如 HTTP 请求）分配到工作进程中。这是由操作系统自动完成的。

    容错性：如果某个工作进程崩溃，主进程可以通过 exit 事件检测到，并创建一个新的工作进程来替换它。

    可扩展性：通过为每个 CPU 核心创建一个工作进程，您可以充分利用硬件资源。
**/

const numCPUs = cpus().length; // 获取系统的 CPU 核心数

if (isMaster) {
  // 如果是主进程，创建与 CPU 核心数相等的工作进程
  console.log(`Master process is running on PID: ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    fork(); // 启动一个子进程
  }

  // 监听工作进程退出事件
  on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // 如果是工作进程，创建一个 HTTP 服务器
  createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello from worker process!\n');
  }).listen(8000);

  console.log(`Worker process started with PID: ${process.pid}`);
}