import Header from '../../components/Header'
import { useContext } from 'react'
import { CurrentUserContext } from '../../utils/context'
import styled from 'styled-components'
import errorLogo from '../../assets/images/error.svg'
import colors from '../../utils/colors'
import { Link } from 'react-router-dom'

const StyledErrorPage = styled.div`
  margin: 223px 0 245px;
  text-align: center;
  img {
    width: 70px;
    height: 70px;
  }
  h1 {
    font-weight: 500;
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`
const RedirectBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9.9375rem;
  height: 2.5rem;
  margin: auto;
  border: 1px solid ${colors.grey};
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    border: 2px solid ${colors.grey};
  }
`
const ErrorPage = () => {
  const { currentUser } = useContext(CurrentUserContext)

  return (
    <>
      <Header picture={currentUser.pictureUrl} />
      <StyledErrorPage>
        <img src={errorLogo} alt="Logo d'erreur" />
        <h1>Une erreur est survenue</h1>
        <p>Retournez plutôt sur la page d'accueil !</p>
      </StyledErrorPage>
      <Link to='/groupomania'>
        <RedirectBtn>Accueil</RedirectBtn>
      </Link>
    </>
  )
}

export default ErrorPage
