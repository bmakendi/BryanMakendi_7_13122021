import styled from 'styled-components'
import colors from '../../utils/colors'
import { TextField, TextareaAutosize, ButtonUnstyled } from '@mui/material'

export const Cancel = styled.p`
  margin-bottom: 2.75rem;
  font-weight: 500;
`
export const TitleBox = styled.h1`
  padding: 0 0.5625rem 0.75rem;
  margin-bottom: 2.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${colors.grey};
  border-bottom: 1px solid ${colors.lightgrey};
`
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`
export const StyledInput = styled(TextField)`
  width: 100%;
  font-size: 1rem;
  div {
    margin-bottom: 1.3125rem;
  }
  fieldset {
    min-height: 3.0625rem;
    border: 1px solid ${colors.grey};
    border-radius: 10px;
  }
  input {
    padding: 0.875rem 0.825rem;
    &::placeholder {
      color: ${colors.grey};
      opacity: 1;
    }
  }
`
export const StyledTextArea = styled(TextareaAutosize)`
  padding: 0.875rem 0.825rem;
  margin-bottom: 38px;
  min-width: 100%;
  max-width: 100%;
  min-height: 21.4375rem;
  max-height: 21.4375rem;
  border: 1px solid ${colors.grey};
  border-radius: 10px;
  font-family: 'Roboto';
  font-size: 1rem;
  &::placeholder {
    color: ${colors.grey};
    opacity: 1;
    font-family: 'Roboto';
    font-size: 1rem;
  }
`
export const PublishBtn = styled(ButtonUnstyled)`
  padding: 15px 55px;
  width: 176px;
  align-self: flex-end;
  position: relative;
  color: #fff;
  background-color: ${colors.blue};
  border: none;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  span,
  svg {
    height: 22px;
    width: 22px;
    position: absolute;
    top: 6.5px;
    right: 5px;
  }
  &:hover {
    background-color: ${colors.hoverBlue};
  }
`
