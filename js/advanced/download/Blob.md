# Blob
Blob 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本（text()方法）或二进制（arrayBuffer()方法）的格式进行读取，也可以转换成 ReadableStream （stream()方法）可读流来用于数据操作。Blob 提供了一种高效的方式来操作数据文件，而不需要将数据全部加载到内存中(比如流式读取、文件切片slice()方法)，这在处理大型文件或二进制数据时非常有用。

Blob 表示的不一定是 JavaScript 原生格式的数据，它还可以用来存储文件、图片、音频、视频、甚至是纯文本等各种类型的数据。Blob 对象可以存储任何类型数据。

File 接口基于 Blob，继承了 blob 的功能并将其扩展以支持用户系统上的文件。

用法：
```js
new Blob(blobParts)
new Blob(blobParts, options)
```
- blobParts (可选)：一个可迭代对象，比如 Array，包含 ArrayBuffer、TypedArray、DataView、Blob、字符串或者任意这些元素的混合，这些元素将会被放入 Blob 中。
- options (可选)：可以设置 type （MIME 类型）和 endings （用于表示换行符）。

```js
const blob1 = new Blob(["Hello, world!"], { type: "text/plain" });

const blob2 = new Blob(['<q id="a"><span id="b">hey!</span></q>'], { type: "text/html" });
```

demo -> download.html

## reference
https://juejin.cn/post/7424414729857400870