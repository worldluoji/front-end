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
      let uniqueIndice = [];
      let uniqueValues = [];
      const record = selectedItems.map((item, index) => {
        const element = document.querySelector(item.selector);
        const elementText = element ? element.textContent : '';
        if (item.unique) {
            uniqueIndice.push(index);
            uniqueValues.push(elementText);
        }
        return elementText;
      });

      // 勾选了 unique，则检查是否重复, 如果重复则替换
      let exitFlag = false;
      if (uniqueIndice.length && output.length) {
        for (let oi = 0; oi < output.length; oi++) {
            for (let i of uniqueIndice) {
                let o_record = output[oi].split(',');
                if (o_record[i] === uniqueValues[i]) {
                    output[oi] = record.join(',');
                    exitFlag = true;
                    break;
                }
            }
            if (exitFlag) {
                break;
            }
        }
      } 
      if (!exitFlag) {
        output.push(record.join(','));
      }
      chrome.storage.local.set({ output });
    }, 0);
  }
});