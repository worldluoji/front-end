// typescript参考： https://react-redux.js.org/using-react-redux/usage-with-typescript
// react-redux浏览器插件：https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
import {addCard, removeCard, Card, CardListDispatch} from './CardStore'
import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'


const CardList = () => {
    // useSelector的入参就是state, 在ts中需要指定类型
    const cardList = useSelector((state: Card[]) => state)
    
    const dispatch: CardListDispatch = useDispatch()

    const [newTask, setNewTask] = useState('')
    
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewTask(e.target.value)
    }
    
    const onAdd = () => {
        if (!newTask || newTask === '') {
            alert('输入不能为空')
            return
        }
        dispatch(addCard({ title: newTask }))
    }

    const onDelete = (title: string) => {
        dispatch(removeCard({ title }))
    }

    return (
        <div>
            <ul>
                { cardList && cardList.map(c => {
                    return (
                        <li key={c.title}>
                            {c.title}
                            <button onClick={() => onDelete(c.title)}>删除</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <input type="text" onChange={onChange}/>
                <button onClick={onAdd}>新增</button>
            </div>
        </div>
    )
}

export default CardList