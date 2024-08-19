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

        chrome.tabs.sendMessage(tab.id, { action: 'ocr',  imageUrl }, function(response) {
            console.log(321, response);
        });
    }
});