import React, { useState } from "react"
import './board.css'

interface BoardCardProps {
    title: string,
    status: string
}

const BoardCard = (boardCardProps: BoardCardProps) => {
    return (
      <li className="kanban-card">
        <div className="card-title">{boardCardProps.title}</div>
        <div className="card-status">{boardCardProps.status}</div>
      </li>
    )
}

interface BoardCardOperations {
    onSubmit: (title: string) => void
}

// type Submit = (title: string) => void
const BoardNewCard = ({ onSubmit } : BoardCardOperations) => {
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

    const [todoList, setTodoList] = useState([
        { title: '开发任务-1', status: '22-05-22 18:15' },
        { title: '开发任务-3', status: '22-05-22 18:15' },
        { title: '开发任务-5', status: '22-05-22 18:15' },
        { title: '测试任务-3', status: '22-05-22 18:15' }
    ])
    
    const [ongoingList, setOngoingList] = useState([
        { title: '开发任务-4', status: '22-05-22 18:15' },
        { title: '开发任务-6', status: '22-05-22 18:15' },
        { title: '测试任务-2', status: '22-05-22 18:15' }
    ])
      
    const [doneList, setDoneList] = useState([
        { title: '开发任务-2', status: '22-05-22 18:15' },
        { title: '测试任务-1', status: '22-05-22 18:15' }
    ])

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
                        { showAdd && <BoardNewCard onSubmit={ handleSubmit }/> }
                        { todoList.map(props => <BoardCard {...props}/>) }
                    </ul>
                </section>
                <section className="kanban-column column-ongoing">
                    <h2>进行中</h2>
                    <ul>
                        { ongoingList.map(props => <BoardCard {...props}/>) }
                    </ul>
                </section>
                <section className="kanban-column column-done">
                    <h2>已完成</h2>
                    <ul>
                        { doneList.map(props => <BoardCard {...props}/>) }
                    </ul>
                </section>
            </main>
        </div>
    )
}

export default Board