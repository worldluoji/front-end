import fs from "node:fs/promises";

// nodejs esm 没有 commonjs的__dirname, 用这种方式获取当前文件路径
const fileURL = new URL("./index.mjs", import.meta.url);
fs.readFile(fileURL, "utf8").then(console.log);
