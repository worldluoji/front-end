import React, { useEffect, useState } from "react"

const useKeyPress = (domNode = document.body) => {
    const [key, setKey] = useState<string>()
    useEffect(() => {
        const handleKeyPress = (event: any) => {
            setKey(event.key)
        }

        domNode.addEventListener("keypress", handleKeyPress)

        return () => {
            domNode.removeEventListener("keypress", handleKeyPress)
        }
    }, [domNode])

    return key
}

export default useKeyPress

/*
有了这个 Hook，我们在使用的时候就非常方便，无需做任何事件的绑定，而是只要把键盘按键看做是一个不断变化的数据源，
这样，就可以去实时监听某个 DOM 节点上触发的键盘事件了。
*/