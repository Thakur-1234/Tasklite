import React, { useMemo } from 'react'

function TodoStats({ todos }) {
  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter((t) => t.completed).length
    const active = total - completed
    const high = todos.filter((t) => t.priority === 'high' && !t.completed).length
    const todayStr = new Date().toISOString().slice(0, 10)
    const today = todos.filter((t) => t.dueDate === todayStr).length

    return { total, completed, active, high, today }
  }, [todos])

  const percent =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100)

  return (
    <aside className="stats-panel glass">
      <h2>Overview</h2>
      <p className="muted tiny">Quick snapshot you can show to faculty ✨</p>

      <div className="progress-ring">
        <div className="progress-inner">
          <span>{percent}%</span>
          <p className="tiny muted">done</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total tasks</span>
          <strong className="stat-value">{stats.total}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Completed</span>
          <strong className="stat-value">{stats.completed}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pending</span>
          <strong className="stat-value">{stats.active}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">High priority</span>
          <strong className="stat-value">{stats.high}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Due today</span>
          <strong className="stat-value">{stats.today}</strong>
        </div>
      </div>

      <ul className="tiny checklist">
        <li>✓ LocalStorage based auth (no backend)</li>
        <li>✓ Per‑user tasks</li>
        <li>✓ Filters &amp; search</li>
        <li>✓ Priority &amp; due date</li>
        <li>✓ Completion analytics</li>
      </ul>
    </aside>
  )
}

export default TodoStats
