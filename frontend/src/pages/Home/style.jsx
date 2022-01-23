import styled from 'styled-components'
import colors from '../../utils/colors'
import Select from '@mui/material/Select'
import RoundedBtn from '../../components/RoundedBtn'

export const MainWrapper = styled.main`
  padding: 2.125rem 1.8125rem;
  border-bottom: ${({ page }) =>
    page === 'profile' && `1px solid ${colors.lightgrey}`};
  border-bottom: ${({ page, isDarkMode }) =>
    page === 'profile' && isDarkMode && `1px solid ${colors.darkBorderColor}`};
  @media all and (min-width: 1024px) {
    padding: 2.125rem 9rem;
  }
`
export const Filters = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${({ isDarkMode }) => isDarkMode && '#FFF'};
  svg {
    color: ${({ isDarkMode }) => isDarkMode && '#FFF'};
  }
  p {
    font-weight: 500;
  }
  @media all and (min-width: 1024px) {
    justify-content: start;
    gap: 16px;
  }
`
export const StyledSelect = styled(Select)`
  color: ${({ $isDarkMode }) => $isDarkMode && '#FFF'};
  div {
    border-radius: 10px;
    padding: 9px 20px;
    font-weight: 400;
    color: ${({ $isDarkMode }) => $isDarkMode && '#FFF'};
    background-color: ${({ $isDarkMode }) =>
      $isDarkMode && `${colors.lighterDark}`};
  }

  fieldset {
    border-radius: 10px;
    border-color: ${({ $isDarkMode }) =>
      $isDarkMode ? `${colors.lighterDark}` : `${colors.lightgrey}`};
    color: ${({ $isDarkMode }) => $isDarkMode && '#FFF'};
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
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  @media all and (min-width: 1024px) {
    position: initial;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 217px;
    height: 2.5rem;
    opacity: 1;
    background-color: ${colors.blue};
  }
`
export const PostsContainer = styled.div`
  @media all and (min-width: 1024px) {
    padding: 0 2rem;
  }
`
