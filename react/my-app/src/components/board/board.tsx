import React, { useState } from "react"
import './board.css'


const todoList = [
    { title: '开发任务-1', status: '22-05-22 18:15' },
    { title: '开发任务-3', status: '22-05-22 18:15' },
    { title: '开发任务-5', status: '22-05-22 18:15' },
    { title: '测试任务-3', status: '22-05-22 18:15' }
]

const ongoingList = [
    { title: '开发任务-4', status: '22-05-22 18:15' },
    { title: '开发任务-6', status: '22-05-22 18:15' },
    { title: '测试任务-2', status: '22-05-22 18:15' }
]
  
const doneList = [
    { title: '开发任务-2', status: '22-05-22 18:15' },
    { title: '测试任务-1', status: '22-05-22 18:15' }
]

interface Card {
    title: string,
    status: string
}

const KanbanCard = (card: Card) => {
    return (
      <li className="kanban-card">
        <div className="card-title">{card.title}</div>
        <div className="card-status">{card.status}</div>
      </li>
    )
}

interface Submit {
    onSubmit: (title: string) => void
}

// type Submit = (title: string) => void
const KanbanNewCard = ({ onSubmit } : Submit) => {
    const [title, setTitle] = useState('')
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        setTitle(evt.target.value)
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (evt) => {
        if (evt.key === 'Enter') {
            onSubmit(title)
        }
    }

    return (
      <li className="kanban-card">
        <h3>添加新卡片</h3>
        <div className="card-title">
          <input type="text" value={ title }
          onChange={ handleChange } onKeyDown={ handleKeyDown }/>
        </div>
      </li>
    )
}

function Board() {
    const [showAdd, setShowAdd] = useState(false)
    const handleAdd = (evt: React.FormEvent<HTMLButtonElement>) => {
        setShowAdd(true)
    }

    const handleSubmit = (title: string) => {
        todoList.unshift({ title, status: new Date().toDateString() })
        setShowAdd(false)
    }

    return (
        <div className="board">
            <header className="board-header">
                <h1>我的看板</h1>
            </header>
            <main className="kanban-board">
                <section className="kanban-column column-todo">
                    <h2>
                        待处理
                        <button onClick={ handleAdd } disabled={ showAdd }>添加新卡片</button>
                    </h2>
                    <ul>
                        { showAdd && <KanbanNewCard onSubmit={ handleSubmit }/> }
                        { todoList.map(props => <KanbanCard {...props}/>) }
                    </ul>
                </section>
                <section className="kanban-column column-ongoing">
                    <h2>进行中</h2>
                    <ul>
                        { ongoingList.map(props => <KanbanCard {...props}/>) }
                    </ul>
                </section>
                <section className="kanban-column column-done">
                    <h2>已完成</h2>
                    <ul>
                        { doneList.map(props => <KanbanCard {...props}/>) }
                    </ul>
                </section>
            </main>
        </div>
    )
}

export default Board