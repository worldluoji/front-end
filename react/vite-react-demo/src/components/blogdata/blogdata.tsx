
import React, { useState, useEffect } from "react";

interface Response {
    title: string,
    content: string,
}

function mockGetData(): Response {
    const titles = ['How to become a react developer', 'How to become a Vue developer', 'How to become a go developer']
    const content = ['Component, JSX and states are core conceptes of react...', 'Vue is greater than...', 'Go is the language for cloud native app...']
    const index = Math.floor(3 * Math.random());
    return {
        title: titles[index],
        content: content[index]
    }
}


function BlogView({ id = 0 }) {
  // 设置一个本地 state 用于保存 blog 内容
  const [blogContent, setBlogContent] = useState('');

  useEffect(() => {
    console.log('执行副作用');
    // useEffect 的 callback 要避免直接的 async 函数，需要封装一下
    const doAsync = async () => {
      // 当 id 发生变化时，将当前内容清除以保持一致性
      setBlogContent('');
      // 发起请求获取数据
      const res = mockGetData(); // 实际通过接口调用获取：await fetch(`/blog-content/${id}`);
      // 将获取的数据放入 state
      setBlogContent(res.content);
    };
    doAsync();
  }, [id]); // 使用 id 作为依赖项，变化时则执行副作用

  // 如果没有 blogContent 则认为是在 loading 状态
  const isLoading = !blogContent;
  return <div>{ isLoading ? "Loading..." : blogContent }</div>;
  
}

const Demo = () => {
    const randomId = Math.floor(6 * Math.random());
    // 这里通过useState将id hook住，点击按钮时，id随机改变，使得BlockView也随着变化，因BlockView中定了副作用为id变化时才会执行。
    const [id, setId] = React.useState(randomId);
    return <div>
             <BlogView id={id}></BlogView>
             <button onClick={() => setId(Math.floor(6 * Math.random()))}>change</button>
            </div>
}

export default Demo;