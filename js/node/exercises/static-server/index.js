import http from "http";
import Path from "path";
import fs from "fs";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

var server = http.createServer(function (req, res){
    const fileName = Path.resolve(__dirname, "." + req.url);
    const extName = Path.extname(fileName).slice(1);
    console.log(fileName);

    if (fs.existsSync(fileName)) { //判断本地文件是否存在
        var mineTypeMap={
            html:'text/html;charset=utf-8',
            htm:'text/html;charset=utf-8',
            xml:"text/xml;charset=utf-8",
            png:"image/png",
            jpg:"image/jpeg",
            jpeg:"image/jpeg",
            gif:"image/gif",
            css:"text/css;charset=utf-8",
            txt:"text/plain;charset=utf-8",
            mp3:"audio/mpeg",
            mp4:"video/mp4",
            ico:"image/x-icon",
            tif:"image/tiff",
            svg:"image/svg+xml",
            zip:"application/zip",
            ttf:"font/ttf",
            woff:"font/woff",
            woff2:"font/woff2",
            js:"application/x-javascript"
        }
        if (mineTypeMap[extName]) {
            res.setHeader('Content-Type', mineTypeMap[extName]);
        }
        res.setHeader("Access-Control-Allow-Origin", "*"); // 设置可访问的源
        res.setHeader("Access-Control-Allow-Headers", "*"); 
        var stream = fs.createReadStream(fileName);
        stream.pipe(res);
    }
})
server.listen(8099);