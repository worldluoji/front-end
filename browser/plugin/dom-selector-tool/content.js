let selectedItems = [];
let output = [];
let targetPageUrl = "";

// 加载缓存数据
chrome.storage.local.get(["selectedItems", "output", "targetPageUrl"], (data) => {
  selectedItems = data.selectedItems || [];
  output = data.output || [];
  targetPageUrl = data.targetPageUrl || "";

  // 检查是否进入指定页面
  if (targetPageUrl && window.location.href.startsWith(targetPageUrl)) {
    setTimeout(() => {
      const record = selectedItems.map((item) => {
        const element = document.querySelector(item.selector);
        return element ? element.textContent : null;
      });
      output.push(record);
      chrome.storage.local.set({ output });
    }, 6000);
  }
});