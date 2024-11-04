import React, { ReactNode, useState } from "react"
import BoardCard, { BoardCardProps } from './BoardCard'
import BoardNewCard from "./BoardNewCard"

interface KanbanColumnProps {
    children?: ReactNode
    className: string
    title: string
    cardList: BoardCardProps[]
    canAddNew?: boolean
    setIsDragSource?: (arg0: boolean) => void
    setIsDragTarget?: (arg0: boolean) => void
    onDrop?: (evt: React.DragEvent<HTMLElement>) => void
    setDraggedItem?: React.Dispatch<React.SetStateAction<BoardCardProps>>
}

export default function KanBanBoardColumn(kanbanColumnProps: KanbanColumnProps) {
    const combinedClassName = `kanban-column ${kanbanColumnProps.className}`
    const [showAdd, setShowAdd] = useState(false)
    const handleAdd = (evt: React.FormEvent<HTMLButtonElement>) => {
        setShowAdd(true)
    }

    const handleSubmit = (title: string) => {
        kanbanColumnProps.cardList.unshift({ title, status: new Date().toLocaleString() })
        setShowAdd(false)
    }

    return (
        <section
            onDragStart={() => kanbanColumnProps.setIsDragSource && kanbanColumnProps.setIsDragSource(true)}
            onDragOver={(evt) => {
                // 拖拉到当前节点上方时，在当前节点上持续触发（相隔几百毫秒），该事件的target属性是当前节点
                evt.preventDefault();
                // 设置可移动被拖拉的节点
                evt.dataTransfer.dropEffect = 'move'
                kanbanColumnProps.setIsDragTarget && kanbanColumnProps.setIsDragTarget(true)
            } }
            onDragLeave={(evt) => {
                // 拖拉操作离开当前节点范围时，在当前节点上触发，该事件的target属性是当前节点
                evt.preventDefault();
                // 设置无法放下被拖拉的节点
                evt.dataTransfer.dropEffect = 'none';
                kanbanColumnProps.setIsDragTarget && kanbanColumnProps.setIsDragTarget(false)
            } }
            onDrop={(evt) => {
                // 释放到目标节点时，在目标节点触发
                evt.preventDefault();
                kanbanColumnProps.onDrop && kanbanColumnProps.onDrop(evt)
            } }
            onDragEnd={(evt) => {
                // 拖拉结束时（释放鼠标或按下ESC）, target是被拖拉的节点
                evt.preventDefault();
                kanbanColumnProps.setIsDragTarget && kanbanColumnProps.setIsDragTarget(false)
                kanbanColumnProps.setIsDragSource && kanbanColumnProps.setIsDragSource(false)
            } }
            className={combinedClassName}>
            <h2>{kanbanColumnProps.title}</h2>
            { kanbanColumnProps.canAddNew && 
                (<button onClick={ handleAdd } disabled={ showAdd }>&#8853; 添加新卡片</button>)
            }
            { showAdd && <BoardNewCard onAdd={ handleSubmit }/> }
            <ul>
                { kanbanColumnProps.cardList.map(props => 
                    <BoardCard key={ props.title } 
                               onDragStart={() => kanbanColumnProps.setDraggedItem && kanbanColumnProps.setDraggedItem(props)}
                               { ...props }
                    />) 
                }
            </ul>
        </section>
    )
}
