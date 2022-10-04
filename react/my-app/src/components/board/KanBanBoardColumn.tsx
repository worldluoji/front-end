import React, { ReactNode } from "react"

interface KanbanColumnProps {
    children?: ReactNode
    className: string
    title: string | JSX.Element
    setIsDragSource?: (arg0: boolean) => void
    setIsDragTarget?: (arg0: boolean) => void
    onDrop?: (evt: React.DragEvent<HTMLElement>) => void
}
export default function KanBanBoardColumn(kanbanColumnProps: KanbanColumnProps) {
    const combinedClassName = `kanban-column ${kanbanColumnProps.className}`
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
            <ul>{kanbanColumnProps.children}</ul>
        </section>
    )
}
