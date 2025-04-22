document.addEventListener('DOMContentLoaded', function () {
    // 动态生成一些列表项
    const items = [];
    for (let i = 0; i < 50; i++) {
      items.push(`<li>Item ${i + 1}</li>`);
    }
    document.getElementById('scroll-content').innerHTML = items.join('');
  
    // 初始化 Better Scroll
    var wrapper = document.getElementById('wrapper');
    var scroll = new BScroll(wrapper, {
      scrollY: true, // 允许纵向滚动
      click: true,   // 确保点击事件可以正常工作
      probeType: 3   // 实时派发滚动事件
    });
  
    // 可选：监听滚动位置变化（例如用于无限加载）
    scroll.on('scroll', function (pos) {
      console.log(`Scroll position: x=${pos.x}, y=${pos.y}`);
    });
});