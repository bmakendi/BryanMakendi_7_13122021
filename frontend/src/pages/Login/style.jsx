import styled from 'styled-components'
import { TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import colors from '../../utils/colors'

export const MainLayout = styled.div`
  max-width: 330px;
  margin: auto;
`
export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 17px;
  margin: 10.06rem 0 3.0625rem 0;
`
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 27px;
  input,
  input:-internal-autofill-selected {
    color: ${({ $isDarkMode }) => $isDarkMode && `#fff`};
    border-radius: 10px;
    background-color: ${({ $isDarkMode }) =>
      $isDarkMode ? `${colors.dark}` : `#fff`} !important;
    &::placeholder {
      color: ${({ $isDarkMode }) => ($isDarkMode ? `#fff` : `${colors.grey}`)};
    }
  }
  div {
    color: ${({ $isDarkMode }) => $isDarkMode && `#fff`};
  }
  fieldset {
    border-color: ${({ $isDarkMode }) =>
      $isDarkMode ? `#fff` : `${colors.grey}`};
  }
`
export const StyledInput = styled(TextField)`
  position: relative;
  fieldset {
    border-radius: 10px;
  }
  input {
    padding: 16px 14px 16px 0;
    &::placeholder {
      font-size: 1.0625rem;
      opacity: 1;
    }
  }
  .MuiFormHelperText-root {
    position: absolute;
    bottom: -1rem;
    margin-left: 0;
    width: 100%;
    font-size: 0.688rem;
    font-weight: 500;
    line-height: 13px;
    letter-spacing: 0;
  }
`
export const StyledLink = styled(Link)`
  color: ${({ $isDarkMode }) => ($isDarkMode ? `#fff` : `#000`)};
  font-weight: bold;
  font-size: 1.125rem;
  align-self: center;
  &:hover {
    border-bottom: 1px solid
      ${({ $isDarkMode }) => ($isDarkMode ? `#fff` : `#000`)};
  }
`
export const TopRightDeco = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  max-width: ${({ mw }) => mw}px;
  z-index: -1;
  @media all and (min-width: 760px) {
    width: 50%;
  }
  @media all and (min-width: 1020) {
    width: 60%;
  }
`
export const BottomLeftDeco = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: ${({ w }) => w}%;
  max-width: ${({ mw }) => mw}px;
  z-index: ${({ zindex }) => zindex};
`
