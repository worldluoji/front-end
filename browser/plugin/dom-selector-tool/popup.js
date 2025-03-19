document.addEventListener("DOMContentLoaded", () => {
    const manageItemsButton = document.getElementById("manageItems");
    const exportButton = document.getElementById("export");
  
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
});