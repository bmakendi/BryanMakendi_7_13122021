import PropTypes from 'prop-types'
import DefaultPicture from '../../assets/images/profile.png'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../utils/context'
import { Options, OptionItem } from '../../components/Options'
import {
  useFetchComments,
  useFormatDate,
  useFetchLikes,
} from '../../utils/hooks'
import { Link, useNavigate } from 'react-router-dom'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Comment from '../Comment'
import RoundedBtn from '../RoundedBtn'
import { useMediaQueries } from '../../utils/MediaQueries'
import {
  PostWrapper,
  UpperContainer,
  UserDisplay,
  UserPicture,
  UserInfo,
  SubInfo,
  UserName,
  PostContent,
  PostOptions,
  PostText,
  PostTitle,
  Admin,
  Date,
  MoreIcon,
  Interactions,
  LikeIconWrapper,
  LikeIcon,
  CommentSection,
  CommentIcon,
  CommentIconWrapper,
  Comments,
  CommentInput,
  SendBtn,
} from './style'

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
  const { theme } = useContext(ThemeContext)
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
  const { isTabletOrMobile } = useMediaQueries()

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
      <PostWrapper $isDarkMode={theme === 'dark'}>
        <UpperContainer>
          <UserDisplay>
            <UserPicture src={pic} alt='Créateur du post' />
            <UserInfo $isDarkMode={theme === 'dark'}>
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
                  <Options isDarkMode={theme === 'dark'}>
                    {currentUserOwnsPost && (
                      <OptionItem
                        className='border-bot'
                        onClick={handleModifyPost}
                      >
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
        <PostText $isDarkMode={theme === 'dark'}>
          <PostTitle>{title}</PostTitle>
          <PostContent>{content}</PostContent>
        </PostText>
        <Interactions $isDarkMode={theme === 'dark'}>
          <LikeIconWrapper liked={liked} $isDarkMode={theme === 'dark'}>
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
                $isDarkMode={theme === 'dark'}
              />
              {isTabletOrMobile ? (
                <SendBtn onClick={sendComment} className='interaction-icon'>
                  <SendIcon />
                </SendBtn>
              ) : (
                <RoundedBtn onClick={sendComment} answer={'true'}>
                  Répondre
                </RoundedBtn>
              )}
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
