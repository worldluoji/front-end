# sendBeacon
这是一个使用 `navigator.sendBeacon()` API 在前端发送数据的示例，特别适用于在页面卸载（如关闭标签页、刷新页面、导航到新页面）时可靠地发送数据（如日志、分析数据、表单状态等）。

**核心概念：**

1.  **`navigator.sendBeacon(url, data)`**:
    *   `url`: 数据要发送到的服务器端点 URL。
    *   `data`: 要发送的数据。可以是 `Blob`, `ArrayBuffer`, `ArrayBufferView`, `FormData`, `URLSearchParams`, `ReadableStream`, 或 **`string`**。
    *   返回值：`true` 表示浏览器成功地将数据排队等待发送（即使页面立即卸载也会发送）；`false` 表示失败（通常是由于数据大小限制或 URL 无效）。

2.  **典型使用场景**：监听 `visibilitychange` 或 `pagehide` 事件（比 `unload` 或 `beforeunload` 更现代和可靠），在页面状态变为 `hidden` 或即将卸载时发送数据。

**示例代码：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>sendBeacon 示例</title>
</head>
<body>
    <h1>页面活动跟踪</h1>
    <p>尝试关闭标签页、刷新页面或导航到其他网站。</p>
    <button id="trackButton">手动触发跟踪事件</button>

    <script>
        // 1. 定义要发送的数据和端点 URL
        const analyticsEndpoint = 'https://your-api-server.com/collect'; // 替换为你的实际API地址
        let sessionData = {
            userId: 'user123',
            page: window.location.href,
            startTime: Date.now(),
            events: [] // 可以收集页面上的交互事件
        };

        // 示例：记录一个按钮点击事件（实际应用中可能更复杂）
        document.getElementById('trackButton').addEventListener('click', function() {
            sessionData.events.push({
                type: 'button_click',
                elementId: 'trackButton',
                timestamp: Date.now()
            });
            console.log('记录了一个按钮点击事件');
        });

        // 2. 处理页面卸载/隐藏的函数
        function sendSessionData() {
            // 添加结束时间
            sessionData.endTime = Date.now();
            sessionData.duration = sessionData.endTime - sessionData.startTime;

            // 将数据转换为字符串（JSON格式是常见选择）
            const dataToSend = JSON.stringify(sessionData);

            // 3. 使用 sendBeacon 发送数据
            const success = navigator.sendBeacon(analyticsEndpoint, dataToSend);

            if (success) {
                console.log('数据已成功排队等待发送（sendBeacon）');
            } else {
                console.error('使用 sendBeacon 发送数据失败。可能数据太大？');
                // 可以考虑在这里使用 fallback 机制（如同步 XHR - 谨慎使用，影响体验）
            }
        }

        // 4. 添加事件监听器（最佳实践：使用 pagehide 和 visibilitychange）
        // 优先使用 pagehide (支持性好，是 unload 的现代替代)
        window.addEventListener('pagehide', sendSessionData);

        // 同时监听 visibilitychange 以确保页面变为隐藏状态时也能发送（例如切换到其他App或最小化浏览器）
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'hidden') {
                sendSessionData();
            }
        });

        // (可选) 如果需要在页面正常浏览时也定期发送数据（非卸载场景），可以使用其他方法（如 fetch）
    </script>
</body>
</html>
```

**关键点解释：**

1.  **数据准备**：示例中定义了一个 `sessionData` 对象来收集信息（用户 ID、页面 URL、开始时间、事件列表）。在实际应用中，你会收集更相关的数据（如点击事件、滚动深度、表单填写状态等）。
2.  **数据序列化**：`sendBeacon` 的 `data` 参数需要是支持的格式。最常见的是将 JavaScript 对象转换成 JSON 字符串 (`JSON.stringify()`) 发送。
3.  **发送数据**：调用 `navigator.sendBeacon(endpoint, dataString)`。它返回一个布尔值表示是否成功将数据加入发送队列。
4.  **事件监听**：
    *   `pagehide`：当会话历史条目即将被更改（用户导航离开或关闭页面）时触发。**这是 `unload` 事件的现代替代品，更可靠。**
    *   `visibilitychange` + `document.visibilityState === 'hidden'`：当页面被隐藏时触发（例如用户切换到另一个标签页、最小化浏览器窗口或锁屏）。这对于移动端或 SPA 尤其重要，因为用户可能只是切换 App 而没有真正关闭页面。**监听这个事件可以更早地捕获用户离开页面的意图。**
5.  **Fallback (未在示例中实现)**：如果 `sendBeacon` 返回 `false`（通常是因为数据太大超出浏览器限制），你可能需要一个备选方案。一个常见的（但影响体验的）备选是在 `pagehide` 或 `visibilitychange` 事件中使用**同步的 `XMLHttpRequest`**（`xhr.open('POST', url, false)`）。**警告：同步 XHR 会阻塞页面卸载过程，可能导致不良的用户体验（浏览器可能会警告用户“页面正在阻止关闭”），应仅在 `sendBeacon` 失败且数据极其重要时谨慎使用。** 更好的做法是尽量控制发送数据的大小。

**使用 `sendBeacon` 的优势：**

*   **可靠性**：浏览器保证在页面卸载的情况下也会尝试发送请求。
*   **异步非阻塞**：不会延迟页面的卸载或导航到新页面，提供更好的用户体验（不像同步 XHR）。
*   **简单易用**：API 非常简洁。

**注意事项：**

*   **数据大小限制**：浏览器对通过 `sendBeacon` 发送的数据大小有限制（通常在几十 KB 到几百 KB 级别）。如果数据过大，`sendBeacon` 会返回 `false`。尽量只发送关键数据。
*   **HTTP 方法**：`sendBeacon` 总是使用 **POST** 方法发送请求。
*   **请求头**：`Content-Type` 对于字符串数据通常是 `text/plain;charset=UTF-8`。如果你想发送 JSON 并让服务器识别为 `application/json`，你需要使用 `Blob`：
    ```javascript
    const dataBlob = new Blob([JSON.stringify(sessionData)], { type: 'application/json; charset=UTF-8' });
    navigator.sendBeacon(analyticsEndpoint, dataBlob);
    ```
*   **无响应处理**：`sendBeacon` 是“发送后不管”的。你无法获取 HTTP 响应状态码或响应体。它只保证请求被发送出去。
*   **浏览器支持**：现代浏览器广泛支持 `sendBeacon`。对于非常旧的浏览器（如 IE），你需要使用 fallback（如同步 XHR）。

将这个示例中的 `https://your-api-server.com/collect` 替换为你实际接收数据的服务器端点 URL。服务器端需要能够处理接收到的 POST 请求和解析其中的数据（通常是 JSON）。

https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon