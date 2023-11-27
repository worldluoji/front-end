# crypto
Node.js 中 Legacy 的密码学模块 crypto。其提供了用于处理加密功能的类和函数，包括哈希函数、HMAC、加密、解密、签名、以及验证等功能。

<br>

## crypto.getHashes() 
它返回的是 Node.js 所支持的哈希（Hash）算法数组，也称摘要（Digest）算法。
```
“ 哈希 （ hash ）”和“摘要（digest）”这两个术语在密码学中都被用来指代哈希函数的输出。 
这两个词都是从这个函数的特性和用途中得出的。

哈希函数将任意长度的输入数据处理成固定长度的输出，这个输出通常被称为哈希值或哈希码。
这个处理过程是一种“消化”过程，因为它将大量的输入数据“消化”成一个小的、固定长度的输出。因此，哈希值也常常被称为“摘要”（digest），就像是一本书的摘要可以给你提供整本书的主要内容一样，哈希值也可以代表输入数据的“摘要”。

需要注意的是，虽然哈希值可以代表输入数据，但由于哈希函数的单向性，你不能从哈希值恢复原始的输入数据。
这是哈希函数在密码学和数据完整性校验中的重要应用。
```

<br>

## createHash()
```
const { createHash } = require('crypto');

const hash = createHash('sha512');
hash.update('some data to hash');
console.log(hash.digest('hex'));
```

<br>

## aes
```
// crypto module
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);

// protected data
const message = "This is a secret message";

// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

// the cipher function
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

// encrypt the message
// input encoding
// output encoding
let encryptedData = cipher.update(message, "utf-8", "hex");
```