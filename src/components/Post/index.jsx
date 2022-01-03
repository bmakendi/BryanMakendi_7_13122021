import PropTypes from 'prop-types'
import DefaultPicture from '../../assets/images/profile.png'
import styled from 'styled-components'
import colors from '../../utils/colors'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { Options, OptionItem } from '../../components/Options'

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
  width: 2.5rem;
  height: 2.5rem;
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
`
const PostTitle = styled.p`
  font-weight: 500;
  margin-bottom: 14px;
`
const PostContent = styled.p`
  font-size: 0.9375rem;
  margin-bottom: 29px;
`
const Interactions = styled.div`
  display: flex;
  justify-content: space-between;
`
const LikeIcon = styled.div``
const CommentIcon = styled.div``
const MoreIcon = styled(IconButton)`
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

const Post = ({
  title,
  content,
  firstname,
  name,
  admin,
  date,
  picture,
  postCreator,
  currentUser,
}) => {
  const [open, setOpen] = useState(false)
  const fullname = firstname + ' ' + name
  const pic = picture ? picture : DefaultPicture
  const formattedDate = date.slice(0, 10)
  return (
    <>
      <PostWrapper>
        <UpperContainer>
          <UserDisplay>
            <UserPicture src={pic} alt='Créateur du post' />
            <UserInfo>
              <UserName>{fullname}</UserName>
              <SubInfo>
                <Admin admin={admin === true}>Modérateur •</Admin>
                <Date>{formattedDate}</Date>
              </SubInfo>
            </UserInfo>
          </UserDisplay>
          {(currentUser.admin || postCreator === currentUser.id) && (
            <PostOptions>
              <MoreIcon
                onClick={() => setOpen(!open)}
                className={open && 'interaction-icon'}
              >
                <MoreHorizIcon />
              </MoreIcon>
              {open && (
                <Options>
                  <OptionItem topOption={true}>
                    <EditIcon /> Modifier le post
                  </OptionItem>
                  <OptionItem>
                    <DeleteIcon /> Supprimer le post
                  </OptionItem>
                </Options>
              )}
            </PostOptions>
          )}
        </UpperContainer>
        <PostText>
          <PostTitle>{title}</PostTitle>
          <PostContent>{content}</PostContent>
        </PostText>
        <Interactions>
          <LikeIcon className='interaction-icon'>
            <ThumbUpIcon />
          </LikeIcon>
          <CommentIcon className='interaction-icon'>
            <ChatBubbleIcon />
          </CommentIcon>
        </Interactions>
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
