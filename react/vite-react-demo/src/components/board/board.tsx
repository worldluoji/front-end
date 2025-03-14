import { useState, useEffect } from "react"
import { css } from "@emotion/react"
import './board.css'
import { BoardCardProps } from "./BoardCard"
import KanBanBoard, {COLUMN_KEY_TODO, COLUMN_KEY_ONGOING, COLUMN_KEY_DONE } from "./KanBanBoard"


const DATA_STORE_KEY = 'kanban-data-store'

// gap: row-gap column-gap; gap: 20px 50px; 设置行间距为 20px，列间距为 50px：
const boardStyle = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100vh;
    text-align: center;
`

const boardHeaderStyle = css`
    flex: 1;
    margin: 1rem 1rem 0; /*上 左右 下*/
    border-radius: 1rem;
    background-color: #282c34;
    min-height: 5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const boardTitleStyle = css`
    font-size: calc(10px + 2vmin);
    color: white;
`

function Board() {

    /**
    * 这四个 state 是标题栏和 KanbanBoard 的共享应用状态，需要放在 标题栏和 KanbanBoard 共同的父组件 Board 中（虽然我们没有把 标题栏抽取成独立的组件，但逻辑上是一样的）。
    * 这个过程被称作状态提升（Lifting State Up），也是我们在做 React 组件设计开发时会经常用到的一个技巧。
    */
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

    const updaters = {
        [COLUMN_KEY_TODO]: setTodoList,
        [COLUMN_KEY_ONGOING]: setOngoingList,
        [COLUMN_KEY_DONE]: setDoneList
    }

    const handleAdd = (column: string, newCard: BoardCardProps) => {
        if (column === COLUMN_KEY_TODO || column === COLUMN_KEY_ONGOING || column === COLUMN_KEY_DONE) {
            updaters[column]((currentStat: BoardCardProps[]) => [newCard, ...currentStat])
        }    
    }

    // Object.is() 与 == 不同。== 运算符在判断相等前对两边的变量（如果它们不是同一类型）进行强制转换（这种行为将 "" == false 判断为 true），而 Object.is 不会强制转换两边的值。
    // Object.is() 与 === 也不相同。差别是它们对待有符号的零和 NaN 不同，例如，=== 运算符（也包括 == 运算符）将数字 -0 和 +0 视为相等，而将 Number.NaN 与 NaN 视为不相等。
    const handleRemove = (column: string, cardToRemove: BoardCardProps) => {
        if (column === COLUMN_KEY_TODO || column === COLUMN_KEY_ONGOING || column === COLUMN_KEY_DONE) {    
            updaters[column]((currentStat: BoardCardProps[]) => currentStat.filter((item) => !Object.is(item, cardToRemove)))
        }
    }

    return (
        <div css={ boardStyle }>
            <header css={ boardHeaderStyle }>
                <h1 css={ boardTitleStyle }>我的看板</h1><h2><button onClick={ handleSaveAll }>保存所有卡片</button></h2>
            </header>
            <KanBanBoard todoList={todoList} 
                         ongoingList={ongoingList} 
                         doneList={doneList} 
                         isLoading={isLoading}
                         handleAdd={handleAdd}
                         handleRemove={handleRemove}
            />
        </div>
    )
}

export default Board