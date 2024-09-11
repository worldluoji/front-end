# swift开发一个cordova插件流程

可参考：SimpleVerifyPlugin

**第一步，根据SimpleVerifyPlugin创建目录**

这里package.json是必须的，否则会报错

**第二步,插件核心逻辑编写**
见 SimpleVerifyPlugin.swift

**第三步，编写js**
见 simple-verify-plugin.js。其实就是调用cordova提供的exec方法来调用swift中编写的方法。

**第四步，编写plugin.xml**
注意要和swift文件、js文件对应
```xml
<clobbers target="window.SimpleVerifyPlugin" />
```
这里保证了在js里就能通过
```js
window.SimpleVerifyPlugin
```
调用插件提供的方法。

然后在cordova项目里，通过
```shell
cordova plugin add cordova-plugin-add-swift-support
cordova plugin add SimpleVerifyPlugin #你的插件目录
```
就可以使用插件了。cordova-plugin-add-swift-support是swift支持插件。

js调用插件提供的swift方法示例如下：
```js
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    document.getElementById('verifyButton').addEventListener('click', onVerify);
}

function onVerify() {
    console.log('verify');
    //获取输入的口令
    const password = document.getElementById("pwd").value;
    console.log('verify', password);
    //调用自定义的验证插件
    window.SimpleVerifyPlugin.verifyPassword(password, successFunction, failFunction);
    console.log('verify end');
}

//验证成功
function successFunction() {
    console.log('verify successed');
    alert("口令验证成功！");
}

//验证失败
function failFunction(message) {
    console.log('verify failed')
    alert("验证失败：" + message);
}
```
html如下：
```html
<p>
    <input type="text" id="pwd" >
    <button id="verifyButton">验证</button>
</p>
```
最终实际是调用了SimpleVerifyPlugin.swift中的verifyPassword方法。

<br>

## reference
- https://www.hangge.com/blog/cache/detail_1152.html#google_vignette
- https://www.jianshu.com/p/903251258e72