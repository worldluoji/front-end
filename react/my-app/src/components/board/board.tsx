import React, { ReactNode, useState, useEffect } from "react"
import './board.css'
// @emotion/react provide the ability of css in js
import styled from '@emotion/styled'

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const UPDATE_INTERVAL = MINUTE

interface BoardCardProps {
    title: string,
    status: string
}

const BoardCard = (boardCardProps: BoardCardProps) => {
    const [displayTime, setDisplayTime] = useState(boardCardProps.status)

    useEffect(() => {
        const updateDisplayTime = () => {
          const timePassed = Date.now() - new Date(boardCardProps.status).getTime()

          let relativeTime = '刚刚'
          
          if (MINUTE <= timePassed && timePassed < HOUR) {
            relativeTime = `${Math.ceil(timePassed / MINUTE)} 分钟前`
          } else if (HOUR <= timePassed && timePassed < DAY) {
            relativeTime = `${Math.ceil(timePassed / HOUR)} 小时前`
          } else if (DAY <= timePassed) {
            relativeTime = `${Math.ceil(timePassed / DAY)} 天前`
          }
          setDisplayTime(relativeTime)
        }
        const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL)
        updateDisplayTime()
    
        return function cleanup() {
          clearInterval(intervalId)
        }
    }, [boardCardProps.status])

    return (
      <li className="kanban-card">
        <div className="card-title">{boardCardProps.title}</div>
        <div className="card-status">{displayTime}</div>
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
        { title: '开发任务-1', status: '2022-05-22 18:15' },
        { title: '开发任务-3', status: '2022-05-22 18:15' },
        { title: '开发任务-5', status: '2022-05-22 18:15' },
        { title: '测试任务-3', status: '2022-05-22 18:15' }
    ])
    
    const [ongoingList, setOngoingList] = useState([
        { title: '开发任务-4', status: '2022-05-22 18:15' },
        { title: '开发任务-6', status: '2022-05-22 18:15' },
        { title: '测试任务-2', status: '2022-09-12 18:15' }
    ])
      
    const [doneList, setDoneList] = useState([
        { title: '开发任务-2', status: '2022-09-11 18:15' },
        { title: '测试任务-1', status: '2022-05-22 18:15' }
    ])

    const [showAdd, setShowAdd] = useState(false)
    const handleAdd = (evt: React.FormEvent<HTMLButtonElement>) => {
        setShowAdd(true)
    }

    const handleSubmit = (title: string) => {
        todoList.unshift({ title, status: new Date().toLocaleString() })
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