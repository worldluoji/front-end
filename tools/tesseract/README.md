# tesseract.js
`tesseract.js` 是一个 JavaScript 库，用于在浏览器和 Node.js 环境中实现光学字符识别 (OCR) 功能。它基于 Tesseract OCR 引擎，并提供了易于使用的 API 来处理图像中的文本识别。

### 如何使用 `tesseract.js` 支持中文识别：

1. **安装 `tesseract.js`**：
   - 首先，确保你已经安装了 Node.js。
   - 使用 npm 安装 `tesseract.js`：
     ```sh
     npm install tesseract.js
     ```

2. **加载中文语言包**：
   - `tesseract.js` 默认不会加载所有的语言包，因此你需要手动加载中文语言包。
   - 可以使用以下命令来下载简体中文 (`chi_sim`) 或繁体中文 (`chi_tra`) 语言包：
     ```javascript
     const Tesseract = require('tesseract.js');

     Tesseract.createWorker().then(async worker => {
       await worker.loadLanguage('chi_sim');
       await worker.initialize('chi_sim');
       // ... 使用 worker 进行 OCR ...
       await worker.terminate();
     });
     ```

3. **进行 OCR**：
   - 使用 `recognize` 方法识别图片中的文字，并指定语言为中文：
     ```javascript
     Tesseract.recognize(
       'path/to/your/image.jpg', // 图片路径
       'chi_sim', // 使用简体中文
       { logger: m => console.log(m) }
     ).then(({ data: { text } }) => {
       console.log(text);
     });
     ```

这样就可以使用 `tesseract.js` 来识别中文文本了。确保图片清晰且文字部分足够大以便被准确识别。