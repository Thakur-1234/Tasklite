import React, { useEffect, useMemo, useState } from 'react'
import TodoList from './TodoList'
import TodoStats from './TodoStats'
import TopBar from './TopBar'

const keyForUser = (email) => `tgdi_todo_items_${email}`

const loadTodos = (email) => {
  try {
    const raw = localStorage.getItem(keyForUser(email))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveTodos = (email, todos) => {
  localStorage.setItem(keyForUser(email), JSON.stringify(todos))
}

function TodoApp({ user, onLogout }) {
  const [todos, setTodos] = useState(() => loadTodos(user.email))
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [newTask, setNewTask] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    saveTodos(user.email, todos)
  }, [todos, user.email])

  const handleAdd = (e) => {
    e.preventDefault()
    const text = newTask.trim()
    if (!text) return

    const now = new Date().toISOString()
    const todo = {
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      text,
      priority,
      dueDate: dueDate || null,
      completed: false,
      createdAt: now,
    }
    setTodos((prev) => [todo, ...prev])
    setNewTask('')
    setPriority('medium')
    setDueDate('')
  }

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const handleUpdate = (id, updates) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  const filtered = useMemo(() => {
    let list = [...todos]

    if (filter === 'active') {
      list = list.filter((t) => !t.completed)
    } else if (filter === 'completed') {
      list = list.filter((t) => t.completed)
    } else if (filter === 'today') {
      const today = new Date().toISOString().slice(0, 10)
      list = list.filter((t) => t.dueDate && t.dueDate === today)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((t) => t.text.toLowerCase().includes(q))
    }

    list.sort((a, b) => {
      if (sortBy === 'createdAt') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      if (sortBy === 'dueDate') {
        return (a.dueDate || '').localeCompare(b.dueDate || '')
      }
      if (sortBy === 'priority') {
        const order = { high: 0, medium: 1, low: 2 }
        return (order[a.priority] ?? 3) - (order[b.priority] ?? 3)
      }
      return 0
    })

    return list
  }, [todos, filter, search, sortBy])

  return (
    <div className="todo-layout">
      <TopBar user={user} onLogout={onLogout} />

      <main className="todo-main">
        <section className="todo-panel glass">
          <form className="todo-form" onSubmit={handleAdd}>
            <div className="field">
              <label>Add new task</label>
              <input
                type="text"
                placeholder="Add New Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="field">
                <label>Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="field">
                <label>Due date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <button type="submit" className="primary-btn full">
                Add Task
              </button>
            </div>
          </form>

          <div className="toolbar">
            <div className="filters">
              {['all', 'active', 'completed', 'today'].map((f) => (
                <button
                  key={f}
                  className={filter === f ? 'chip active' : 'chip'}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all'
                    ? 'All'
                    : f === 'active'
                    ? 'Active'
                    : f === 'completed'
                    ? 'Completed'
                    : 'Due today'}
                </button>
              ))}
            </div>
            <div className="toolbar-right">
              <input
                className="search"
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="createdAt">Newest</option>
                <option value="dueDate">Due date</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>

          <TodoList
            todos={filtered}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </section>

        <TodoStats todos={todos} />
      </main>
    </div>
  )
}

export default TodoApp
