import styled from 'styled-components'
import { TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import colors from '../../utils/colors'

export const MainLayout = styled.div`
  padding: 0 1.81rem;
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
`
export const StyledInput = styled(TextField)`
  fieldset {
    border-radius: 10px;
    border-color: ${colors.grey};
  }
  input {
    padding: 16px 14px 16px 0;
    background-color: white;
    &::placeholder {
      color: ${colors.grey};
      font-size: 1.0625rem;
      opacity: 1;
    }
  }
`
export const StyledLink = styled(Link)`
  color: #000;
  font-weight: bold;
  font-size: 1.125rem;
  align-self: center;
  &:hover {
    border-bottom: 1px solid #000;
  }
`
export const TopRightDeco = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
`
export const BottomLeftDeco = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: ${({ zindex }) => zindex};
`
