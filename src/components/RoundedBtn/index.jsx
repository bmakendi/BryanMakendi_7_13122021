import styled from 'styled-components'
import { ButtonUnstyled } from '@mui/material'
import colors from '../../utils/colors'

const RoundedBtn = styled(ButtonUnstyled)`
  z-index: 100;
  padding: 18px 0;
  margin-bottom: 2.1875rem;
  background-color: ${colors.blue};
  border-radius: 30px;
  border: none;
  color: #fff;
  font-weight: 700;
  font-size: 1.125rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.hoverBlue};
  }
`
export default RoundedBtn
