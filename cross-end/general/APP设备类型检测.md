# APP设备类型检测
在 WebView 中加载的 H5 页面可以通过 JavaScript 来检测用户所使用的设备类型，包括 iOS、Android 和鸿蒙（HarmonyOS）。以下是一些常用的方法来检测这些平台：

### 1. **通过 `navigator.userAgent`**

`navigator.userAgent` 是一个包含浏览器信息的字符串，可以用来识别不同的操作系统和浏览器。你可以使用正则表达式来解析这个字符串。

```javascript
function getOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  } else if (/Android/.test(userAgent)) {
    return 'Android';
  } else if (/HarmonyOS/.test(userAgent)) {
    return 'HarmonyOS';
  } else {
    return 'Unknown';
  }
}

const os = getOperatingSystem();
console.log('Operating System:', os);
```

### 2. **详细示例**

以下是一个更详细的示例，展示了如何检测不同版本的操作系统：

```javascript
function detectOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    // iOS
    const version = (userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/) || [])[1];
    return { os: 'iOS', version: version };
  } else if (/Android/.test(userAgent)) {
    // Android
    const version = (userAgent.match(/Android (\d+\.\d+)/) || [])[1];
    return { os: 'Android', version: version };
  } else if (/HarmonyOS/.test(userAgent)) {
    // HarmonyOS
    const version = (userAgent.match(/HarmonyOS (\d+\.\d+)/) || [])[1];
    return { os: 'HarmonyOS', version: version };
  } else {
    return { os: 'Unknown', version: null };
  }
}

const osInfo = detectOS();
console.log('Operating System:', osInfo.os, 'Version:', osInfo.version);
```

### 3. **注意事项**

- **User-Agent 可能被修改**：有些用户或应用可能会修改 `User-Agent` 字符串，因此这种方法并不是 100% 可靠。
- **跨平台兼容性**：确保你的正则表达式能够覆盖所有可能的 User-Agent 字符串格式。
- **隐私问题**：一些现代浏览器可能会限制对 `User-Agent` 的访问，以保护用户隐私。例如，某些浏览器可能会返回通用的 `User-Agent` 字符串。

### 4. **其他方法**

除了 `navigator.userAgent`，你还可以结合其他特性来进一步确认设备类型，例如：

- **屏幕尺寸**：iOS 和 Android 设备通常有不同的屏幕尺寸和分辨率。
- **特定 API**：某些 API 可能在某个平台上不可用，例如 `window.orientation` 在某些桌面浏览器中是 `undefined`。

### 5. **示例代码整合**

以下是一个完整的示例，展示如何在 H5 页面中检测操作系统的类型和版本：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Device Detection</title>
</head>
<body>
  <h1>Device Detection</h1>
  <p id="os-info"></p>

  <script>
    function detectOS() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // iOS
        const version = (userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/) || [])[1];
        return { os: 'iOS', version: version };
      } else if (/Android/.test(userAgent)) {
        // Android
        const version = (userAgent.match(/Android (\d+\.\d+)/) || [])[1];
        return { os: 'Android', version: version };
      } else if (/HarmonyOS/.test(userAgent)) {
        // HarmonyOS
        const version = (userAgent.match(/HarmonyOS (\d+\.\d+)/) || [])[1];
        return { os: 'HarmonyOS', version: version };
      } else {
        return { os: 'Unknown', version: null };
      }
    }

    const osInfo = detectOS();
    document.getElementById('os-info').textContent = `Operating System: ${osInfo.os} Version: ${osInfo.version}`;
  </script>
</body>
</html>
```

## 三方库：uaparser
https://www.npmjs.com/package/ua-parser-js

## 调用 Native 接口
如果你在原生应用中提供了 JavaScript Bridge（JSBridge），你可以通过 JSBridge 来提供更准确的设备信息。这种方式可以避免依赖 navigator.userAgent 的不确定性，并且可以提供更多的控制和灵活性。

好的，以下是一个完整的示例，展示如何在 Swift 中通过 JSBridge 向 H5 页面提供设备信息。我们将使用 `WKWebView` 和自定义的 JavaScript 桥接来实现这一点。

### 1. **配置 WebView 和 JSBridge**

在你的 `ViewController` 中配置 `WKWebView` 并设置消息处理器。

#### `ViewController.swift`

```swift
import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate {
    var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        let configuration = WKWebViewConfiguration()
        let userContentController = WKUserContentController()
        let jsBridge = MyJSBridge()
        userContentController.add(jsBridge, name: "nativeBridge")
        configuration.userContentController = userContentController

        webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = self
        view.addSubview(webView)

        if let url = Bundle.main.url(forResource: "index", withExtension: "html") {
            let request = URLRequest(url: url)
            webView.load(request)
        }
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        webView.frame = view.bounds
    }
}
```

### 2. **实现 JSBridge**

创建一个类 `MyJSBridge` 来处理从 JavaScript 发送的消息，并返回设备信息。

#### `MyJSBridge.swift`

```swift
import Foundation
import WebKit

class MyJSBridge: NSObject, WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "getDeviceInfo" {
            let osInfo = getOSInfo()
            message.webView?.evaluateJavaScript("window.postMessage('\(osInfo)', '*')") { _, _ in }
        }
    }

    func getOSInfo() -> String {
        #if os(iOS)
        return "iOS"
        #elseif os(macOS)
        return "macOS"
        #else
        return "Unknown"
        #endif
    }
}
```

### 3. **H5 页面中的 JavaScript 代码**

在你的 H5 页面中，通过 `postMessage` 和 `addEventListener` 与原生代码进行通信，获取设备信息。

#### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Device Detection</title>
</head>
<body>
  <h1>Device Detection</h1>
  <p id="os-info"></p>

  <script>
    function getDeviceInfo() {
      window.webkit.messageHandlers.nativeBridge.postMessage('getDeviceInfo');
    }

    window.addEventListener('message', function(event) {
      document.getElementById('os-info').textContent = `Operating System: ${event.data}`;
      console.log('Operating System:', event.data);
    });

    // 调用原生方法获取设备信息
    getDeviceInfo();
  </script>
</body>
</html>
```

### 5. **将 HTML 文件添加到项目中**

确保将 `index.html` 文件添加到你的 Xcode 项目中。你可以将其放在项目的资源文件夹中（例如 `Resources` 文件夹）。

### 6. **运行项目**

现在，当你运行项目时，`WKWebView` 会加载 `index.html`，并通过 JSBridge 获取并显示设备的操作系统信息。


### 总结
通过 `navigator.userAgent`，你可以有效地检测用户的设备类型和操作系统版本。虽然这种方法不是 100% 可靠，但在大多数情况下已经足够使用。如果你需要更高的准确性，可以结合其他方法和特性进行检测。

