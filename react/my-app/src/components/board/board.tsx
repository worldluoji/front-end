import React, { useState, useEffect } from "react"
import './board.css'
import BoardCard from "./BoardCard"
import BoardNewCard from "./BoardNewCard"
import KanBanBoard from "./KanBanBoard"
import KanBanBoardColumn from "./KanBanBoardColumn"


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