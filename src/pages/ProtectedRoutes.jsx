import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../utils/context'

const ProtectedRoutes = () => {
  const { isLogged } = useContext(UserContext)
  return isLogged ? <Outlet /> : <Navigate to='/' replace />
}

export default ProtectedRoutes
