import Tesseract from "tesseract.js";
console.log(
    "Live now; make now always the most precious time. Now will never come again."
)

// 创建一个右键菜单项
chrome.contextMenus.create({
    id: "handle-image",
    title: "Handle this image",
    contexts: ["image"]
});
  
  // 监听菜单项点击事件


chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    console.log('click', info.menuItemId);
    if (info.menuItemId === "handle-image") {
        // 获取图片的URL
        const imageUrl = info.srcUrl;
        if (!imageUrl) {
            console.log('fail to get image url');
            return;
        }

        // 通过ocr识别图片
        try {
            // 加载图片
            // const response = await fetch(imageUrl);
            // const blob = await response.blob();
            //   const image = new Image();
            //   image.src = URL.createObjectURL(blob);

            // 使用 Tesseract.js 进行 OCR 识别
            // TODO Tesseract.recognize会创建一个webworker，backgourd里无法创建，会报错
            const result = await Tesseract.recognize(
                imageUrl,
                'chi_sim+eng', // 识别简体中文和英文
            );

            console.log(111, result.data); // 输出识别到的数据
        } catch (error) {
            console.error("Error:", error);
        }
    }
});