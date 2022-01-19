import styled from 'styled-components'
import colors from '../../utils/colors'
import Logo from '../../assets/logos/icon.svg'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PropTypes from 'prop-types'
import DefaultPicture from '../../assets/images/profile.png'
import { Options, OptionItem } from '../Options'
import { useContext, useEffect, useState } from 'react'
import { CurrentUserContext, UserContext } from '../../utils/context'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import ClickAwayListener from '@mui/material/ClickAwayListener'

const StyledHeader = styled.header`
  display: flex;
  padding: 28px 13px 13px;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.lightergrey};
`
const Searchbar = styled(TextField)`
  background-color: ${colors.lightgrey};
  border-radius: 30px;
  height: 2.5rem;
  div {
    height: 100%;
  }
  fieldset {
    border: none;
  }
  input {
    &::placeholder {
      color: ${colors.grey};
      font-size: 1.0625rem;
      opacity: 1;
    }
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
const Header = ({ picture }) => {
  const [open, setOpen] = useState(false)
  const { isLogged, toggleLogged } = useContext(UserContext)
  const { updateCurrentUser } = useContext(CurrentUserContext)
  const navigate = useNavigate()
  const id = localStorage.getItem('userId')

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

  useEffect(() => {}, [isLogged, navigate])

  return (
    <StyledHeader>
      <img src={Logo} alt='Logo de Groupomania' />
      <Searchbar
        type='search'
        placeholder='Rechercher'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <ClickAwayListener onClickAway={handleClickAway}>
        <Menu>
          <ProfilePicture
            src={picture ? picture : DefaultPicture}
            alt='Bouton menu et photo de profil'
            onClick={handleClick}
          />
          {open && (
            <Options menu={true}>
              <Link to={`/profile/${id}`}>
                <OptionItem topOption={true} onClick={() => setOpen(!open)}>
                  <PersonIcon />
                  Mon profil
                </OptionItem>
              </Link>
              <OptionItem menu={true} onClick={logOut}>
                <LogoutIcon />
                Se déconnecter
              </OptionItem>
            </Options>
          )}
        </Menu>
      </ClickAwayListener>
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
