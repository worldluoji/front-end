# zlib
nodejs 的 zlib 模块提供了资源压缩功能。例如在 http 传输过程中常用的 gzip，能大幅度减少网络传输流量，提高速度。

```js
const zlib = require("zlib");
const fs = require("fs");

// 压缩
const gzip = zlib.createGzip();

const rs = fs.createReadStream("./db.json");
const ws = fs.createWriteStream("./db.json.gz");
rs.pipe(gzip).pipe(ws);



// 解压
const gunzip = zlib.createGunzip();

const rs = fs.createReadStream("./db.json.gz");
const ws = fs.createWriteStream("./db.json");
rs.pipe(gunzip).pipe(ws);
```