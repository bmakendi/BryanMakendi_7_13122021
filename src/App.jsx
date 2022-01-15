import { Routes, Route } from 'react-router-dom'
import { ProtectedRoutes } from './pages/ProtectedRoutes'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import AddPost from './pages/AddPost'
import Profile from './pages/Profile'
import {
  CurrentUserProvider,
  ThemeProvider,
  UserProvider,
} from './utils/context'

const App = () => {
  return (
    <div className='App'>
      <ThemeProvider>
        <CurrentUserProvider>
          <UserProvider>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route element={<ProtectedRoutes />}>
                <Route path='/groupomania' element={<Home />} />
                <Route path='/groupomania/create-post' element={<AddPost />} />
                <Route path='/profile/:id' element={<Profile />} />
              </Route>
            </Routes>
          </UserProvider>
        </CurrentUserProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
