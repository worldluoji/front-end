import crypto from 'crypto';

const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex'); // 生成 32 字节的随机字符串
};

console.log(generateSecret());