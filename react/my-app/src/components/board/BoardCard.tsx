import React, { useState, useEffect } from "react"

export const MINUTE = 60 * 1000
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const UPDATE_INTERVAL = MINUTE

export interface BoardCardProps {
    title: string
    status: string
    onDragStart?: React.DragEventHandler
}

export default function BoardCard(boardCardProps: BoardCardProps) {
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
        <li className="kanban-card" draggable onDragStart={handleDragStart}>
            <div className="card-title">{boardCardProps.title}</div>
            <div className="card-status">{displayTime}</div>
        </li>
    )
}
