import { createGlobalStyle } from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from '../context'
import colors from '../colors'

const StyledGlobalStyle = createGlobalStyle`
body {
  background-color: ${({ isDarkMode }) => isDarkMode && `${colors.dark}`};
}
`

const GlobalStyle = () => {
  const { theme } = useContext(ThemeContext)
  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

export default GlobalStyle
