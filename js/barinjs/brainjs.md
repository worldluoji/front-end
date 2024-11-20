# Brain.js
Brain.js 是一个用 JavaScript 编写的库，它让开发者能够在浏览器和 Node.js 环境中轻松地创建和训练神经网络。这意味着你可以用它来实现机器学习功能，比如图像识别或语言理解。它设计得非常简单，即使是没有深度学习背景的开发者也能快速上手。


## 集成
浏览器集成：
```js
// CDN file for tensorflow.js
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"></script>
// CDN file for bracin.js
<script src="https://unpkg.com/brain.js"></script>
```

nodejs集成：
```
// install the brain.js package
npm install --save brain.js
// install the @tensorflow/tfjs-node
npm install --save @tensorflow/tfjs-node
```

## JS对比Python
- JavaScript 和 Python 作为动态脚本语言在语言层面上并无差别。
- Python 的 AI 生态环境十分强大，里面既有 TensorFlow、PyTorch 等十分受欢迎的深度学习框架，还包含 Numpy 等进行大维度数组和矩阵运算的库。
- JavaScript 运行环境在浏览器和 NodeJS 中，也拥有 TensorFlow 的 JS 和 NodeJS 版本，但受限于浏览器和 NodeJS 运行时的运算效率以及 GPU 的调用能力。

所以 Python 更加合适进行需要大量计算的离线模型训练，而 JavaScript 更加适合运行时的模型预测。