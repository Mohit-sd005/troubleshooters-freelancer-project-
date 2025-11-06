import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('ts_user') || 'null')

  const logout = () => {
    localStorage.removeItem('ts_user')
    navigate('/login')
  }

  return (
    <div className="header">
      <div className="container nav">
        <Link to="/"><strong>TroubleShooters</strong></Link>
        <div className="spacer" />
        {user ? (
          <>
            <span className="badge">{user.role}</span>
            {user.role === 'CLIENT' && <Link to="/client" className="btn light">My Ads</Link>}
            {user.role === 'DEVELOPER' && <Link to="/developer" className="btn light">Browse Ads</Link>}
            <button className="btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn light">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        )}
      </div>
    </div>
  )
}
