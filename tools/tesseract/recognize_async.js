import Tesseract from "tesseract.js";

// 创建一个 Tesseract 工作线程
Tesseract.createWorker('eng').then(async worker => {
  try {
    
    // 指定图片文件路径
    const imagePath = 'image_with_words.awebp';
    
    // 开始 OCR 识别
    const result = await worker.recognize(imagePath);

    
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