import styled from 'styled-components'
import colors from '../../utils/colors'

export const NameWrapper = styled.div`
  display: flex;
  gap: 12px;
  input {
    padding-left: 14px;
  }
`
export const ResultMsg = styled.div`
  border-radius: 15px;
  background-color: ${colors.blue};
  opacity: 1;
  position: absolute;
  width: 250px;
  left: 0;
  right: 0;
  top: 5.5rem;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  padding: 1rem;
  color: #fff;
`
