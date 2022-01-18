import styled from 'styled-components'
import colors from '../../utils/colors'

export const ProfileBtn = styled.div`
  width: ${({ deleteBtn }) => (deleteBtn ? '12.0625rem' : '11rem')};
  height: ${({ deleteBtn }) => (deleteBtn ? '2.875rem' : '2.5rem')};
  padding: ${({ deleteBtn }) => !deleteBtn && '0 0.8125rem 0 0.375rem'};
  margin: ${({ deleteBtn }) => deleteBtn && 'auto'};
  margin-top: ${({ deleteBtn }) => deleteBtn && '3.1875rem'};
  display: flex;
  align-items: center;
  justify-content: ${({ deleteBtn }) =>
    deleteBtn ? 'center' : 'space-between'};
  border: solid 1px ${colors.lightgrey};
  border-radius: 10px;
  color: ${({ deleteBtn }) => deleteBtn && colors.red};
  font-size: 0.9375rem;
  font-weight: ${({ deleteBtn }) => (deleteBtn ? '600' : '500')};
  &:hover {
    border-color: ${({ deleteBtn }) => deleteBtn && colors.red};
  }
  & > * {
    display: flex;
    align-items: center;
  }
  cursor: pointer;
`
