(function() {
  'use strict';

  let pickerActive = false;
  let clickHandler = null;

  function generateStableSelector(el) {
    const attrPriority = [
      'data-testid',
      'aria-label',
      'placeholder',
      'name',
      'title',
      'id'
    ];

    for (const attr of attrPriority) {
      if (el.hasAttribute(attr)) {
        const value = el.getAttribute(attr);
        if (!value) continue;
        let selector;
        if (attr === 'id') {
          selector = `#${CSS.escape(value)}`;
        } else {
          selector = `[${attr}="${CSS.escape(value)}"]`;
        }
        if (document.querySelectorAll(selector).length === 1) {
          return selector;
        }
      }
    }

    return buildUniquePath(el);
  }

  function buildUniquePath(el) {
    const parts = [];
    let current = el;
    while (current && current !== document.documentElement) {
      let selector = current.tagName.toLowerCase();
      const parent = current.parentNode;
      if (parent) {
        const siblings = [...parent.children].filter(
          child => child.tagName === current.tagName
        );
        if (siblings.length > 1) {
          const index = siblings.indexOf(current) + 1;
          selector += `:nth-of-type(${index})`;
        }
        parts.unshift(selector);
      }
      current = parent;
    }
    return parts.join(' > ');
  }

  function enablePicker() {
    if (pickerActive) {
      console.log('选择器生成器已经处于激活状态');
      return;
    }

    pickerActive = true;
    document.body.style.cursor = 'crosshair';

    clickHandler = function(e) {
      e.preventDefault();
      e.stopPropagation();

      document.body.style.cursor = '';
      document.removeEventListener('click', clickHandler, true);
      pickerActive = false;
      clickHandler = null;

      const target = e.target;
      const selector = generateStableSelector(target);

      console.log('✅ 稳定选择器：', selector);
      alert('唯一选择器：\n' + selector + '\n\n已复制到控制台（F12 → Console）');
    };

    document.addEventListener('click', clickHandler, true);
    console.log('🔍 选择器生成器已激活，请点击页面元素');
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'enablePicker') {
      enablePicker();
      sendResponse({ status: 'activated' });
    }
  });
})();