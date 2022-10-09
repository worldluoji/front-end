// https://react-redux.js.org/using-react-redux/usage-with-typescript
import {addCard, removeCard, Card, CardListDispatch} from './CardStore'
import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

// store.dispatch(addCard({ title: '开发任务-1' }))
// // [{ title: '开发任务-1' }]

const CardList = () => {
    const cardList = useSelector((state: Card[]) => state)
    
    const dispatch:CardListDispatch = useDispatch()

    const [newTask, setNewTask] = useState('')
    const onChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewTask(e.target.value)
    }
    const onAdd = () => {
        if (!newTask || newTask === '') {
            alert('输入不能为空')
            return
        }
        dispatch(addCard({ title: newTask }))
    }
    return (
        <div>
            <ul>
                { cardList && cardList.map(c => {
                    return (
                        <li key={c.title}>
                            {c.title}
                            <button onClick={() => {dispatch(removeCard({ title: c.title }))}}>删除</button>
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