import React from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  if (!todos.length) {
    return <p className="muted center">No tasks here. Add your first one 💪</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  )
}

export default TodoList
