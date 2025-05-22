# Stream
Node.js 中的 **Stream（流）** 是处理流式数据的核心抽象，尤其适合处理大文件或实时数据，避免一次性加载全部数据到内存中。以下是其关键特性详解：

---

### **1. Stream 的核心概念与优势**
- **概念**：流将数据分割成小块（chunks），按顺序处理，而不是一次性操作。
- **优势**：
  - **内存高效**：避免大文件导致内存溢出。
  - **时间效率**：数据可分块处理，无需等待全部传输完成。
  - **管道化**：多个流可连接，形成数据处理流水线。

---

### **2. 四种流类型**
| 类型          | 描述                          | 典型场景                     |
|---------------|-------------------------------|------------------------------|
| **Readable**  | 数据读取源（如文件、HTTP请求） | 读取文件、HTTP 请求体        |
| **Writable**  | 数据写入目标（如文件、HTTP响应） | 写入文件、HTTP 响应体        |
| **Duplex**    | 可读可写（双向操作）           | TCP 套接字、WebSocket        |
| **Transform** | 读写时修改或转换数据（继承自 Duplex） | 数据压缩（zlib）、加密解密   |

---

### **3. 两种模式：流动（Flowing）与暂停（Paused）**
- **流动模式**：数据自动通过事件驱动传输，使用 `data` 事件监听。
- **暂停模式**：需手动调用 `read()` 读取数据，或通过 `resume()`/`pause()` 切换模式。

```js
import { createReadStream } from 'fs';

// 流动模式 (Flowing Mode)
const readableStream = createReadStream('data.txt');
readableStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.toString());
});

// 暂停模式 (Paused Mode)
readableStream.pause();
readableStream.on('readable', () => {
  let chunk;
  while ((chunk = readableStream.read()) !== null) {
    console.log('Manual read:', chunk.toString());
  }
});
```

---

### **4. 数据管道（Pipe）与 Pipeline**
- **`pipe()` 方法**：连接可读流与可写流，自动处理背压。
  ```javascript
  import { createReadStream } from 'fs';
  fs.createReadStream('input.txt')
    .pipe(fs.createWriteStream('output.txt'));
  ```
- **`pipeline()` 方法**：更安全的管道，支持多个流串联及统一的错误处理。
  ```javascript
    import { createReadStream, createWriteStream } from 'fs';
    import { pipeline } from 'stream/promises'; // Node.js 15+

    // pipe() 示例
    const readStream = createReadStream('input.txt');
    const writeStream = createWriteStream('output.txt');
    readStream.pipe(writeStream);

    // pipeline() 示例（异步处理）
    try {
        await pipeline(
            createReadStream('input.txt'),
            transformStream, // 假设已定义的 Transform 流
            createWriteStream('output.txt')
        );
        console.log('Pipeline succeeded');
    } catch (err) {
        console.error('Pipeline failed:', err);
    }
  ```

---

### **5. 内置流的使用示例**
- **文件流**：
  ```javascript
    import { createReadStream, createWriteStream } from 'fs';

    const readStream = createReadStream('largefile.txt', { encoding: 'utf8' });
    const writeStream = createWriteStream('copy.txt');

    readStream.pipe(writeStream);
  ```
- **HTTP 流**：
  ```javascript
    import { createServer } from 'http';

    const server = createServer(async (req, res) => {
        // 将请求数据直接写入响应
        req.pipe(res);
    });

    server.listen(3000, () => {
        console.log('Server running on port 3000');
    });
  ```

---

### **6. 错误处理**
- **监听 `error` 事件**：避免未捕获错误导致进程崩溃。
  ```javascript
  stream.on('error', (err) => {
    console.error('Stream error:', err);
  });
  ```
- **管道中的错误传播**：使用 `pipeline()` 可自动传递错误。

---

### **7. 自定义流**
通过继承对应类并实现特定方法：
- **自定义可读流**：
  ```javascript
    import { Readable } from 'stream';

    class ESMReadable extends Readable {
        constructor(options) {
            super(options);
            this.count = 0;
        }

        _read(size) {
            if (this.count++ < 5) {
            this.push(`Data chunk ${this.count}\n`);
            } else {
            this.push(null); // 结束流
            }
        }
    }

    const myReadable = new ESMReadable();
    myReadable.pipe(process.stdout);
  ```
- **自定义转换流**：
  ```javascript
  import { Transform } from 'stream';
  class UpperCaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
      this.push(chunk.toString().toUpperCase());
      callback();
    }
  }
  ```

---

### **8. 背压（Back Pressure）机制**
- **问题**：当写入速度慢于读取速度时，数据积压可能导致内存飙升。
- **解决方案**：
  - `pipe()` 自动处理：可写流通过返回 `false` 通知可读流暂停读取，待 `drain` 事件恢复。
  - 手动控制：
    ```javascript
    if (!writableStream.write(chunk)) {
      readableStream.pause(); // 暂停读取
      writableStream.once('drain', () => readableStream.resume());
    }
    ```

---

### **9. 实际应用场景**
- **大文件处理**：如视频转码、日志分析。
- **实时数据处理**：聊天应用、传感器数据流。
- **数据转换**：使用 `Transform` 流进行压缩（zlib）、加密（crypto）。

---

### **10. 性能与最佳实践**
- **减少中间操作**：尽量通过管道直接连接流，避免多次读写。
- **使用对象模式**：处理非 Buffer/String 类型的数据（如对象流）：
  ```javascript
  const objectStream = new Readable({ objectMode: true });
  ```
- **利用异步迭代器**（Node.js 10+）：
  ```javascript
  for await (const chunk of readableStream) {
    console.log(chunk);
  }
  ```

---

### **总结**
Node.js 的 Stream API 通过分块处理、管道连接和背压控制，为高效处理 I/O 密集型任务提供了强大支持。无论是内置模块（如 `fs`、`http`、`zlib`）还是自定义数据流水线，流都是优化性能与资源管理的核心工具。