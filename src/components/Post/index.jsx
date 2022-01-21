import PropTypes from 'prop-types'
import DefaultPicture from '../../assets/images/profile.png'
import styled from 'styled-components'
import colors from '../../utils/colors'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import { IconButton, TextareaAutosize } from '@mui/material'
import { useEffect, useState } from 'react'
import { Options, OptionItem } from '../../components/Options'
import {
  useFetchComments,
  useFormatDate,
  useFetchLikes,
} from '../../utils/hooks'
import { Link, useNavigate } from 'react-router-dom'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Comment from '../Comment'

const PostWrapper = styled.article`
  padding: 36px 0 21px;
  border-bottom: solid 1px ${colors.lightgrey};
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
const UpperContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const UserDisplay = styled.div`
  display: flex;
  gap: 11px;
  margin-bottom: 15px;
`
const UserPicture = styled.img`
  width: ${({ comment }) => (comment ? '2.25rem' : '2.5rem')};
  height: ${({ comment }) => (comment ? '2.25rem' : '2.5rem')};
  object-fit: cover;
  border-radius: 50%;
`
const UserInfo = styled.div``
const UserName = styled.p`
  font-weight: bold;
`
const SubInfo = styled.div``
const Admin = styled.span`
  display: ${({ admin }) => (admin ? 'inline' : 'none')};
  font-size: 0.875rem;
`
const Date = styled.span`
  font-size: 0.813rem;
  color: ${colors.grey};
`
const PostText = styled.div`
  max-height: 6.625rem;
  margin-bottom: 1.25rem;
`
const PostTitle = styled.p`
  font-weight: 500;
  margin-bottom: 14px;
  max-height: 3.5625rem;
`
const PostContent = styled.p`
  font-size: 0.9375rem;
  max-height: 2.5rem;
`
const Interactions = styled.div`
  display: flex;
  justify-content: space-between;
  .interaction-icon:hover {
    background-color: ${colors.lightblue};
    color: ${colors.blue};
  }
`
const LikeIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  .like-icon {
    background-color: ${({ liked }) =>
      liked ? `${colors.lightblue}` : `${colors.lightgrey}`};
    color: ${({ liked }) => (liked ? `${colors.blue}` : `${colors.iconGrey}`)};
  }
  span {
    color: ${colors.iconGrey};
    font-size: 0.875rem;
    font-weight: 700;
  }
`
const LikeIcon = styled.div``
const CommentIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  span {
    color: ${colors.iconGrey};
    font-size: 0.875rem;
    font-weight: 700;
  }
`
const CommentIcon = styled.div``
export const MoreIcon = styled(IconButton)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  @media all {
    &:hover {
      background-color: ${colors.lightgrey};
    }
  }
  svg {
    color: ${colors.iconGrey};
  }
`
const PostOptions = styled.div`
  position: relative;
`
const CommentSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 100%;
  gap: 17px;
  margin-top: 0.9375rem;
`
const CommentInput = styled(TextareaAutosize)`
  padding: 0.8125rem 0.625rem;
  width: 14.7rem;
  min-height: 2.5rem;
  max-height: 2.5rem;
  border: 1px solid ${colors.lightgrey};
  border-radius: 30px;
  font-family: 'Roboto';
  font-size: 0.9375rem;
  flex: 1;
  &::placeholder {
    position: absolute;
    color: ${colors.iconGrey};
    opacity: 1;
    font-family: 'Roboto';
    font-size: 0.9375rem;
    top: 10px;
  }
`
const SendBtn = styled.div`
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
const Comments = styled.div`
  margin-left: 2.625rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Post = ({
  articleId,
  title,
  content,
  firstname,
  name,
  admin,
  date,
  picture,
  postCreator,
  currentUser,
  updateArticles,
}) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [openComments, setOpenComments] = useState(false)
  const [liked, setLiked] = useState(false)
  const [comment, setComment] = useState('')
  const { comments, error, updateComments } = useFetchComments(
    `http://localhost:8000/articles/${articleId}/comments`
  )
  const { likes, updateLikes } = useFetchLikes(
    `http://localhost:8000/articles/${articleId}/likes`
  )

  const fullname = firstname + ' ' + name
  const pic = picture ? picture : DefaultPicture
  const formattedDate = useFormatDate(date)
  const currentUserOwnsPost = postCreator === currentUser.id

  useEffect(() => {
    if (likes.find(like => like.UserId === currentUser.id)) setLiked(true)
  }, [currentUser.id, likes])

  const sendComment = async () => {
    if (comment || comment !== '') {
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('token').replace(/['"]+/g, '')
      const bearer = 'Bearer ' + token
      const body = {
        userId: userId,
        content: comment,
      }
      const url = `http://localhost:8000/articles/${articleId}/comments`
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: bearer },
        body: JSON.stringify(body),
      }
      try {
        const response = await fetch(url, requestOptions)
        const data = await response.json()
        console.log(data)
        updateComments(`http://localhost:8000/articles/${articleId}/comments`)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleDeleteArticle = async () => {
    const token = localStorage.getItem('token').replace(/['"]+/g, '')
    const bearer = 'Bearer ' + token
    const apiRoute = `http://localhost:8000/articles/${articleId}`
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
      updateArticles('http://localhost:8000/articles/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenComments = () => {
    setOpenComments(prev => !prev)
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  const handleModifyPost = () => {
    navigate(`/groupomania/create-post/${articleId}`, { replace: true })
  }

  const handleClickLike = async () => {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token').replace(/['"]+/g, '')
    const bearer = 'Bearer ' + token
    const body = {
      userId: userId,
    }
    if (!liked) {
      const url = `http://localhost:8000/articles/${articleId}/likes`
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: bearer },
        body: JSON.stringify(body),
      }
      try {
        const response = await fetch(url, requestOptions)
        const data = await response.json()
        console.log(data)
        setLiked(true)
        updateLikes(`http://localhost:8000/articles/${articleId}/likes`)
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('already liked')
      const url = `http://localhost:8000/articles/${articleId}/likes`
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: bearer },
        body: JSON.stringify(body),
      }
      try {
        const response = await fetch(url, requestOptions)
        const data = await response.json()
        console.log(data)
        setLiked(false)
        updateLikes(`http://localhost:8000/articles/${articleId}/likes`)
      } catch (err) {
        console.log(err)
      }
    }
  }

  if (error) return <div>Oh oh une erreur...</div>

  return (
    <>
      <PostWrapper>
        <UpperContainer>
          <UserDisplay>
            <UserPicture src={pic} alt='Créateur du post' />
            <UserInfo>
              <Link to={`/profile/${postCreator}`}>
                <UserName>{fullname}</UserName>
              </Link>
              <SubInfo>
                <Admin admin={admin === true}>Modérateur • </Admin>
                <Date>{formattedDate}</Date>
              </SubInfo>
            </UserInfo>
          </UserDisplay>
          {(currentUser.admin || currentUserOwnsPost) && (
            <PostOptions>
              <MoreIcon
                onClick={() => setOpen(prev => !prev)}
                className={open && 'interaction-icon'}
              >
                <MoreHorizIcon />
              </MoreIcon>
              {open && (
                <ClickAwayListener onClickAway={handleClickAway}>
                  <Options>
                    {currentUserOwnsPost && (
                      <OptionItem topOption={true} onClick={handleModifyPost}>
                        <EditIcon />
                        Modifier le post
                      </OptionItem>
                    )}
                    <OptionItem onClick={handleDeleteArticle}>
                      <DeleteIcon />
                      Supprimer le post
                    </OptionItem>
                  </Options>
                </ClickAwayListener>
              )}
            </PostOptions>
          )}
        </UpperContainer>
        <PostText>
          <PostTitle>{title}</PostTitle>
          <PostContent>{content.replace(/\n/g, '&#13;&#10;')}</PostContent>
        </PostText>
        <Interactions>
          <LikeIconWrapper liked={liked}>
            <LikeIcon
              className='interaction-icon like-icon'
              onClick={handleClickLike}
            >
              <ThumbUpIcon />
            </LikeIcon>
            <span>{likes.length}</span>
          </LikeIconWrapper>
          <CommentIconWrapper>
            <CommentIcon
              activeComments={openComments}
              className='interaction-icon'
              onClick={handleOpenComments}
            >
              <ChatBubbleIcon />
            </CommentIcon>
            <span>{comments.length}</span>
          </CommentIconWrapper>
        </Interactions>
        {openComments && (
          <CommentSection>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                alignItems: 'center',
                minWidth: '100%',
              }}
            >
              <UserPicture
                comment={true}
                src={
                  currentUser.pictureUrl
                    ? currentUser.pictureUrl
                    : DefaultPicture
                }
              />
              <CommentInput
                placeholder='Ajouter une réponse'
                onBlur={e => setComment(e.target.value)}
              />
              <SendBtn onClick={sendComment}>
                <SendIcon />
              </SendBtn>
            </div>
            <Comments>
              {comments.map(comment => {
                return (
                  <Comment
                    key={comment.id}
                    commentId={comment.id}
                    name={comment.User.name}
                    firstname={comment.User.firstname}
                    picture={comment.User.pictureUrl}
                    content={comment.content}
                    date={comment.createdAt}
                    ownerId={comment.UserId}
                    currentUser={currentUser}
                    articleId={articleId}
                    updateComments={updateComments}
                  />
                )
              })}
            </Comments>
          </CommentSection>
        )}
      </PostWrapper>
    </>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  admin: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  picture: PropTypes.string,
}
export default Post
