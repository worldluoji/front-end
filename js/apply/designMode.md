# designMode
```js
document.designMode = "on";
```
这时，整个页面变成的文字变为可编辑状态。

```
javascript: (function fn() { if (document.body.contentEditable === "true") { document.body.contentEditable = 'false' } else { document.body.contentEditable = "true" } })()
```
把上面的代码保存成书签，点一下即可编辑，再点下恢复，专治不让复制的网站

---

## reference
https://developer.mozilla.org/en-US/docs/Web/API/Document/designMode