import React from 'react';

const getSize = () => {
    return window.innerWidth > 1000 ? "large" : "small";
}
const useWindowSize = () => {
    // size就是getSize的返回值，而setSize就可以动态的改变size以渲染view, 相当于getSize被hook住了。
    const [size, setSize] = React.useState(getSize());
    React.useEffect(() => {
        const handler = () => {
            setSize(getSize())
        };
        window.addEventListener('resize', handler);
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