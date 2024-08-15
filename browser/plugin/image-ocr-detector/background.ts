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
    if (info.menuItemId === "handle-image") {
        console.log('click handle image');
        // 获取图片的URL
        const imageUrl = info.srcUrl;

        // 处理图片，例如打开新标签页显示图片
        await chrome.tabs.create({ url: imageUrl });

        // 其他处理逻辑，例如上传图片到服务器
        // ...
    }
});