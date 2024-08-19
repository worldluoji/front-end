import Tesseract from "tesseract.js";
console.log(
    "Live now; Now will never come again."
)

// contentScript.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "ocr") {
      console.log("Received message from background script.", request);
      // 通过ocr识别图片
      async function performOcr() {
        try {
        
            const result = await Tesseract.recognize(
                request.imageUrl,
                'chi_sim+eng', // 识别简体中文和英文
            );

            console.log(111, result.data); // 输出识别到的数据
            sendResponse(result.data);
        } catch (error) {
            console.error("Error:", error);
        }
       
      }
      performOcr();
      return true;
    }
});
