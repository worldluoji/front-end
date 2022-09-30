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
    status: string,
    onDragStart: React.DragEventHandler
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

    // drag事件参考：https://juejin.cn/post/6998672428020793358
    const handleDragStart: React.DragEventHandler = (evt) => {
        // 所有拖拉事件的实例都有一个DragEvent.dataTransfer属性，用来读写需要传递的数据。这个属性的值是一个DataTransfer接口的实例
        evt.dataTransfer.effectAllowed = 'move'
        evt.dataTransfer.setData('text/plain', boardCardProps.title)
        boardCardProps.onDragStart && boardCardProps.onDragStart(evt)
    }

    return (
      <li className="kanban-card" draggable onDragStart={ handleDragStart }>
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
    title: string | JSX.Element,
    setIsDragSource?: (arg0: boolean) => void,
    setIsDragTarget?: (arg0: boolean) => void,
    onDrop?: (evt: React.DragEvent<HTMLElement>) => void
} 
  
const KanBanBoardColumn = (kanbanColumnProps: KanbanColumnProps) => {
    const combinedClassName = `kanban-column ${kanbanColumnProps.className}`
    return (
        <section
            onDragStart = {() => kanbanColumnProps.setIsDragSource && kanbanColumnProps.setIsDragSource(true)}
            onDragOver={(evt) => {
                // 拖拉到当前节点上方时，在当前节点上持续触发（相隔几百毫秒），该事件的target属性是当前节点
                evt.preventDefault()
                // 设置可移动被拖拉的节点
                evt.dataTransfer.dropEffect = 'move'
                kanbanColumnProps.setIsDragTarget && kanbanColumnProps.setIsDragTarget(true)
            }}
            onDragLeave={(evt) => {
                // 拖拉操作离开当前节点范围时，在当前节点上触发，该事件的target属性是当前节点
                evt.preventDefault()
                // 设置无法放下被拖拉的节点
                evt.dataTransfer.dropEffect = 'none'
                kanbanColumnProps.setIsDragTarget && kanbanColumnProps.setIsDragTarget(false)
            }}
            onDrop={(evt) => {
                // 释放到目标节点时，在目标节点触发
                evt.preventDefault()
                kanbanColumnProps.onDrop && kanbanColumnProps.onDrop(evt)
            }} 
            onDragEnd={(evt) => {
                // 拖拉结束时（释放鼠标或按下ESC）, target是被拖拉的节点
                evt.preventDefault()
                kanbanColumnProps.setIsDragTarget && kanbanColumnProps.setIsDragTarget(false)
                kanbanColumnProps.setIsDragSource && kanbanColumnProps.setIsDragSource(false)
            }}  
            className={ combinedClassName }>
            <h2>{ kanbanColumnProps.title }</h2>
            <ul>{ kanbanColumnProps.children }</ul>
        </section>
    )
}

const DATA_STORE_KEY = 'kanban-data-store'
const COLUMN_KEY_TODO = 'todo'
const COLUMN_KEY_ONGOING = 'ongoing'
const COLUMN_KEY_DONE = 'done'

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

    // draggedItem是拖拽的某个任务卡片
    const [draggedItem, setDraggedItem] = useState({title: '', status: ''})
    // source和target是看板的column，即未完成、进行中、或已完成
    const [dragSource, setDragSource] = useState('')
    const [dragTarget, setDragTarget] = useState('')

    const handleDrop = (evt: React.DragEvent<HTMLElement>) => {
        if (!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget) {
            return
        }
        
        const updaters = {
            [COLUMN_KEY_TODO]: setTodoList,
            [COLUMN_KEY_ONGOING]: setOngoingList,
            [COLUMN_KEY_DONE]: setDoneList
        }

        if (dragSource && (dragSource === COLUMN_KEY_TODO
            || dragSource === COLUMN_KEY_ONGOING || dragSource === COLUMN_KEY_DONE)){
                // 这里 currentStat是源column，就是把拖拽的卡片从当前列删除掉
                updaters[dragSource]((currentStat) => 
                // Object.is() 与 == 不同。== 运算符在判断相等前对两边的变量（如果它们不是同一类型）进行强制转换（这种行为将 "" == false 判断为 true），而 Object.is 不会强制转换两边的值。
                // Object.is() 与 === 也不相同。差别是它们对待有符号的零和 NaN 不同，例如，=== 运算符（也包括 == 运算符）将数字 -0 和 +0 视为相等，而将 Number.NaN 与 NaN 视为不相等。
                currentStat.filter((item) => !Object.is(item, draggedItem))
            )
        }

        
        if (dragTarget && (dragTarget === COLUMN_KEY_TODO
            || dragTarget === COLUMN_KEY_ONGOING || dragTarget === COLUMN_KEY_DONE)) {
                // 这里 currentStat 是目标 column， 就是把拖拽的卡片放入目标列
                updaters[dragTarget]((currentStat) => [draggedItem, ...currentStat])
        }
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
                    <KanBanBoardColumn 
                        className="column-todo" 
                        title={ todoTitle } 
                        onDrop={ handleDrop }
                        setIsDragSource={(isDragSource) => setDragSource(isDragSource? COLUMN_KEY_TODO: '')}
                        setIsDragTarget={(isDragTarget) => setDragTarget(isDragTarget? COLUMN_KEY_TODO: '')}>
                        { showAdd && <BoardNewCard onSubmit={ handleSubmit }/> }
                        { todoList.map(props => <BoardCard key={ props.title } 
                            onDragStart={() => setDraggedItem(props)}
                            { ...props }/>) }
                    </KanBanBoardColumn>
                    <KanBanBoardColumn 
                        className="column-ongoing" 
                        title="进行中"
                        onDrop={ handleDrop }
                        setIsDragSource={(isDragSource) => setDragSource(isDragSource? COLUMN_KEY_ONGOING: '')}
                        setIsDragTarget={(isDragTarget) => setDragTarget(isDragTarget? COLUMN_KEY_ONGOING: '')}>
                        { ongoingList.map(props => <BoardCard key={ props.title } 
                            onDragStart={() => setDraggedItem(props)}
                            { ...props }/>) }
                    </KanBanBoardColumn>
                    <KanBanBoardColumn 
                        className="column-done" 
                        title="已完成"
                        onDrop={ handleDrop }
                        setIsDragSource={(isDragSource) => setDragSource(isDragSource? COLUMN_KEY_DONE: '')}
                        setIsDragTarget={(isDragTarget) => setDragTarget(isDragTarget? COLUMN_KEY_DONE: '')}>
                        { doneList.map(props => <BoardCard  key={ props.title } 
                            onDragStart={() => setDraggedItem(props)}
                            { ...props }/>) }
                    </KanBanBoardColumn>
                </>)}
                
            </KanBanBoard>
        </div>
    )
}

export default Board