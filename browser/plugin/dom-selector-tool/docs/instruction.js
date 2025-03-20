document.addEventListener("DOMContentLoaded", () => {
    // 默认显示英文内容
    document.getElementById('content-zh').classList.add('hidden');
});

function switchLanguage(lang) {
    if (lang === 'en') {
      document.getElementById('content-en').classList.remove('hidden');
      document.getElementById('content-zh').classList.add('hidden');
    } else if (lang === 'zh') {
      document.getElementById('content-zh').classList.remove('hidden');
      document.getElementById('content-en').classList.add('hidden');
    }
}