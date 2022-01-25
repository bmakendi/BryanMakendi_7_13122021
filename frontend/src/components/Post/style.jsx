import styled from 'styled-components'
import colors from '../../utils/colors'
import { IconButton, TextareaAutosize } from '@mui/material'

export const PostWrapper = styled.article`
  padding: 36px 0 21px;
  border-bottom: solid 1px
    ${({ $isDarkMode }) =>
      $isDarkMode ? `${colors.darkBorderColor}` : `${colors.lightgrey}`};
  .interaction-icon {
    width: 36px;
    height: 36px;
    background-color: ${({ $isDarkMode }) =>
      $isDarkMode ? `${colors.lighterDark}` : `${colors.lightgrey}`};
    color: ${colors.iconGrey};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: ${({ $isDarkMode }) =>
        $isDarkMode ? `${colors.darkHover}` : `${colors.lightblue}`};
      color: ${colors.blue};
    }
  }
`
export const UpperContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export const UserDisplay = styled.div`
  display: flex;
  gap: 11px;
  margin-bottom: 15px;
`
export const UserPicture = styled.img`
  width: ${({ comment }) => (comment ? '2.25rem' : '2.5rem')};
  height: ${({ comment }) => (comment ? '2.25rem' : '2.5rem')};
  object-fit: cover;
  border-radius: 50%;
`
export const UserInfo = styled.div`
  div,
  p {
    color: ${({ $isDarkMode }) => $isDarkMode && '#FFF'};
  }
`
export const UserName = styled.p`
  font-weight: bold;
`
export const SubInfo = styled.div``
export const Admin = styled.span`
  display: ${({ admin }) => (admin ? 'inline' : 'none')};
  font-size: 0.875rem;
`
export const Date = styled.span`
  font-size: 0.813rem;
  color: ${colors.grey};
`
export const PostText = styled.div`
  max-height: 6.625rem;
  margin-bottom: 1.25rem;
  p {
    color: ${({ $isDarkMode }) => $isDarkMode && '#FFF'};
  }
`
export const PostTitle = styled.p`
  font-weight: 500;
  margin-bottom: 14px;
  max-height: 3.5625rem;
`
export const PostContent = styled.p`
  font-size: 0.9375rem;
  max-height: 2.5rem;
  white-space: pre-wrap;
`
export const Interactions = styled.div`
  display: flex;
  justify-content: space-between;
`
export const LikeIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  .like-icon {
    background-color: ${({ liked, $isDarkMode }) =>
      liked && !$isDarkMode && `${colors.lightblue}`};
    background-color: ${({ liked, $isDarkMode }) =>
      liked && $isDarkMode && `${colors.darkHover}`};
    color: ${({ liked }) => (liked ? `${colors.blue}` : `${colors.iconGrey}`)};
  }
  span {
    color: ${colors.iconGrey};
    font-size: 0.875rem;
    font-weight: 700;
  }
`
export const LikeIcon = styled.div``
export const CommentIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  span {
    color: ${colors.iconGrey};
    font-size: 0.875rem;
    font-weight: 700;
  }
`
export const CommentIcon = styled.div``
export const MoreIcon = styled(IconButton)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ $isDarkMode }) =>
    $isDarkMode ? `${colors.lighterDark}` : `${colors.lightgrey}`};
  svg {
    color: ${colors.iconGrey};
  }
`
export const PostOptions = styled.div`
  position: relative;
`
export const CommentSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 100%;
  gap: 17px;
  margin-top: 0.9375rem;
`
export const CommentInput = styled(TextareaAutosize)`
  padding: 0.8125rem 0.625rem;
  width: 14.7rem;
  min-height: 2.5rem;
  max-height: 2.5rem;
  border: 1px solid
    ${({ $isDarkMode }) =>
      $isDarkMode ? `${colors.dark}` : `${colors.lightgrey}`};
  border-radius: 30px;
  font-family: 'Roboto';
  font-size: 0.9375rem;
  flex: 1;
  background-color: #fff;
  &::placeholder {
    position: absolute;
    opacity: 1;
    font-family: 'Roboto';
    font-size: 0.9375rem;
    top: 10px;
    color: ${colors.iconGrey};
  }
`
export const SendBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.grey};
  background-color: ${colors.lightgrey};
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 100%;
  cursor: pointer;
  &:hover {
    color: ${colors.blue};
    background-color: ${colors.lightblue};
  }
`
export const Comments = styled.div`
  margin-left: 2.625rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
`
