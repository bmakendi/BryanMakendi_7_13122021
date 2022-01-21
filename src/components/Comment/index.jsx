import colors from '../../utils/colors'
import styled from 'styled-components'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Delete from '@mui/icons-material/Delete'
import { MoreIcon } from '../Post'
import { useFormatDate } from '../../utils/hooks'
import { useState } from 'react'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { Options, OptionItem } from '../../components/Options'

const CommentWrapper = styled.div`
  padding: 7px 9px;
  background-color: ${colors.lightergrey};
  border-radius: 10px;
`
const UpperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .interaction-icon {
    width: 36px;
    height: 36px;
    background-color: ${colors.lightgrey};
    color: ${colors.iconGrey};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  .username {
    font-size: 0.9375rem;
    font-weight: 500;
  }
  .commentDate {
    font-size: 0.8125rem;
    color: ${colors.grey};
  }
`
const UserPicture = styled.img`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  object-fit: cover;
`
const CommentContent = styled.p`
  padding: 0 1.55rem 0.75rem 2.6875rem;
  font-size: 0.9375rem;
`
const CommentOptions = styled.div`
  position: relative;
`

const Comment = ({
  commentId,
  name,
  firstname,
  picture,
  content,
  date,
  ownerId,
  currentUser,
  articleId,
  updateComments,
}) => {
  const [open, setOpen] = useState(false)
  const fullname = firstname + ' ' + name
  const formattedDate = useFormatDate(date)
  const currentUserIsComOwner = currentUser.id === ownerId
  const currentUserIsAdmin = currentUser.admin

  const handleClickAway = () => {
    setOpen(false)
  }

  const handleDeleteComment = async () => {
    const token = localStorage.getItem('token').replace(/['"]+/g, '')
    const bearer = 'Bearer ' + token
    const apiRoute = `http://localhost:8000/articles/comments/${commentId}`
    const body = {
      userId: localStorage.getItem('userId'),
      admin: currentUser.admin,
    }
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: bearer },
      body: JSON.stringify(body),
    }
    try {
      const response = await fetch(apiRoute, requestOptions)
      const data = await response.json()
      console.log(data)
      updateComments(`http://localhost:8000/articles/${articleId}/comments`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CommentWrapper>
      <UpperWrapper>
        <UserInfo>
          <UserPicture src={picture} alt='Auteur du commentaire' />
          <p className='username'>
            {fullname} <span className='commentDate'>• {formattedDate}</span>
          </p>
        </UserInfo>
        {(currentUserIsAdmin || currentUserIsComOwner) && (
          <CommentOptions>
            <MoreIcon
              onClick={() => setOpen(prev => !prev)}
              className={open && 'interaction-icon'}
            >
              <MoreHorizIcon />
            </MoreIcon>
            {open && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <Options>
                  <OptionItem onClick={handleDeleteComment}>
                    <Delete />
                    Supprimer
                  </OptionItem>
                </Options>
              </ClickAwayListener>
            )}
          </CommentOptions>
        )}
      </UpperWrapper>
      <CommentContent>{content}</CommentContent>
    </CommentWrapper>
  )
}

export default Comment
