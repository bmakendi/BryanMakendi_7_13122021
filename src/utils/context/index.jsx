import { createContext, useState } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  let preferred = localStorage.getItem('theme')
  const initialTheme = prefersDark ? 'dark' : 'light'
  const [theme, setTheme] = useState(preferred ? preferred : initialTheme)
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
    preferred = localStorage.getItem('theme')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const updateCurrentUser = user => {
    setCurrentUser(user)
  }
  return (
    <CurrentUserContext.Provider value={{ currentUser, updateCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem('loggedIn') === 'true'
  )
  const toggleLogged = () => {
    setIsLogged(localStorage.length < 2 ? false : true)
  }
  return (
    <UserContext.Provider value={{ isLogged, toggleLogged }}>
      {children}
    </UserContext.Provider>
  )
}
