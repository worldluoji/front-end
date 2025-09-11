# H5判断是否安装某个app
可以，但**存在限制，且不同平台（iOS和Android）的实现方式和可靠性差异很大**。

这是一个在Web开发中非常常见的需求，通常用于实现“智能跳转”：如果用户安装了App，则直接打开App并跳转到对应页面；如果未安装，则跳转到App Store或应用市场下载页。

### 核心原理与限制

*   **Android**: 可行性高。主要通过尝试唤起App的**自定义协议（Scheme）或App Links**，并根据唤起后的结果来判断。
*   **iOS**: 限制非常严格。自iOS 9以后，出于隐私和安全考虑，Safari浏览器无法直接提供有效的方法来检测App是否安装。通常使用一种“间接推断”的方法，但体验并不完美。

---

### 具体实现方案

#### 1. 通用方案：尝试唤起App并计时判断（最常用）

这是目前跨平台兼容性最好的方案。其核心思路是：**尝试唤起App，并设置一个计时器。如果一段时间后页面没有被正确跳转（App被唤起），则判断为未安装。**

**步骤：**
1.  创建一个隐藏的 `iframe` 或直接使用 `window.location` 跳转到App的自定义协议URL（例如：`myapp://deeplink/home`）。
2.  同时启动一个计时器（例如，延迟100~300毫秒）。
3.  如果在计时器触发前，页面被切走了（App被成功唤起），则计时器回调不会执行。
4.  如果计时器触发了，说明唤起App失败，大概率是未安装，此时在计时器的回调函数中执行跳转到应用商店的操作。

**代码示例：**

```javascript
function checkAppInstalled(scheme, downloadUrl) {
  const appUrl = scheme + '://deeplink'; // App的自定义协议URL
  let timer = null;
  let isAppLoaded = false;

  // 检查是否在微信等内置浏览器中，这些环境会阻止直接唤起App
  function isInWechat() {
    return /micromessenger/i.test(navigator.userAgent);
  }

  if (isInWechat()) {
    // 在微信中，引导用户在浏览器中打开
    alert('请点击右上角，在默认浏览器中打开');
    return;
  }

  // 尝试通过iframe唤起App
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = appUrl;
  document.body.appendChild(iframe);

  // 同时设置一个计时器
  timer = setTimeout(() => {
    if (!isAppLoaded) {
      // 计时器触发，说明唤起失败，跳转到下载页
      window.location.href = downloadUrl;
    }
  }, 300); // 延迟时间，通常200-500ms比较合适

  // 添加页面 visibilitychange 事件监听作为辅助判断
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isAppLoaded = true; // 页面被隐藏，说明唤起成功
      clearTimeout(timer); // 清除计时器
    }
  });

  // 添加 window 的 pagehide 事件监听（用于iOS）
  window.addEventListener('pagehide', () => {
    isAppLoaded = true;
    clearTimeout(timer);
  });
}

// 使用示例：检查“我的App”是否安装，未安装则跳转到应用宝下载
checkAppInstalled('myapp', 'https://a.app.qq.com/o/simple.jsp?pkgname=com.yourcompany.yourapp');
```

#### 2. 平台特定方案

**对于 Android：**

*   **`Intent` 协议**： 可以构造一个更强大的Intent链接，在用户点击时会给用户一个选择器，列出可以处理该Intent的所有App（包括你的App）。如果你的App出现在列表中，则说明已安装。但这仍然需要用户主动点击，无法由JS自动检测。
    *   `intent://deeplink/#Intent;scheme=myapp;package=com.yourcompany.yourapp;end`
*   **`universal link` (App Links)**： 这是Android上的深度链接标准。理论上可以更好地处理，但H5端依然无法直接查询安装状态，最终还是需要结合计时器方案来判断唤起是否成功。

**对于 iOS：**

*   **`Universal Link` (通用链接)**： 这是Apple官方推荐的深度链接方式。它允许你通过一个普通的HTTP链接（例如：`https://your.domain.com/path`）来直接打开App。如果App未安装，则会直接在Safari中打开该网页。
    *   **优点**： 体验无缝，没有弹窗提示。
    *   **缺点**： **H5端依然无法直接、同步地知道App是否被打开**。你需要在你的服务器上配置`apple-app-site-association`文件，并在App和H5页面中处理相应的逻辑。通常也需要结合超时重定向来实现降级。

---

## 示例
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
<meta name="format-detection"content="telephone=no"> 
<title></title>
<link rel="stylesheet" type="text/css" href="css/apk.css">
 <script type="text/javascript">
 		var android_url="<your_android_url>";
 		var ios_url="<your_ios_url>";
    	//var first=true;
		window.alert = function(name){
			const iframe = document.createElement("IFRAME");
			iframe.style.display = "none";
			// iframe.setAttribute('src','data:text/plain,');
            iframe.src = 'your_app_page_appUrl';
			document.documentElement.appendChild(iframe);
			window.frames[0].window.alert(name);
			iframe.parentNode.removeChild(iframe);
		};
    	function down_apk(){
    		choice_dev();
    	}
    	function choice_dev(){
    		function is_weixin() {  // 在微信中扫面二维码,提示用户在浏览器中打开
                var ua = navigator.userAgent.toLowerCase();  
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    return true;  
                } else {  
                    return false;  
                }  
            } 
            var isWeixin = is_weixin();
    		if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { 
//				return;
	            downloadUrl=ios_url;
	            if(isWeixin){
					alert("点击右上角按钮，然后在弹出的菜单中，点击在浏览器中打开，即可安装")
	                return;
	            }
	        } else if (/(Android)/i.test(navigator.userAgent)) {
	            downloadUrl=android_url;  
				if(isWeixin){  
					alert("点击右上角按钮，然后在弹出的菜单中，点击在浏览器中打开，即可安装")
	                return;
	            }
	        } else { 
				alert('暂未开放！');
                return;				
	        };
            
	        window.location.href = downloadUrl;
	    }
    </script>
</head>
<body>
<div>
	<div class="logo_image1" align="center">
		<input type="image" src="images/download.png" onclick="down_apk()" height="50" width="242" />
	</div>
</div>
</body>
</html>
```

---

### 注意事项和局限性

1.  **隐私限制**： 尤其是iOS，浏览器严禁网页直接获取用户设备的安装列表，所以所有方案都是“投机”或“推断”的，并非100%准确。
2.  **浏览器环境**：
    *   **微信/QQ内置浏览器**： 这些环境会屏蔽自定义协议的直接唤起，通常会显示一个“请在浏览器打开”的提示。你需要先检测环境，然后引导用户在其他浏览器中打开你的H5页面。
    *   **其他App内置浏览器**： 行为不确定，也可能阻止唤起。
3.  **用户体验**：
    *   在iOS上，尝试唤起App时可能会有一个弹窗提示：“是否打开XXXApp？”，这会干扰计时器的准确性。
    *   快速连续触发可能会被浏览器视为滥用行为而阻止。
4.  **准确性**： 计时器方案不是绝对可靠的。网络延迟、设备性能差都可能导致计时器在App被成功唤起前就触发了。

### 总结

| 平台    | 可行性 | 推荐方案                                     | 主要挑战                     |
| :------ | :----- | :------------------------------------------- | :--------------------------- |
| **Android** | 高     | 尝试唤起自定义协议(Scheme) + 计时器跳转 fallback | 各大安卓市场的浏览器差异     |
| **iOS**     | 低     | 尝试唤起自定义协议(Scheme) + 计时器跳转 fallback<br>或使用 Universal Link | 系统限制，无法直接检测，体验不完美 |

**最终建议：**
目前业界最通用的做法就是上述的 **“尝试唤起 + 计时器判断”** 方案。虽然它不是完美的，但在大多数场景下能提供足够好的用户体验。务必在各大主流浏览器和App（微信、QQ）的内置浏览器中进行充分测试。