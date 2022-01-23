import styled from 'styled-components'
import colors from '../../utils/colors'
import Logo from '../../assets/logos/icon.svg'
import { AddPostBtn } from '../../pages/Home/style'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PropTypes from 'prop-types'
import DefaultPicture from '../../assets/images/profile.png'
import { Options, OptionItem } from '../Options'
import { useContext, useState } from 'react'
import {
  CurrentUserContext,
  UserContext,
  ThemeContext,
} from '../../utils/context'
import { Link, useLocation } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { useFetchUser } from '../../utils/hooks'
import { useMediaQueries } from '../../utils/MediaQueries'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

const StyledHeader = styled.header`
  display: flex;
  padding: 28px 13px 13px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? `${colors.lighterDark}` : `${colors.lightergrey}`};
  @media all and (min-width: 1024px) {
    padding: 28px 22px 22px;
  }
`
const HeaderLogo = styled.img`
  height: 100%;
`
const Searchbar = styled(TextField)`
  background-color: ${({ $isDarkMode }) =>
    $isDarkMode ? `${colors.dark}` : `${colors.lightgrey}`};
  border-radius: 30px;
  height: 2.5rem;
  div {
    height: 100%;
  }
  fieldset {
    border: none;
  }
  input {
    color: ${({ $isDarkMode }) => $isDarkMode && `#fff`};
    &::placeholder {
      color: ${({ $isDarkMode }) => ($isDarkMode ? `#FFF` : `${colors.grey}`)};
      font-size: 1.0625rem;
      opacity: 1;
    }
  }
  svg {
    color: ${({ $isDarkMode }) => $isDarkMode && '#FFF'};
  }
  @media all and (min-width: 1024px) {
    width: 22.1875rem;
  }
`
const ProfilePicture = styled.img`
  border-radius: 100%;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  object-fit: cover;
`
const Menu = styled.div`
  position: relative;
  height: 2.5rem;
  width: 2.5rem;
  z-index: 100;
`
const LeftContainer = styled.div`
  @media all and (min-width: 1024px) {
    display: flex;
    gap: 82px;
  }
`
const RightContainer = styled.div`
  display: flex;
  gap: 60px;
`
const DestktopMenu = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  cursor: pointer;
`
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .admin {
    font-size: 0.875rem;
  }
  p {
    color: ${({ $isDarkMode }) => $isDarkMode && '#FFF'};
  }
`
const ArrowDown = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 40px;
    height: 40px;
    color: ${({ isDarkMode }) => isDarkMode && '#c4c4c4'};
  }
`

const Header = ({ searching }) => {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { toggleLogged } = useContext(UserContext)
  const { updateCurrentUser } = useContext(CurrentUserContext)
  const { user } = useFetchUser(
    'http://localhost:8000/auth/' + localStorage.getItem('userId')
  )
  const location = useLocation()
  const fullname = user.firstname + ' ' + user.name
  const { isTabletOrMobile } = useMediaQueries()
  const id = localStorage.getItem('userId')
  const isHomePage = location.pathname === '/groupomania'

  const logOut = () => {
    localStorage.clear()
    updateCurrentUser({})
    toggleLogged()
  }

  const handleClick = () => {
    setOpen(prev => !prev)
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  return (
    <StyledHeader isDarkMode={theme === 'dark'}>
      {isTabletOrMobile ? (
        <>
          <Link to='/groupomania'>
            <HeaderLogo src={Logo} alt='Logo de Groupomania' />
          </Link>
          <Searchbar
            type='search'
            disabled={!isHomePage}
            placeholder='Rechercher'
            $isDarkMode={theme === 'dark'}
            onInput={e => searching(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </>
      ) : (
        <LeftContainer>
          <Link to='/groupomania'>
            <HeaderLogo src={Logo} alt='Logo de Groupomania' />
          </Link>
          <Searchbar
            type='search'
            placeholder='Rechercher'
            $isDarkMode={theme === 'dark'}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </LeftContainer>
      )}

      <RightContainer>
        {!isTabletOrMobile && (
          <Link to='/groupomania/create-post'>
            <AddPostBtn>Ajouter un post</AddPostBtn>
          </Link>
        )}
        <ClickAwayListener onClickAway={handleClickAway}>
          {isTabletOrMobile ? (
            <Menu>
              <ProfilePicture
                src={user.pictureUrl ? user.pictureUrl : DefaultPicture}
                alt='Bouton menu et photo de profil'
                onClick={handleClick}
              />
              {open && (
                <Options menu={true} isDarkMode={theme === 'dark'}>
                  <Link to={`/profile/${id}`}>
                    <OptionItem
                      className='border-bot'
                      onClick={() => setOpen(!open)}
                    >
                      <PersonIcon />
                      Mon profil
                    </OptionItem>
                  </Link>
                  <OptionItem className='border-bot' onClick={toggleTheme}>
                    {theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                    {theme === 'dark' ? 'Mode sombre' : 'Mode clair'}
                  </OptionItem>
                  <OptionItem
                    className='disconnect'
                    menu={true}
                    onClick={logOut}
                  >
                    <LogoutIcon />
                    Se déconnecter
                  </OptionItem>
                </Options>
              )}
            </Menu>
          ) : (
            <DestktopMenu onClick={handleClick}>
              <ProfilePicture
                src={user.pictureUrl ? user.pictureUrl : DefaultPicture}
                alt='Bouton menu et photo de profil'
              />
              <UserInfo $isDarkMode={theme === 'dark'}>
                <p>{fullname}</p>
                {user.admin && <p className='admin'>Modérateur</p>}
              </UserInfo>
              <ArrowDown isDarkMode={theme === 'dark'}>
                <KeyboardArrowDownIcon />
              </ArrowDown>
              {open && (
                <Options menu={true} isDarkMode={theme === 'dark'}>
                  <Link to={`/profile/${id}`}>
                    <OptionItem topOption={true} onClick={() => setOpen(!open)}>
                      <PersonIcon />
                      Mon profil
                    </OptionItem>
                  </Link>
                  <OptionItem topOption={true} onClick={toggleTheme}>
                    {theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                    {theme === 'dark' ? 'Mode sombre' : 'Mode clair'}
                  </OptionItem>
                  <OptionItem
                    className='disconnect'
                    menu={true}
                    onClick={logOut}
                  >
                    <LogoutIcon />
                    Se déconnecter
                  </OptionItem>
                </Options>
              )}
            </DestktopMenu>
          )}
        </ClickAwayListener>
      </RightContainer>
    </StyledHeader>
  )
}

Header.defaultProps = {
  picture: DefaultPicture,
}

Header.propTypes = {
  picture: PropTypes.string,
}

export default Header
