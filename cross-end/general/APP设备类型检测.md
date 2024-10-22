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


### 总结
通过 `navigator.userAgent`，你可以有效地检测用户的设备类型和操作系统版本。虽然这种方法不是 100% 可靠，但在大多数情况下已经足够使用。如果你需要更高的准确性，可以结合其他方法和特性进行检测。

