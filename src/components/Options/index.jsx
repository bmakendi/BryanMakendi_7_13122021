import styled from 'styled-components'
import colors from '../../utils/colors'

export const Options = styled.div`
  position: absolute;
  right: 0;
  width: 227px;
  margin-top: 1.5px;
  border: solid 1px ${colors.lightgrey};
  box-shadow: 2px 4px 4px ${colors.lightgrey};
  border-radius: 10px;
  background-color: #fff;
  color: ${({ menu }) => (menu ? '#000' : `${colors.grey}`)};
  font-size: 0.9375rem;
  font-weight: 500;
`
export const OptionItem = styled.p`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px 28px;
  color: ${({ menu }) => menu && `${colors.red}`};
  border-bottom: ${({ topOption }) =>
    topOption && `1px solid ${colors.lightgrey}`};
  cursor: pointer;
  &:hover {
    color: ${({ menu }) => !menu && `${colors.blue}`};
    font-weight: ${({ menu }) => menu && '600'};
  }
`
