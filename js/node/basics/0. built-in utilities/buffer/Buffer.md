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

---

## SharedArrayBuffer
JavaScript 中有 SharedArrayBuffer，能够允许我们在不同的 Worker 中访问同一块内存区域。

[示例](./shared-array-buffer.mjs)

但是要注意，这种 worker 通讯的方式虽然高效，但是会产生临界区（多线程编程领域的概念），所以一般要用到 Atomic 这个包来控制内存资源的竞争。

在实践中，建议控制好 SharedArrayBuffer 的使用场景，确保仅仅在确实需要大规模传递数据或者高性能要求的场景使用它，并且应该由团队内较为资深的、有多线程开发经验的工程师做好代码评审。

---

## reference
https://nodejs.cn/api/buffer.html