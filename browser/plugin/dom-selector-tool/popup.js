document.addEventListener("DOMContentLoaded", () => {
    const manageItemsButton = document.getElementById("manageItems");
    const exportButton = document.getElementById("export");
    const targetPageUrlInput = document.getElementById("targetPageUrl");
    const saveTargetPageUrlButton = document.getElementById("saveTargetPageUrl");
  
    let targetPageUrl = "";
  
    // 加载缓存数据
    chrome.storage.local.get(["targetPageUrl"], (data) => {
      targetPageUrl = data.targetPageUrl || "";
      targetPageUrlInput.value = targetPageUrl;
    });
  
    // 管理按钮
    manageItemsButton.onclick = () => {
      chrome.tabs.create({ url: chrome.runtime.getURL("manage/manage.html") });
    };
  
    // 导出按钮
    exportButton.onclick = async () => {
      const output = await chrome.storage.local.get(["output"]);
      if (!output.output || output.output.length === 0) {
        alert("No data to export.");
        return;
      }
  
      const json = JSON.stringify(output.output, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
  
      window.open(url);
      chrome.storage.local.set({ output: [] });
    };
  
    // 保存目标页面 URL 按钮
    saveTargetPageUrlButton.onclick = () => {
      targetPageUrl = targetPageUrlInput.value;
      chrome.storage.local.set({ targetPageUrl });
      alert("Target Page URL Saved!");
    };
});