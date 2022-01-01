import { Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './pages/ProtectedRoutes'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { ThemeProvider, UserProvider } from './utils/context'

const App = () => {
  return (
    <div className='App'>
      <ThemeProvider>
        <UserProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/groupomania' element={<Home />} />
            </Route>
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
