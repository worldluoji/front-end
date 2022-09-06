import React, { ReactNode, useState } from "react"
import './board.css'
// @emotion/react provide the ability of css in js
import styled from '@emotion/styled'

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

interface KanBanBoardProps {
    children: ReactNode
}

// https://emotion.sh/docs/typescript
const Main = styled('main')`
    flex: 10;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin: 0 1rem 1rem;
`
const KanBanBoard = (kanBanBoardProps: KanBanBoardProps) => (
    <Main>{ kanBanBoardProps.children }</Main>
)

interface KanbanColumnProps extends KanBanBoardProps {
    className: string,
    title: string | JSX.Element
} 
  
const KanBanBoardColumn = (kanbanColumnProps: KanbanColumnProps) => {
    const combinedClassName = `kanban-column ${kanbanColumnProps.className}`
    return (
        <section className={ combinedClassName }>
            <h2>
                { kanbanColumnProps.title }
            </h2>
            <ul>{ kanbanColumnProps.children }</ul>
        </section>
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

    
    const todoTitle = (
        <>
            <span>待处理</span><button onClick={ handleAdd }
            disabled={ showAdd }>&#8853; 添加新卡片</button>
        </>
    )

    return (
        <div className="board">
            <header className="board-header">
                <h1>我的看板</h1>
            </header>
            <KanBanBoard>
                <KanBanBoardColumn className="column-todo" title={ todoTitle }>
                    { showAdd && <BoardNewCard onSubmit={ handleSubmit }/> }
                    { todoList.map(props => <BoardCard key={ props.title } { ...props }/>) }
                </KanBanBoardColumn>
                <KanBanBoardColumn className="column-ongoing" title="进行中">
                    { ongoingList.map(props => <BoardCard key={ props.title } { ...props }/>) }
                </KanBanBoardColumn>
                <KanBanBoardColumn className="column-done" title="已完成">
                    { doneList.map(props => <BoardCard  key={ props.title } { ...props }/>) }
                </KanBanBoardColumn>
            </KanBanBoard>
        </div>
    )
}

export default Board