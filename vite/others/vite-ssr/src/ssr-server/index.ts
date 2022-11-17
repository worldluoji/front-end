// 后端服务
import express from 'express';

async function createServer() {
  const app = express();
  
  app.listen(3000, () => {
    console.log('服务器已启动~')
    console.log('http://localhost:3021');
  });
}

createServer();