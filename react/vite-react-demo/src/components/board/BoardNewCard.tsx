import React, { useState } from "react"

interface BoardCardOperations {
    onAdd: (title: string) => void
}

export default function BoardNewCard({ onAdd }: BoardCardOperations) {
    const [title, setTitle] = useState('')
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        setTitle(evt.target.value)
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (evt) => {
        if (evt.key === 'Enter') {
            onAdd(title)
        }
    }

    return (
        <li className="kanban-card">
            <h3>添加新卡片</h3>
            <div className="card-title">
                <input type="text" value={title}
                    onChange={handleChange} onKeyDown={handleKeyDown} />
            </div>
        </li>
    )
}
