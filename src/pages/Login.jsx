import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service.js'
import { setLoggedinUser } from '../store/user.slice.js' 

export function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleChange(ev) {
    const { name, value } = ev.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  async function onLogin(ev) {
    ev.preventDefault()
    try {
      const user = await authService.login(credentials)
      localStorage.setItem('loggedinUser', JSON.stringify(user)) 
      dispatch(setLoggedinUser(user)) 
      navigate('/') 
    } catch (err) {
      console.error('Login failed:', err)
      alert('Invalid credentials')
    }
  }

  return (
    <section className="login-page">
      <h1>Login</h1>
      <form onSubmit={onLogin}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button>Login</button>
      </form>
    </section>
  )
}
