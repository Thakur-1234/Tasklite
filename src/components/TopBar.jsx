import React from 'react'

function TopBar({ user, onLogout }) {
  const firstLetter = user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()

  return (
    <header className="topbar">
      <div>
        <h1 className="app-title">TaskLite's Dashboard</h1>
        <p className="muted tiny">
          Welcome back, <strong>{user.name || user.email}</strong>
        </p>
      </div>
      <div className="topbar-right">
        <div className="avatar">{firstLetter}</div>
        <button className="ghost-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default TopBar
