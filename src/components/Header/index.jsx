import styled from 'styled-components'
import colors from '../../utils/colors'
import Logo from '../../assets/logos/icon.svg'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PropTypes from 'prop-types'
import DefaultPicture from '../../assets/images/profile.png'
import { Options, OptionItem } from '../Options'
import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'

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
`
const Menu = styled.div`
  position: relative;
  height: 2.5rem;
  width: 2.5rem;
  z-index: 100;
`
const Header = ({ picture }) => {
  const [open, setOpen] = useState(false)
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
      <Menu>
        <ProfilePicture
          src={picture ? picture : DefaultPicture}
          alt='Bouton menu et photo de profil'
          onClick={() => setOpen(!open)}
        />
        {open && (
          <Options menu={true}>
            <OptionItem topOption={true}>
              <PersonIcon />
              Mon profil
            </OptionItem>
            <OptionItem menu={true}>
              <LogoutIcon />
              Se déconnecter
            </OptionItem>
          </Options>
        )}
      </Menu>
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
