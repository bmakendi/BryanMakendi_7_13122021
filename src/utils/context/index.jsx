import { createContext, useState } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const toggleLogged = () => {
    setIsLogged(localStorage.length < 2 ? false : true)
  }
  return (
    <UserContext.Provider value={{ isLogged, toggleLogged }}>
      {children}
    </UserContext.Provider>
  )
}
