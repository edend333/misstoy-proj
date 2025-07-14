import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.loggedinUser)

  return (
    <header className="app-header">
      <div className="logo">
        <h1>MissToy 🧸</h1>
      </div>

      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/toy">Toys</Link>
        {!user && <Link to="/login">Login</Link>}
        {user && <span className="user-msg">Hello, {user.fullname}!</span>}
      </nav>
   </header>
  )
}
