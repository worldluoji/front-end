
import React, { useState } from "react"
// @emotion/react provide the ability of css in js
import styled from '@emotion/styled'
import KanBanBoardColumn from "./KanBanBoardColumn";
import { BoardCardProps } from "./BoardCard";

export const COLUMN_KEY_TODO = 'todo'
export const COLUMN_KEY_ONGOING = 'ongoing'
export const COLUMN_KEY_DONE = 'done'

export interface KanBanBoardProps {
    isLoading: boolean
    todoList: BoardCardProps[]
    ongoingList: BoardCardProps[]
    doneList: BoardCardProps[]
    handleAdd: (column: string, newCard: BoardCardProps) => void
    handleRemove: (column: string, cardToRemove: BoardCardProps) => void
}


// https://emotion.sh/docs/typescript
const Main = styled('main')`
    flex: 10;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin: 0 1rem 1rem;
`;
export default function KanBanBoard(kanBanBoardProps: KanBanBoardProps) {

    // draggedItem是拖拽的某个任务卡片
    let boardCard: BoardCardProps = {title: '', status: ''}
    const [draggedItem, setDraggedItem] = useState(boardCard)
    // source和target是看板的column，即未完成、进行中、或已完成
    const [dragSource, setDragSource] = useState('')
    const [dragTarget, setDragTarget] = useState('')

    const handleDrop = (evt: React.DragEvent<HTMLElement>) => {
        if (!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget) {
            return
        }
     
        // 把拖拽的卡片从当前列删除掉
        kanBanBoardProps.handleRemove(dragSource, draggedItem)
   
        // 把拖拽的卡片放入目标列
        kanBanBoardProps.handleAdd(dragTarget, draggedItem)
      
    }
    
    return (
        <Main>
            { kanBanBoardProps.isLoading ? (
                    <KanBanBoardColumn cardList={[]} className="column-loading" title='读取中...'></KanBanBoardColumn>
                ) : (<>
                    <KanBanBoardColumn 
                        className="column-todo" 
                        title="待处理" 
                        onDrop={ handleDrop }
                        setIsDragSource={(isDragSource) => setDragSource(isDragSource? COLUMN_KEY_TODO: '')}
                        setIsDragTarget={(isDragTarget) => setDragTarget(isDragTarget? COLUMN_KEY_TODO: '')}
                        cardList={ kanBanBoardProps.todoList }
                        setDraggedItem={setDraggedItem}
                        canAddNew={true}>
                    </KanBanBoardColumn>
                    <KanBanBoardColumn 
                        className="column-ongoing" 
                        title="进行中"
                        onDrop={ handleDrop }
                        setIsDragSource={(isDragSource) => setDragSource(isDragSource? COLUMN_KEY_ONGOING: '')}
                        setIsDragTarget={(isDragTarget) => setDragTarget(isDragTarget? COLUMN_KEY_ONGOING: '')}
                        cardList={kanBanBoardProps.ongoingList}
                        setDraggedItem={setDraggedItem}>
                    </KanBanBoardColumn>
                    <KanBanBoardColumn 
                        className="column-done" 
                        title="已完成"
                        onDrop={ handleDrop }
                        setIsDragSource={(isDragSource) => setDragSource(isDragSource? COLUMN_KEY_DONE: '')}
                        setIsDragTarget={(isDragTarget) => setDragTarget(isDragTarget? COLUMN_KEY_DONE: '')}
                        cardList={ kanBanBoardProps.doneList }
                        setDraggedItem={setDraggedItem}>
                    </KanBanBoardColumn>
                </>)}
        </Main>
    )
}
