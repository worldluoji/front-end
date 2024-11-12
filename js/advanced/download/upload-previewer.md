## 显示上传的图片
通过 fileReader API 的 readAsDataURL 方法来显示上传图片
```javascript
function readImage() {
  const fileReader = new FileReader()
  const file = document.getElementById('uploaded-file').files[0]

  if (file) {
    fileReader.readAsDataURL(file)
  }

  fileReader.addEventListener(
    'load',
    () => {
      const result = fileReader.result
      const resultContainer = document.getElementById('result')
      const img = document.createElement('img')
      img.src = result
      resultContainer.append(img)
    },
    { once: true }
  )
}
```
这段JavaScript代码定义了一个名为`readImage`的函数，该函数用于读取用户上传的图片文件，并将其显示在一个HTML页面上。下面是代码的详细解释：

1. **创建FileReader对象**:
   ```javascript
   const fileReader = new FileReader()
   ```
   `FileReader` API允许Web应用程序异步读取用户选择的文件的内容。

2. **获取上传的文件**:
   ```javascript
   const file = document.getElementById('uploaded-file').files[0]
   ```
   这里假设页面中有一个id为`uploaded-file`的`<input type="file">`元素，用户通过它选择了一个文件。`files`属性返回一个`FileList`对象，其中包含所有选中的文件，`[0]`表示获取第一个文件。

3. **读取文件内容**:
   ```javascript
   if (file) {
     fileReader.readAsDataURL(file)
   }
   ```
   如果`file`存在，`readAsDataURL`方法会被调用来读取文件并将其转换为Data URL格式，这是一种可以嵌入到HTML中的文件表示形式。

4. **监听读取完成事件**:
   ```javascript
   fileReader.addEventListener(
     'load',
     () => {
       // 在这里处理读取后的文件数据
     },
     { once: true }
   )
   ```
   `load`事件会在文件读取完成后触发，回调函数中的代码将处理读取的结果。`{ once: true }`选项确保事件处理器只被调用一次。

5. **显示图像**:
   ```javascript
   const result = fileReader.result
   const resultContainer = document.getElementById('result')
   const img = document.createElement('img')
   img.src = result
   resultContainer.append(img)
   ```
   在`load`事件处理器中，`fileReader.result`包含了Data URL，这将被设置为新创建的`<img>`元素的`src`属性，然后将该元素附加到页面上的某个容器中，通常这个容器是一个`<div>`元素，具有id`result`。

整个函数的目的是让用户能够上传一张图片，然后在页面上直接预览这张图片。如果函数是在用户点击按钮或文件输入框更改后调用的，那么用户将能够立即看到他们所选文件的预览图。