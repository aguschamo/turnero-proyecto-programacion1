import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'

function RoleRoute({ roles }) {
  const { isAuthenticated, role } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (!roles.includes(role)) {
    return <Navigate to="/denegado" replace />
  }

  return <Outlet />
}

export default RoleRoute