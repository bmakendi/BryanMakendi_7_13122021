import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ThemeProvider } from './utils/context'

const App = () => {
  return (
    <div className='App'>
      <ThemeProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
