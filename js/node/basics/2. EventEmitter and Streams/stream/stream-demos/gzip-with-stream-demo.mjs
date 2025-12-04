import { createGzip, createGunzip } from "zlib";
import { createReadStream, createWriteStream } from "fs";

// 压缩
const gzip = createGzip();

const rs = createReadStream("./data.json");
const ws = createWriteStream("./data.json.gz");
// [可读流 rs] --> [转换流 gzip] --> [可写流 ws]
// pipe 内置背压控制、错误传播和流关闭逻辑。
rs.pipe(gzip)
  .pipe(ws);


// 等待压缩完成后解压
ws.on('finish', () => {
    console.log('Compression completed. Starting decompression...');
  
    // 解压逻辑
    const gunzip = createGunzip();
    const rsu = createReadStream("./data.json.gz");
    const wsu = createWriteStream("./data_output.json");
  
    rsu.pipe(gunzip)
       .pipe(wsu);
  
    // 解压阶段错误处理
    rsu.on('error', (err) => console.error('Read stream (unzip) error:', err));
    wsu.on('error', (err) => console.error('Write stream (unzip) error:', err));
    gunzip.on('error', (err) => console.error('Gunzip error:', err));
});