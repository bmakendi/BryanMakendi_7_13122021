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
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CurrentUserContext, ThemeContext } from '../../utils/context'
import { HomepageLoading } from '../../components/Loading'
import { useMediaQueries } from '../../utils/MediaQueries'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('oldest')
  const { theme } = useContext(ThemeContext)
  const { currentUser, updateCurrentUser } = useContext(CurrentUserContext)
  const { user, userLoading, userError } = useFetchUser(
    'http://localhost:8000/auth/' + localStorage.getItem('userId')
  )
  const { data, isLoading, error, updateArticles } = useFetchArticles(
    'http://localhost:8000/articles/'
  )
  const { isTabletOrMobile } = useMediaQueries()
  error && console.log(error)

  const searching = userInput => {
    setSearchQuery(userInput)
  }

  const sortFilter = (a, b) => {
    return filter === 'oldest' ? b.id - a.id : a.id - b.id
  }

  const toggleFilter = () => {
    setFilter(filter === 'newest' ? 'oldest' : 'newest')
    data.sort(sortFilter)
  }

  useEffect(() => {
    !userLoading && updateCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
  }, [currentUser, user, userLoading, userError, updateCurrentUser])

  return (
    <>
      <Header searching={searching} />
      <MainWrapper isDarkMode={theme === 'dark'}>
        <Filters isDarkMode={theme === 'dark'}>
          <p>Trier les posts</p>
          <StyledSelect
            value={filter}
            onChange={toggleFilter}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            IconComponent={KeyboardArrowDownIcon}
            $isDarkMode={theme === 'dark'}
          >
            <MenuItem value={'oldest'}>Du plus ancien</MenuItem>
            <MenuItem value={'newest'}>Du plus r??cent</MenuItem>
          </StyledSelect>
        </Filters>
        <PostsContainer>
          {isLoading ? (
            <HomepageLoading />
          ) : (
            data
              .filter(article => {
                let result
                if (searchQuery === '') result = article
                else if (
                  article &&
                  (article.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                    article.content
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    article.User.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    article.User.firstname
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()))
                ) {
                  result = article
                }
                return result
              })
              .map(article => {
                return (
                  <Post
                    key={article.id}
                    articleId={article.id}
                    title={article.title}
                    content={article.content}
                    firstname={article.User.firstname}
                    name={article.User.name}
                    admin={article.User.admin}
                    date={article.createdAt}
                    picture={article.User.pictureUrl}
                    postCreator={article.UserId}
                    currentUser={currentUser}
                    updateArticles={updateArticles}
                  />
                )
              })
          )}
        </PostsContainer>
        {isTabletOrMobile && (
          <Link to='/groupomania/create-post'>
            <AddPostBtn>Ajouter un post</AddPostBtn>
          </Link>
        )}
      </MainWrapper>
    </>
  )
}

export default Home
