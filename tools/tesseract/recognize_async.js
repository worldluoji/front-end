import Tesseract from "tesseract.js";

// 创建一个 Tesseract 工作线程
Tesseract.createWorker().then(async worker => {
  try {
    
    // 设置 OCR 参数
    const params = {
      lang: 'eng', // 使用简体中文
      logger: 'm => console.log(m)', // 打印进度信息
      // 可以添加其他参数，例如：whitelist, blacklist, tessedit_char_whitelist 等
    };
    
    // 指定图片文件路径
    const imagePath = 'image_with_words.awebp';
    
    // 开始 OCR 识别
    const result = await worker.recognize(imagePath, params);

    
    // 输出识别结果
    if (result.data && result.data.text) {
        console.log(result.data.text);
    } else {
        console.log('No text was found in the image.');
    }
    
    // 清理资源
    await worker.terminate();
  } catch (error) {
    console.error(error);
  }
});