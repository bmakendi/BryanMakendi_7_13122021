import styled from 'styled-components'
import colors from '../../utils/colors'

export const Options = styled.div`
  position: absolute;
  right: 0;
  width: 227px;
  margin-top: 1.5px;
  border: solid 1px
    ${({ isDarkMode }) =>
      isDarkMode ? `${colors.lighterDark}` : `${colors.lightgrey}`};
  box-shadow: 2px 4px 4px
    ${({ isDarkMode }) =>
      isDarkMode ? `${colors.dark}` : `${colors.lightgrey}`};
  border-radius: 10px;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? `${colors.lighterDark}` : `#fff`};
  color: ${({ menu }) => (menu ? '#000' : `${colors.grey}`)};
  .disconnect {
    color: ${colors.red};
  }
  font-size: 0.9375rem;
  font-weight: 500;
  z-index: 1000;
  p {
    color: ${({ isDarkMode }) => isDarkMode && `#fff`};
  }
  .border-bot {
    border-bottom: 1px solid
      ${({ isDarkMode }) =>
        isDarkMode ? `${colors.darkBorderColor}` : `${colors.lightgrey}`};
  }
  @media all and (min-width: 1024px) {
    top: 45px;
  }
`
export const OptionItem = styled.p`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px 28px;
  .disconnect {
    color: ${colors.red};
  }
  border-bottom: ${({ topOption }) =>
    topOption && `1px solid ${colors.lightgrey}`};
  cursor: pointer;
  &:hover {
    color: ${({ menu }) => !menu && `${colors.blue}`};
    font-weight: ${({ menu }) => menu && '600'};
  }
`
