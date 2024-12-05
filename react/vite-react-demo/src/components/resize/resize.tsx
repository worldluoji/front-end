import { useEffect, useState } from 'react';

const getSize = () => {
    return window.innerWidth > 1000 ? "large" : "small";
}
const useWindowSize = () => {
    // size就是getSize的返回值，而setSize就可以动态的改变size以渲染view, 相当于getSize被hook住了。
    const [size, setSize] = useState(getSize());
    useEffect(() => {
        const handler = () => {
            setSize(getSize())
        };
        // 监听 resize 事件
        window.addEventListener('resize', handler);
        // 返回一个 callback 在组件销毁时调用，这个机制就几乎等价于类组件中的 componentWillUnmount
        return () => {
            window.removeEventListener('resize', handler);
        };
    }, []);

    return size;
};


const Demo = () => {
    const size = useWindowSize();
    if (size === "small") {
        return <div>Small version</div>;
    }
    return <div>Large version</div>;
};

export default Demo;