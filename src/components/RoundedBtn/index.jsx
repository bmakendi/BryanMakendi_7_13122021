import styled from 'styled-components'
import { ButtonUnstyled } from '@mui/material'
import colors from '../../utils/colors'

const RoundedBtn = styled(ButtonUnstyled)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 18px 0;
  margin-bottom: 2.1875rem;
  margin-bottom: ${({ answer }) => answer && 0};
  min-width: ${({ answer }) => answer && '140px'};
  max-height: ${({ answer }) => answer && '40px'};
  background-color: ${colors.blue};
  border-radius: 30px;
  border: none;
  color: #fff;
  font-weight: 700;
  font-size: 1.125rem;
  font-size: ${({ answer }) => answer && '1rem'};
  cursor: pointer;
  &:hover {
    background-color: ${colors.hoverBlue};
  }
`
export default RoundedBtn
