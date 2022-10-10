# js 剪贴板操作的三种方法
浏览器允许 JavaScript 脚本读写剪贴板，自动复制或粘贴内容。

一般来说，脚本不应该改动用户的剪贴板，以免不符合用户的预期。但是，有些时候这样做确实能够带来方便，比如"一键复制"功能，用户点击一下按钮，指定的内容就自动进入剪贴板。

目前，一共有三种方法可以实现剪贴板操作。
- Document.execCommand()方法
- 异步的 Clipboard API
- copy事件和paste事件

## 1. Document.execCommand()
是操作剪贴板的传统方法，各种浏览器都支持。

它支持复制、剪切和粘贴这三个操作。
```
document.execCommand('copy')（复制）
document.execCommand('cut')（剪切）
document.execCommand('paste')（粘贴）
```
### 复制操作
脚本先选中输入框inputElement里面的文字（inputElement.select()），然后document.execCommand('copy')将其复制到剪贴板。
```
const inputElement = document.querySelector('#input');
inputElement.select();
document.execCommand('copy');
```
注意，复制操作最好放在事件监听函数里面，由用户触发（比如用户点击按钮）。如果脚本自主执行，某些浏览器可能会报错。

### 粘贴操作
粘贴时，会将剪贴板里面的内容，输出到当前的焦点元素中。
```
const pasteText = document.querySelector('#output');
pasteText.focus();
document.execCommand('paste');
```

### 缺点
Document.execCommand()方法虽然方便，但是有一些缺点：
- 首先，它只能将选中的内容复制到剪贴板，无法向剪贴板任意写入内容。
- 其次，它是同步操作，如果复制/粘贴大量数据，页面会出现卡顿。有些浏览器还会跳出提示框，要求用户许可，这时在用户做出选择前，页面会失去响应。

为了解决这些问题，浏览器厂商提出了异步的 Clipboard API。


## 2. 异步 Clipboard API
Clipboard API 是下一代的剪贴板操作方法，比传统的document.execCommand()方法更强大、更合理。

它的所有操作都是异步的，返回 Promise 对象，不会造成页面卡顿。而且，它可以将任意内容（比如图片）放入剪贴板。

navigator.clipboard属性返回 Clipboard 对象，所有操作都通过这个对象进行。
```
const clipboardObj = navigator.clipboard;
```
如果navigator.clipboard属性返回undefined，就说明当前浏览器不支持这个 API。

由于用户可能把敏感数据（比如密码）放在剪贴板，允许脚本任意读取会产生安全风险，所以这个 API 的安全限制比较多。

首先，Chrome 浏览器规定，只有 HTTPS 协议的页面才能使用这个 API。不过，开发环境（localhost）允许使用非加密协议。

其次，调用时需要明确获得用户的许可。权限的具体实现使用了 Permissions API，跟剪贴板相关的有两个权限：
clipboard-write（写权限）和clipboard-read（读权限）。"写权限"自动授予脚本，而"读权限"必须用户明确同意给予。
也就是说，写入剪贴板，脚本可以自动完成，但是读取剪贴板时，浏览器会弹出一个对话框，询问用户是否同意读取。

Clipboard 对象提供了四个方法，用来读写剪贴板。它们都是异步方法，返回 Promise 对象。

### Clipboard.readText()
Clipboard.readText()方法用于复制剪贴板里面的文本数据：
```
async function getClipboardContents() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Pasted content: ', text);
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}
```
如果用户不同意，脚本就会报错，所以用了try...catch进行异常处理。

### Clipboard.read()
Clipboard.read()方法用于复制剪贴板里面的数据，可以是文本数据，也可以是二进制数据（比如图片）。该方法需要用户明确给予许可。

### Clipboard.writeText()
Clipboard.writeText()方法用于将文本数据，写入剪贴板。
```
async function copyPageUrl() {
  try {
    await navigator.clipboard.writeText(location.href);
    console.log('Page URL copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}
```

### Clipboard.write()
Clipboard.write()方法用于将任意数据写入剪贴板，也可以是二进制数据。


## 3. copy、cut、paste事件
```
const source = document.querySelector('.source');

source.addEventListener('copy', (event) => {
  const selection = document.getSelection();
  event.clipboardData.setData('text/plain', selection.toString().toUpperCase());
  event.preventDefault();
});
```
- Event.clipboardData.setData(type, data)：修改剪贴板数据，需要指定数据类型。
- Event.clipboardData.getData(type)：获取剪贴板数据，需要指定数据类型。
- Event.clipboardData.clearData([type])：清除剪贴板数据，可以指定数据类型。如果不指定类型，将清除所有类型的数据。
- Event.clipboardData.items：一个类似数组的对象，包含了所有剪贴项，不过通常只有一个剪贴项。

e.preventDefault()取消了剪贴板的默认操作，然后由脚本接管复制操作。

cut事件则是在用户进行剪切操作时触发，它的处理跟copy事件完全一样，也是从Event.clipboardData属性拿到剪切的数据。

paste事件
```
document.addEventListener('paste', async (e) => {
  e.preventDefault();
  const text = await navigator.clipboard.readText();
  console.log('Pasted text: ', text);
});
```

## 参考文档
https://www.ruanyifeng.com/blog/2021/01/clipboard-api.html