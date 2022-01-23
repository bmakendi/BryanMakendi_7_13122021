import styled from 'styled-components'
import colors from '../../utils/colors'
import { Link } from 'react-router-dom'

export const ProfileTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 0.625rem;
  margin-top: 1.25rem;
  color: ${colors.grey};
  border-bottom: 1px solid ${colors.lightgrey};
  .title {
    font-weight: 500;
    font-size: 1.25rem;
    color: ${({ isDarkMode }) => isDarkMode && `#fff`};
  }
  .admin {
    font-weight: 500;
    font-size: 0.875rem;
  }
`
export const ProfileInfo = styled.div`
  margin-top: 1.5625rem;
  text-align: center;
`
export const ProfilePictureWrapper = styled.div`
  margin-bottom: ${({ marginbot }) => (marginbot ? '3.5rem' : '1.375rem')};
  position: relative;
`
export const ProfilePicture = styled.img`
  width: 6.25rem;
  height: 6.25rem;
  object-fit: cover;
  border-radius: 50%;
  &:hover {
    opacity: ${({ editable }) => editable && '0.8'};
    cursor: ${({ editable }) => editable && 'pointer'};
  }
`
export const EditUserInfo = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-weight: 500;
  font-size: 0.875rem;
  color: ${colors.grey};
  cursor: pointer;
  svg {
    width: 1.375rem;
    height: 1.375rem;
  }
`
export const ProfileUserName = styled.h2`
  margin-bottom: 1.75rem;
  font-size: 1.1875rem;
  font-weight: 600;
  color: ${({ isDarkMode }) => isDarkMode && `#fff`};
`
export const ProfileJobWrapper = styled.div`
  margin-bottom: 1.1875rem;
`
export const UserJob = styled.p`
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 1.0625rem;
  color: ${({ isDarkMode }) => isDarkMode && `#fff`};
`
export const ProfileUserJob = styled.input`
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 1.0625rem;
  text-align: center;
  border: none;
  color: ${({ $isDarkMode }) => ($isDarkMode ? `#fff` : `#000`)};
  background-color: ${({ $isDarkMode }) =>
    $isDarkMode ? `${colors.lighterDark}` : `${colors.lightergrey}`};
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ $isDarkMode }) =>
      $isDarkMode ? `${colors.darkHover}` : `${colors.lightgrey}`};
  }
`
export const ProfileUserContact = styled(Link)`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1.0625rem;
  color: ${colors.blue};
  svg {
    width: 1.375rem;
    height: 1.375rem;
  }
`
