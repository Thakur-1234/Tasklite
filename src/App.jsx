import React, { useEffect, useState } from 'react'
import AuthForm from './components/AuthForm'
import TodoApp from './components/TodoApp'

const STORAGE_KEY = 'tgdi_todo_current_user'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved))
      } catch {
        console.error('Failed to parse current user')
      }
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [currentUser])

  const handleLogout = () => {
    setCurrentUser(null)
  }

  return (
    <div className="app-shell">
      {!currentUser ? (
        <AuthForm onLogin={setCurrentUser} />
      ) : (
        <TodoApp user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
