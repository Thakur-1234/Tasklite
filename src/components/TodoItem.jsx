import React, { useState } from 'react'

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftText, setDraftText] = useState(todo.text)

  const saveEdit = () => {
    const text = draftText.trim()
    if (!text) return
    onUpdate(todo.id, { text })
    setIsEditing(false)
  }

  const badgeClass = `badge badge-${todo.priority}`

  return (
    <li className={todo.completed ? 'todo-item completed' : 'todo-item'}>
      <div className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <div className="todo-text-block">
          {isEditing ? (
            <input
              className="edit-input"
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveEdit()
                if (e.key === 'Escape') setIsEditing(false)
              }}
              autoFocus
            />
          ) : (
            <p onDoubleClick={() => setIsEditing(true)}>{todo.text}</p>
          )}
          <div className="meta-row">
            <span className={badgeClass}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} priority
            </span>
            {todo.dueDate && (
              <span className="tiny muted">Due: {todo.dueDate}</span>
            )}
          </div>
        </div>
      </div>
      <button className="icon-btn" onClick={() => onDelete(todo.id)}>
        ✕
      </button>
    </li>
  )
}

export default TodoItem
