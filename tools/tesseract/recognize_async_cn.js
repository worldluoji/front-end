import Tesseract from "tesseract.js";

// https://github.com/naptha/tesseract.js/blob/master/docs/workers_vs_schedulers.md
// 创建一个 Tesseract 工作线程
Tesseract.createWorker('chi_sim').then(async worker => {
  try {
    
    // 指定图片文件路径
    const imagePath = 'image_cn.png';
    
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