# watch

首先是 fs.watchFile 方法，通过轮询的方式来检查文件的变化。这意味着它会在一定的时间间隔内读取文件的元数据（如修改时间），并比较其变化。虽然这种方法在不同操作系统上表现相对一致，但因其轮询机制，可能会导致较高的 CPU 和内存占用，尤其是在监听大量文件时。
```js
const fs = require('fs');
const filePath = './example.txt';
// 使用 fs.watchFile 监听文件变化
fs.watchFile(filePath, { interval: 1000 }, (curr, prev) => {
    // 检查文件的修改时间是否发生了变化  
    if (curr.mtime !== prev.mtime) {
        console.log('文件已修改');
        // 读取文件内容  
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('读取文件时发生错误:', err);
                return;
            }
            console.log('文件新内容:', data);
        });
    }
});   
```

相比fs.watchFile，fs.watch方法更加高效，因为它依赖于底层操作系统的文件变化通知机制（如果可用）。这通常意味着更低的 CPU 和内存占用，并且能更及时地响应文件变化。然而，需要注意的是，fs.watch在某些操作系统或特定情况下可能不可用或表现不一致。
```js
const fs = require('fs');  
const filePath = './example.txt';  
// 监听文件变化  
fs.watch(filePath, (eventType, filename) => {  
    if (eventType === 'change') {  
        console.log('文件已更改:', filename);  
        // 读取文件内容  
        fs.readFile(filePath, 'utf8', (err, data) => {  
            if (err) {  
                console.error('读取文件时发生错误:', err);  
                return;  
            }  
            console.log('文件新内容:', data);  
        });  
    }  
});  
console.log('正在监听', filePath);
```

两者都可以用来实现实践部分的文件内容变化监听，我们对比一下它们的不同和适用环境。
- fs.watch 的性能通常优于 fs.watchFile，但在某些操作系统上可能不可用或表现不一致。
- 在使用 fs.watch 时，确保监听路径存在且文件或目录的权限设置正确。
- 监听大量文件或目录时，可能会遇到性能问题，尤其是使用 fs.watchFile。
- 监听文件内容变化时，如果需要精确控制（如仅当文件内容实际变化时才触发），可能需要结合文件内容比较（如 MD5 校验）来实现。


## watch with md5
```js
const fs = require('fs')
const md5 = require('md5');
const path = require('path');
const process = require("child_process");
let preveMd5 = null;
let fsWait = false;
const filePath = path.join(__dirname, '/AILayout/');
fs.watch(filePath, (event, filename) => {
    if (filename) {
        if (fsWait) return;
        fsWait = setTimeout(() => {
            fsWait = false;
        }, 100)
        var currentMd5 = md5(fs.readFileSync(filePath + filename))
        if (currentMd5 == preveMd5) {
            return
        }
        preveMd5 = currentMd5
        console.log(`${filePath}${filename} updated`);
        process.exec('npm run codegen', (error, stdout, stderr) => {
            if (!error) {
                // 成功
            } else {
                // 失败
            }
        });
    }
})
```
在文件内容变化的监听过程中，直接比较文件内容可能会非常耗时、占用大量资源，特别是当文件很大时。而使用 Hash 算法，我们可以将文件内容转换为一个相对较小的哈希值，然后只比较这些哈希值。如果哈希值不同，那么文件内容一定不同；如果哈希值相同，则文件内容在很大程度上是相同的（尽管存在极小的哈希碰撞概率，但在实际应用中几乎可以忽略不计）。