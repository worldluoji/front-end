import { createWriteStream } from 'fs';
import { pipeline, Readable } from 'stream';
import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({ 
    logger: true,
});

// 此配置允许服务器明确接受二进制流类型
fastify.addContentTypeParser('application/octet-stream', (req, payload, done) => {
    done(null, req.raw); // 直接传递原生流
});

fastify.register(cors, {
    origin: '*', // Allow all origins (adjust for production)
    methods: ['POST'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Content-Range'], // Allow specific headers
});

fastify.post('/upload', (req, res) => {
    console.log('Received chunk');
    const writeStream = createWriteStream('target-file', { flags: 'a' }); // 追加模式
    
    // req.raw直接访问原生Node.js请求对象，绕过Fastify的解析逻辑
    pipeline(req.raw, writeStream, (err) => {
      if (err) res.status(500).send('Upload failed');
      else res.send('Chunk uploaded');
    });
});

const start = async () => {
    try {
      await fastify.listen({ port: 8094 });
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
}

start();