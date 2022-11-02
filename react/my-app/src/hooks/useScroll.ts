
import { useState, useEffect } from 'react';

// 获取横向，纵向滚动条位置
const getPosition = () => {
  return {
    x: document.documentElement.scrollLeft,
    y: document.documentElement.scrollTop,
  };
};
/*
要获取当前页面的滚动条纵坐标位置，用：
document.documentElement.scrollTop;
而不是：
document.body.scrollTop;
documentElement 对应的是 html 标签，而 body 对应的是 body 标签。

在标准w3c下，document.body.scrollTop恒为0，需要用document.documentElement.scrollTop来代替;
*/

const useScroll = () => {
  // 定一个 position 这个 state 保存滚动条位置
  const [position, setPosition] = useState(getPosition());
  useEffect(() => {
    const handler = () => {
      setPosition(getPosition());
    };
    // 监听 scroll 事件，更新滚动条位置
    document.addEventListener("scroll", handler);
    return () => {
      // 组件销毁时，取消事件监听
      document.removeEventListener("scroll", handler);
    };
  }, []);
  return position;
};

export default useScroll;