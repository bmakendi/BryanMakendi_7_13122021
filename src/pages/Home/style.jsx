import styled from 'styled-components'
import colors from '../../utils/colors'
import Select from '@mui/material/Select'
import RoundedBtn from '../../components/RoundedBtn'

export const MainWrapper = styled.main`
  padding: 2.125rem 1.8125rem;
  border-bottom: ${({ page }) =>
    page === 'profile' && `1px solid ${colors.lightgrey}`};
`
export const Filters = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  p {
    font-weight: 500;
  }
`
export const StyledSelect = styled(Select)`
  div {
    padding: 9px 20px;
    font-weight: 400;
  }

  fieldset {
    border-radius: 10px;
    border-color: ${colors.lightgrey};
  }
`
export const AddPostBtn = styled(RoundedBtn)`
  position: fixed;
  bottom: 24px;
  width: 250px;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 0;
  font-size: 1rem;
  background-color: ${colors.postBtn};
  opacity: 0.75;
  backdrop-filter: blur(50px);
`
export const PostsContainer = styled.div``
