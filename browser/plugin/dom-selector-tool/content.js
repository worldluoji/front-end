/**
 * Generates a CSS selector for the given element.
 * @param {Element} element - The DOM element for which to generate the selector.
 * @returns {string|null} - The CSS selector string or null if the element is not provided.
 */
function getSelector(element) {
  if (!element) {
    return null;
  }
  return CssSelectorGenerator?.getCssSelector(element, { selectors: ["class", "tag", "nthchild", "nthoftype"] });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getSelector") {
    let selection = window.getSelection();
    if (!selection) {
      return;
    }
    const targetElement = selection.anchorNode;
    if (!targetElement) {
      return;
    }

    // Generate selector for the parent element of the selected node
    const selector = getSelector(targetElement.parentElement);
    sendResponse({ selector }); // Send the selector back to the background script
  }
});

window.addEventListener("load", () => {
  let selectedItems = [];
  let output = [];
  let targetPageUrl = "";

  // Load cached data from local storage
  chrome.storage.local.get(["selectedItems", "output", "targetPageUrl"], (data) => {
    selectedItems = data.selectedItems || [];
    output = data.output || [];
    targetPageUrl = data.targetPageUrl || "";

    // Check if the current page URL starts with the target page URL
    if (targetPageUrl && window.location.href.startsWith(targetPageUrl)) {
      setTimeout(() => {
        let uniqueIndice = [];
        let uniqueValues = [];
        const record = selectedItems.map((item, index) => {
          if (!item.selector && item.defaultValue) {
            return item.defaultValue;
          }

          const element = document.querySelector(item.selector);
          const elementText = element ? element.textContent : '';

          if (item.unique) {
              uniqueIndice.push(index);
              uniqueValues.push(elementText);
          }
          return elementText;
        });

        // If unique is checked, check for duplicates and replace if necessary
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
      }, 6000);
    }
  });
});