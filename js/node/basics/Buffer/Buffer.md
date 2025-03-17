# Buffer
当说到Buffer，官方是这么说的：
```
JavaScript 语言没有读取或操作二进制数据流的机制。 
Buffer 类被引入作为 Node.js API 的一部分，使其可以在 TCP 流或文件系统操作等场景中处理二进制数据流。
```

example:
```js
// 创建一个大小为10的空buffer
// 这个buffer只能承载10个字节的内容

const buf1 = Buffer.alloc(10);

// 根据内容直接创建buffer

const buf2 = Buffer.from("hello buffer");


// 检查下buffer的结构

buf1.toJSON()
// { type: 'Buffer', data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] }
// 一个空的buffer

buf2.toJSON()
// { type: 'Buffer',data: [ 104, 101, 108, 108, 111, 32, 98, 117, 102, 102, 101, 114 ] }
// the toJSON() 方法可以将数据进行Unicode编码并展示
   
// 检查buffer的大小

buf1.length // 10

buf2.length //12 根据数据自动盛满并创建

//写入数据到buffer
buf1.write("Buffer really rocks!")

//解码buffer

buf1.toString() // 'Buffer rea'

//哦豁，因为buf1只能承载10个字节的内容，所有多处的东西会被截断

//比较两个buffers
```

<br>

## reference
https://nodejs.cn/api/buffer.html