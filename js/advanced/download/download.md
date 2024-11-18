# download
## 1. 使用 a 标签的 download 属性，IE 不支持，移动端兼容性也不太好。
```js
<a href="/path/to/file" download>Download</a>

// 或者 js 临时生成 a
function download(url) {
  const link = document.createElement('a')
  link.download = 'file name'
  link.href = 'url'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
```


## 2. 静态资源服务器设置响应头也能触发浏览器下载。
```
Content-Disposition: attachment; filename="filename.jpg"
```

## 3. 除了在线文件下载，你还可以创建一个 text 或 json 文件，并下载
主要用到了 Blob 对象和 createObjectURL 方法。
```js
const data = JSON.stringify({ 'message': 'Hello Word' });

const blob = new Blob([data], { type: 'application/json' });

// 创建一个 URL
const url = window.URL.createObjectURL(blob);

// 用上面的 download 方法下载这个 url
...

// 释放创建的 URL
window.URL.revokeObjectURL(url);
```