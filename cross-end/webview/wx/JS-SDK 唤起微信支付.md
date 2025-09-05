# JS-SDK 唤起微信支付

微信官方 JS-SDK 只能在微信内置浏览器中运行。它提供了访问微信原生功能的接口，但这些功能在非微信环境中不可用。

下面是一个演示页面，展示如何检测运行环境并使用微信 JS-SDK：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>微信 JS-SDK 环境检测</title>
    <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4efe9 100%);
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        header {
            background: linear-gradient(45deg, #07C160, #05a855);
            color: white;
            padding: 30px;
            text-align: center;
        }
        h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 600;
        }
        .subtitle {
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 30px;
        }
        .card {
            background: #f9f9f9;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 25px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        h2 {
            font-size: 20px;
            color: #07C160;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e0e0e0;
        }
        .status {
            display: flex;
            align-items: center;
            margin: 15px 0;
            padding: 15px;
            border-radius: 10px;
            background: white;
        }
        .icon {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-right: 15px;
            flex-shrink: 0;
        }
        .success {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        .error {
            background-color: #ffebee;
            color: #c62828;
        }
        .warning {
            background-color: #fff3e0;
            color: #ef6c00;
        }
        .info {
            background-color: #e3f2fd;
            color: #1565c0;
        }
        .status-content {
            flex: 1;
        }
        .status-title {
            font-weight: 600;
            margin-bottom: 5px;
        }
        .api-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .api-item {
            background: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            border-left: 4px solid #07C160;
        }
        .api-name {
            font-weight: 600;
            margin-bottom: 8px;
            color: #07C160;
        }
        .try-button {
            background: #07C160;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 20px;
            transition: all 0.3s;
            display: inline-block;
        }
        .try-button:hover {
            background: #05a855;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(7, 193, 96, 0.3);
        }
        .try-button:disabled {
            background: #cccccc;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #eee;
        }
        .code {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 15px 0;
            font-family: 'Consolas', monospace;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>微信官方 JS-SDK 环境检测</h1>
            <p class="subtitle">检测当前浏览器环境并演示微信 JS-SDK 功能</p>
        </header>

        <div class="content">
            <div class="card">
                <h2>环境检测结果</h2>
                <div id="wechatStatus" class="status">
                    <div class="icon">⏳</div>
                    <div class="status-content">
                        <div class="status-title">检测中...</div>
                        <div>正在检测当前浏览器环境</div>
                    </div>
                </div>
                <div id="sdkStatus" class="status">
                    <div class="icon">⏳</div>
                    <div class="status-content">
                        <div class="status-title">检测中...</div>
                        <div>正在检测微信 JS-SDK 可用性</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <h2>微信 JS-SDK 功能演示</h2>
                <p>以下功能只能在微信内置浏览器中使用：</p>
                
                <div class="api-list">
                    <div class="api-item">
                        <div class="api-name">微信支付</div>
                        <div>调用原生支付界面完成支付</div>
                    </div>
                    <div class="api-item">
                        <div class="api-name">分享功能</div>
                        <div>自定义分享到朋友圈/好友</div>
                    </div>
                    <div class="api-item">
                        <div class="api-name">地理位置</div>
                        <div>获取用户精确地理位置</div>
                    </div>
                    <div class="api-item">
                        <div class="api-name">扫一扫</div>
                        <div>调用原生扫码界面</div>
                    </div>
                </div>

                <button id="tryButton" class="try-button" disabled>尝试调用 SDK 功能</button>
                
                <div class="code">
// 微信 JS-SDK 使用示例<br>
wx.ready(function() {<br>
&nbsp;&nbsp;// 配置微信分享<br>
&nbsp;&nbsp;wx.updateAppMessageShareData({<br>
&nbsp;&nbsp;&nbsp;&nbsp;title: '分享标题',<br>
&nbsp;&nbsp;&nbsp;&nbsp;desc: '分享描述',<br>
&nbsp;&nbsp;&nbsp;&nbsp;link: 'https://example.com',<br>
&nbsp;&nbsp;&nbsp;&nbsp;imgUrl: 'https://example.com/logo.png'<br>
&nbsp;&nbsp;});<br>
<br>
&nbsp;&nbsp;// 初始化支付功能<br>
&nbsp;&nbsp;document.getElementById('payButton').addEventListener('click', function() {<br>
&nbsp;&nbsp;&nbsp;&nbsp;wx.chooseWXPay({<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timestamp: 1710000000,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nonceStr: '随机字符串',<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;package: 'prepay_id=wx...',<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signType: 'RSA',<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;paySign: '签名'<br>
&nbsp;&nbsp;&nbsp;&nbsp;});<br>
&nbsp;&nbsp;});<br>
});
                </div>
            </div>

            <div class="card">
                <h2>解决方案</h2>
                <div class="status info">
                    <div class="icon">💡</div>
                    <div class="status-content">
                        <div class="status-title">非微信环境下的备选方案</div>
                        <div>如果需要在非微信环境中实现支付功能，可以使用微信H5支付，它会跳转到微信支付页面</div>
                    </div>
                </div>
                
                <div class="code">
// 环境检测代码示例<br>
function isWeixinBrowser() {<br>
&nbsp;&nbsp;return /MicroMessenger/i.test(navigator.userAgent);<br>
}<br>
<br>
// 根据环境选择支付方式<br>
if (isWeixinBrowser()) {<br>
&nbsp;&nbsp;// 使用 JS-SDK 支付<br>
&nbsp;&nbsp;wx.chooseWXPay({ ... });<br>
} else {<br>
&nbsp;&nbsp;// 使用 H5 支付跳转<br>
&nbsp;&nbsp;window.location.href = 'https://pay.weixin.qq.com/...';<br>
}
                </div>
            </div>
        </div>

        <footer>
            <p>© 2023 微信 JS-SDK 演示页面 | 注意：所有功能必须在微信内置浏览器中运行</p>
        </footer>
    </div>

    <script>
        // 检测是否在微信环境中
        function isWeixinBrowser() {
            const ua = navigator.userAgent.toLowerCase();
            return ua.indexOf('micromessenger') !== -1;
        }

        // 检测微信 JS-SDK 是否可用
        function isWeixinSDKAvailable() {
            return typeof wx !== 'undefined' && typeof wx.ready === 'function';
        }

        // 更新状态显示
        function updateStatus(elementId, type, title, message) {
            const statusEl = document.getElementById(elementId);
            statusEl.innerHTML = `
                <div class="icon ${type}">${type === 'success' ? '✓' : type === 'error' ? '✗' : type === 'warning' ? '⚠' : 'ℹ'}</div>
                <div class="status-content">
                    <div class="status-title">${title}</div>
                    <div>${message}</div>
                </div>
            `;
            statusEl.className = `status ${type}`;
        }

        // 初始化检测
        document.addEventListener('DOMContentLoaded', function() {
            // 检测微信环境
            if (isWeixinBrowser()) {
                updateStatus('wechatStatus', 'success', '微信环境检测成功', '当前运行在微信内置浏览器中');
                
                // 检测微信 JS-SDK
                if (isWeixinSDKAvailable()) {
                    updateStatus('sdkStatus', 'success', '微信 JS-SDK 可用', '可以使用微信提供的各种接口功能');
                    document.getElementById('tryButton').disabled = false;
                } else {
                    updateStatus('sdkStatus', 'error', '微信 JS-SDK 不可用', '请确保已正确引入微信 JS-SDK 或升级微信版本');
                }
            } else {
                updateStatus('wechatStatus', 'error', '非微信环境', '微信 JS-SDK 只能在微信内置浏览器中运行');
                updateStatus('sdkStatus', 'warning', '功能受限', '当前环境无法使用微信 JS-SDK 功能');
            }

            // 尝试调用 SDK 功能
            document.getElementById('tryButton').addEventListener('click', function() {
                if (isWeixinBrowser() && isWeixinSDKAvailable()) {
                    alert('正在调用微信 JS-SDK 功能...');
                    // 这里可以实际调用某个 SDK 功能
                }
            });
        });
    </script>
</body>
</html>
```

## 关键说明

### 微信 JS-SDK 的限制

1. **环境限制**：只能在微信内置浏览器中运行
2. **功能依赖**：需要微信客户端支持，不同版本微信支持程度不同
3. **配置要求**：使用前需要通过微信公众号后台配置安全域名

### 使用微信 JS-SDK 的基本步骤

1. 引入 JS-SDK 文件：
   ```html
   <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
   ```

2. 通过后端接口获取配置参数：
   ```javascript
   wx.config({
     debug: false,
     appId: '公众号APPID',
     timestamp: 时间戳,
     nonceStr: '随机字符串',
     signature: '签名',
     jsApiList: ['需要使用的JS接口']
   });
   ```

3. 在 ready 回调中使用功能：
   ```javascript
   wx.ready(function() {
     // 在这里调用微信接口
   });
   ```

### 非微信环境的解决方案

在非微信环境中，可以使用微信 H5 支付作为备选方案：

```javascript
if (isWeixinBrowser()) {
  // 使用 JS-SDK 支付
  wx.chooseWXPay({ ... });
} else {
  // 使用 H5 支付跳转
  window.location.href = 'https://pay.weixin.qq.com/...';
}
```

这个演示页面包含了环境检测、状态显示和解决方案，您可以直接在浏览器中打开查看效果。