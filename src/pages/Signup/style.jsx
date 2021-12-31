import styled from 'styled-components'
import colors from '../../utils/colors'

export const NameWrapper = styled.div`
  display: flex;
  gap: 12px;
  input {
    padding-left: 14px;
  }
`
export const SignupResult = styled.div`
  border-radius: 15px;
  background-color: ${colors.blue};
  box-shadow: 4px 6px 6px ${colors.lightblue};
  opacity: 0.6;
  position: absolute;
  top: 5rem;
  left: ${({ error }) => (error ? '23%' : '30%')};
  padding: 1rem;
  color: #fff;
`
