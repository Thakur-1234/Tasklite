import React, { useState } from 'react'

const USERS_KEY = 'tgdi_todo_users'

const loadUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function AuthForm({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const resetForm = () => {
    setPassword('')
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const users = loadUsers()
    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail || !password) {
      setError('Please fill all required fields.')
      return
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your name.')
        return
      }
      if (password.length < 6) {
        setError('Password should be at least 6 characters.')
        return
      }
      if (users[normalizedEmail]) {
        setError('Account already exists. Please login instead.')
        return
      }
      const newUser = {
        name: name.trim(),
        email: normalizedEmail,
        createdAt: new Date().toISOString(),
      }
      users[normalizedEmail] = { ...newUser, password }
      saveUsers(users)
      onLogin(newUser)
    } else {
      const record = users[normalizedEmail]
      if (!record || record.password !== password) {
        setError('Invalid email or password.')
        return
      }
      const { password: _pw, ...user } = record
      onLogin(user)
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-card glass">
        <div className="brand">
          <div className="brand-logo">TL</div>
          <div>
            <h1>TaskLite</h1>
            <p className="muted">
              Srijan's Minor Project
            </p>
          </div>
        </div>

        <div className="auth-toggle">
          <button
            className={mode === 'login' ? 'chip active' : 'chip'}
            onClick={() => {
              setMode('login')
              resetForm()
            }}
          >
            Login
          </button>
          <button
            className={mode === 'signup' ? 'chip active' : 'chip'}
            onClick={() => {
              setMode('signup')
              resetForm()
            }}
          >
            Sign up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Srijan Suman"
              />
            </div>
          )}

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button className="primary-btn" type="submit">
            {mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>

        <p className="tiny">
          Note: This is a frontend‑only demo. All data is stored safely in your
          browser&apos;s localStorage. <br />
          @ICFAI UNIVERSITY
        </p>
      </div>
    </div>
  )
}

export default AuthForm
