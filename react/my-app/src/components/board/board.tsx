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
    
        // 副作用回调函数的返回值也是一个函数，这个返回的函数叫做清除函数。组件在下一次提交阶段执行同一个副作用回调函数之前，或者是组件即将被卸载之前，会调用这个清除函数
        // 在调用setDisplayTime 更新 state 后，组件会重新渲染，在页面上就能看到卡片显示了最新的相对时间。如果不清理定时器会怎样？如果是在更新阶段，组件就可能会有多个定时器在跑，会产生竞争条件；如果组件已被卸载，那么有可能导致内存泄露。
        // 如果依赖值数组是一个空数组，那么清除函数只会在卸载组件时执行
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
    children?: ReactNode
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

const DATA_STORE_KEY = 'kanban-data-store'

function Board() {

    const [todoList, setTodoList] = useState([
        { title: '开发任务-1', status: '2022-05-22 18:15' },
        { title: '开发任务-3', status: '2022-05-22 13:15' },
        { title: '开发任务-5', status: '2022-06-22 16:15' },
        { title: '测试任务-3', status: '2022-08-22 19:15' }
    ])
    
    const [ongoingList, setOngoingList] = useState([
        { title: '开发任务-4', status: '2022-05-22 13:15' },
        { title: '开发任务-6', status: '2022-08-22 14:15' },
        { title: '测试任务-2', status: '2022-09-12 18:15' }
    ])
      
    const [doneList, setDoneList] = useState([
        { title: '开发任务-2', status: '2022-09-11 13:15' },
        { title: '测试任务-1', status: '2022-05-22 19:15' }
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

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const data = window.localStorage.getItem(DATA_STORE_KEY)
        // 模拟一秒从后端获取数据，这里从localstorage获取
        setTimeout(() => {
            if (data) {
                const boardData = JSON.parse(data)
                setTodoList(boardData.todoList)
                setOngoingList(boardData.ongoingList)
                setDoneList(boardData.doneList)
            }
            setIsLoading(false)
        }, 1000)
    }, [])

    const handleSaveAll = () => {
        const data = JSON.stringify({
            todoList,
            ongoingList,
            doneList
        })
        window.localStorage.setItem(DATA_STORE_KEY, data)
    }

    

    return (
        <div className="board">
            <header className="board-header">
                <h1>我的看板</h1><h2><button onClick={ handleSaveAll }>保存所有卡片</button></h2>
            </header>
            <KanBanBoard>
                { isLoading ? (
                    <KanBanBoardColumn className="column-loading" title='读取中...'></KanBanBoardColumn>
                ) : (<>
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
                </>)}
                
            </KanBanBoard>
        </div>
    )
}

export default Board