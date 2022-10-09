import store, {addCard, removeCard, Card} from './CardStore'
import React, {useState} from "react"

store.dispatch(addCard({ title: '开发任务-1' }))
// [{ title: '开发任务-1' }]
store.dispatch(addCard({ title: '测试任务-2' }))
// [{ title: '测试任务-2' }, { title: '开发任务-1' }]
store.dispatch(removeCard({ title: '开发任务-1' }))
// [{ title: '测试任务-2' }]
const CardList = () => {
    const [cardList, setCardList] = useState<Card[]>(store.getState())

    const [newTask, setNewTask] = useState('')
    const onChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewTask(e.target.value)
    }
    const onClick = () => {
        if (!newTask || newTask === '') {
            alert('输入不能为空')
            return
        }
        store.dispatch(addCard({ title: newTask }))
        setCardList(store.getState())
    }
    return (
        <div>
            <ul>
                { cardList && cardList.map(c => {
                    return (
                        <li key={c.title}>{c.title}</li>
                    )
                })}
            </ul>
            <div>
                <input type="text" onChange={onChange}/>
                <button onClick={onClick}>新增</button>
            </div>
        </div>
    )
}

export default CardList