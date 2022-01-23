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
import ErrorPage from './pages/ErrorPage'
import UpdatePost from './pages/UpdatePost'
import GlobalStyle from './utils/styles/GlobalStyle'

const App = () => {
  return (
    <div className='App'>
      <ThemeProvider>
        <CurrentUserProvider>
          <UserProvider>
            <GlobalStyle />
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route element={<ProtectedRoutes />}>
                <Route path='/groupomania' element={<Home />} />
                <Route path='/groupomania/create-post' element={<AddPost />} />
                <Route
                  path='/groupomania/create-post/:articleId'
                  element={<UpdatePost />}
                />
                <Route path='/profile/:id' element={<Profile />} />
              </Route>
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </UserProvider>
        </CurrentUserProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
