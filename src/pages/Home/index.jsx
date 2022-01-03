import { useState } from 'react'
import Header from '../../components/Header'
import {
  AddPostBtn,
  Filters,
  MainWrapper,
  PostsContainer,
  StyledSelect,
} from './style'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useFetchArticles, useFetchUser } from '../../utils/hooks'
import Post from '../../components/Post'
import { useEffect } from 'react'

const Home = () => {
  const [filter, setFilter] = useState('newest')
  const [currentUser, setCurrentUser] = useState({})
  const { user, userLoading, userError } = useFetchUser(
    'http://localhost:8000/auth/' + localStorage.getItem('userId')
  )
  const { data, isLoading, error } = useFetchArticles(
    'http://localhost:8000/articles/'
  )
  const toggleFilter = () => {
    setFilter(filter === 'newest' ? 'oldest' : 'newest')
  }

  console.log('data ', data, 'loading ? ', isLoading, 'error ? ', error)

  useEffect(() => {
    !userLoading && setCurrentUser(user)
    console.log('current user: ', currentUser, 'Error ? ', userError)
  }, [currentUser, user, userLoading, userError])

  return (
    <>
      <Header picture={currentUser.pictureUrl} />
      <MainWrapper>
        <Filters>
          <p>Trier les posts</p>
          <StyledSelect
            value={filter}
            onChange={toggleFilter}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            IconComponent={KeyboardArrowDownIcon}
          >
            <MenuItem value={'newest'}>Du plus récent</MenuItem>
            <MenuItem value={'oldest'}>Du plus ancien</MenuItem>
          </StyledSelect>
        </Filters>
        <PostsContainer>
          {data.map(article => {
            return (
              <Post
                key={article.id}
                title={article.title}
                content={article.content}
                firstname={article.User.firstname}
                name={article.User.name}
                admin={article.User.admin}
                date={article.createdAt}
                picture={article.User.pictureUrl}
                postCreator={article.UserId}
                currentUser={currentUser}
              />
            )
          })}
        </PostsContainer>
        <AddPostBtn>Ajouter un post</AddPostBtn>
      </MainWrapper>
    </>
  )
}

export default Home
