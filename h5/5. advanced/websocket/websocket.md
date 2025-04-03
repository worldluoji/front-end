# websocket
关于HTML中的WebSocket技术，以下是详细解析：

### 一、WebSocket核心概念
1. **协议本质**
   - 基于TCP的全双工通信协议（RFC 6455）
   - 工作端口：80（ws://） / 443（wss://）
   - 协议标识符：`ws`（非加密）或`wss`（SSL加密）

2. **与传统HTTP对比**
   ```mermaid
   graph LR
     A[HTTP] -->|短连接| B[每次请求新建TCP]
     C[WebSocket] -->|长连接| D[单连接复用]
     E[HTTP] -->|单向通信| F[客户端主动]
     G[WebSocket] -->|双向通信| H[服务端可主动推送]
   ```

3. **技术优势**
   - 低延迟：无HTTP头开销（基础帧头仅2字节）
   - 高吞吐：持久连接避免重复握手
   - 实时性：服务端可主动推送数据

### 二、浏览器端实现
1. **API基础用法**
   ```javascript
   // 创建连接
   const socket = new WebSocket('wss://echo.websocket.org');

   // 事件监听
   socket.onopen = () => {
     socket.send('Hello Server!');
   };
   
   socket.onmessage = (event) => {
     console.log('Received:', event.data);
   };
   
   socket.onerror = (error) => {
     console.error('Error:', error);
   };
   
   socket.onclose = () => {
     console.log('Connection closed');
   };
   ```

2. **协议升级过程**
   ```http
   GET /chat HTTP/1.1
   Host: server.example.com
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
   Sec-WebSocket-Version: 13

   HTTP/1.1 101 Switching Protocols
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
   ```

3. **消息帧结构**
   ```
   0                   1                   2                   3
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-------+-+-------------+-------------------------------+
   |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
   |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
   |N|V|V|V|       |S|             |   (if payload len==126/127)   |
   | |1|2|3|       |K|             |                               |
   +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
   |     Extended payload length continued, if payload len == 127  |
   + - - - - - - - - - - - - - - - +-------------------------------+
   |                               |Masking-key, if MASK set to 1  |
   +-------------------------------+-------------------------------+
   | Masking-key (continued)       |          Payload Data         |
   +-------------------------------- - - - - - - - - - - - - - - - +
   :                     Payload Data continued ...                :
   + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
   |                     Payload Data continued ...                |
   +---------------------------------------------------------------+
   ```

### 三、关键开发技巧
1. **二进制数据传输**
   ```javascript
   // 发送ArrayBuffer
   const buffer = new ArrayBuffer(128);
   socket.send(buffer);

   // 接收二进制数据
   socket.binaryType = 'arraybuffer';
   socket.onmessage = (e) => {
     if (e.data instanceof ArrayBuffer) {
       const view = new DataView(e.data);
       // 处理二进制数据
     }
   };
   ```

2. **心跳机制实现**
   ```javascript
   let heartbeatInterval;

   socket.onopen = () => {
     // 每30秒发送心跳
     heartbeatInterval = setInterval(() => {
       if (socket.readyState === WebSocket.OPEN) {
         socket.send(JSON.stringify({type: 'ping'}));
       }
     }, 30000);
   };

   socket.onclose = () => {
     clearInterval(heartbeatInterval);
   };
   ```

3. **自动重连策略**
   ```javascript
   let reconnectAttempts = 0;

   function connect() {
     const socket = new WebSocket(url);
     
     socket.onclose = (e) => {
       const delay = Math.min(++reconnectAttempts, 30) * 1000;
       setTimeout(connect, delay);
     };
   }
   ```

### 四、性能优化方案
1. **消息压缩**
   ```javascript
   // 服务端启用permessage-deflate扩展
   const socket = new WebSocket('wss://example.com', [
     'permessage-deflate; client_max_window_bits'
   ]);
   ```

2. **带宽控制**
   ```javascript
   // 动态调整发送频率
   let sendInterval = 100;
   setInterval(() => {
     if (socket.bufferedAmount === 0) {
       sendData();
       sendInterval = Math.max(50, sendInterval - 10);
     } else {
       sendInterval = Math.min(1000, sendInterval + 50);
     }
   }, sendInterval);
   ```

3. **多路复用**
   ```javascript
   // 使用单个连接传输多路数据
   function createChannel(type) {
     return {
       send: (data) => socket.send(JSON.stringify({
         channel: type,
         payload: data
       }))
     };
   }

   const chatChannel = createChannel('chat');
   const gameChannel = createChannel('game');
   ```

### 五、安全防护措施
1. **身份验证方案**
   ```javascript
   // 连接时携带Token
   const socket = new WebSocket(`wss://example.com?token=${authToken}`);

   // 或通过首条消息认证
   socket.onopen = () => {
     socket.send(JSON.stringify({
       action: 'auth',
       token: authToken
     }));
   };
   ```

2. **DDOS防护**
   ```javascript
   // 客户端限流处理
   let lastSendTime = 0;
   function safeSend(data) {
     if (Date.now() - lastSendTime > 100) {
       socket.send(data);
       lastSendTime = Date.now();
     }
   }
   ```

3. **消息校验**
   ```javascript
   socket.onmessage = (e) => {
     try {
       const msg = JSON.parse(e.data);
       if (!validateSchema(msg)) {
         socket.close(1008, 'Invalid message format');
       }
     } catch (err) {
       socket.close(1007, 'Invalid payload');
     }
   };
   ```

### 六、调试与监控
1. **Chrome DevTools 分析**
   - Network面板查看WebSocket帧
   - 实时消息内容审查
   - 连接状态跟踪

2. **性能指标监控**
   ```javascript
   const metrics = {
     totalMessages: 0,
     dataReceived: 0,
     latencyHistory: []
   };

   socket.onmessage = (e) => {
     metrics.totalMessages++;
     metrics.dataReceived += e.data.size;
     metrics.latencyHistory.push(Date.now() - e.timeStamp);
   };
   ```

3. **错误追踪**
   ```javascript
   socket.onerror = (error) => {
     Sentry.captureException(new Error(`WS Error: ${error.message}`), {
       extra: {
         readyState: socket.readyState,
         url: socket.url
       }
     });
   };
   ```

### 七、服务端配合示例（Node.js）
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // 广播消息
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.send('Welcome to WebSocket Server!');
});
```

WebSocket为现代Web应用提供了真正的实时通信能力，但在使用时需要注意：
1. 合理设计消息协议（建议使用protobuf等二进制格式）
2. 做好连接状态管理
3. 实施严格的安全策略
4. 监控网络状况和资源使用
5. 考虑备选方案（如SSE）兼容老旧浏览器

实际开发中建议结合Socket.IO等成熟库，它们已处理了以下问题：
- 自动重连
- 心跳检测
- 协议降级（长轮询备用）
- 房间/命名空间管理
- 二进制支持优化