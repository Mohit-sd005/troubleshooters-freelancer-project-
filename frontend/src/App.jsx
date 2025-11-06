import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import ClientDashboard from './pages/ClientDashboard'
import CreateAd from './pages/CreateAd'
import EditAd from './pages/EditAd'
import DeveloperDashboard from './pages/DeveloperDashboard'
import ViewAd from './pages/ViewAd'
import ViewAcceptors from './pages/ViewAcceptors'

const RequireAuth = ({ children }) => {
  const u = JSON.parse(localStorage.getItem('ts_user') || 'null')
  return u ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/client" element={<RequireAuth><ClientDashboard /></RequireAuth>} />
          <Route path="/client/create" element={<RequireAuth><CreateAd /></RequireAuth>} />
          <Route path="/client/edit/:id" element={<RequireAuth><EditAd /></RequireAuth>} />
          <Route path="/client/acceptors/:id" element={<RequireAuth><ViewAcceptors /></RequireAuth>} />

          <Route path="/developer" element={<RequireAuth><DeveloperDashboard /></RequireAuth>} />
          <Route path="/ad/:id" element={<RequireAuth><ViewAd /></RequireAuth>} />
        </Routes>
      </div>
    </>
  )
}
