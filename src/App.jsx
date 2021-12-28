import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { ThemeProvider } from './utils/context'

const App = () => {
  return (
    <div className='App'>
      <ThemeProvider>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
