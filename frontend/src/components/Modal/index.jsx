import colors from '../../utils/colors'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { ThemeContext } from '../../utils/context'

const ModalWrapper = styled.div`
  max-width: 19.0625rem;
  position: absolute;
  top: 20%;
  right: 0;
  left: 0;
  margin: auto;
  padding: 2.75rem 1.8125rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 41px;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? `${colors.dark}` : `#fff`};
  border: 1px solid
    ${({ isDarkMode }) =>
      isDarkMode ? `${colors.lighterDark}` : `${colors.lightgrey}`};
  border-radius: 10px;
  box-shadow: 0px 6px 6px 3px
    ${({ isDarkMode }) =>
      isDarkMode ? `${colors.dark}` : `${colors.lightgrey}`};
  text-align: center;
  z-index: 1000;
`
const ModalBackground = styled.div`
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? `${colors.lighterdark}` : `${colors.lightergrey}`};
  opacity: ${({ isDarkMode }) => (isDarkMode ? `0.99` : `0.5`)};
  z-index: 999;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`
const ModalTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ isDarkMode }) => isDarkMode && `#fff`};
`
const ModalBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  color: ${({ btnColor }) =>
    btnColor === 'red' ? `${colors.red}` : `${colors.blue}`};
  border: 1px solid
    ${({ btnColor }) =>
      btnColor === 'red' ? `${colors.red}` : `${colors.blue}`};
  border-radius: 30px;
  font-weight: 500;
  font-size: ${({ btnColor }) =>
    btnColor === 'red' ? '0.9375rem' : '0.875rem'};
  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: ${({ btnColor }) =>
      btnColor === 'red' ? `${colors.red}` : `${colors.blue}`};
  }
`

const Modal = ({ ownAccount, closing, admin, id }) => {
  const navigate = useNavigate()
  const { theme } = useContext(ThemeContext)

  const handleDeletion = async () => {
    const token = localStorage.getItem('token').replace(/['"]+/g, '')
    const bearer = 'Bearer ' + token
    const apiRoute = `http://localhost:8000/auth/${id}`
    const body = { userId: localStorage.getItem('userId'), admin: admin }
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: bearer },
      body: JSON.stringify(body),
    }
    try {
      const response = await fetch(apiRoute, requestOptions)
      const data = await response.json()
      console.log(data)
      if (ownAccount) {
        setTimeout(() => {
          localStorage.clear()
          window.location.reload()
        }, 500)
      } else {
        setTimeout(() => {
          navigate('/groupomania', { replace: true })
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <ModalBackground isDarkMode={theme === 'dark'} />
      <ModalWrapper isDarkMode={theme === 'dark'}>
        <ModalTitle isDarkMode={theme === 'dark'}>
          {ownAccount
            ? '??tes vous s??r de vouloir supprimer votre compte ?'
            : '??tes vous s??r de vouloir supprimer ce compte ?'}
        </ModalTitle>
        <ModalBtn btnColor='red' onClick={handleDeletion}>
          {ownAccount
            ? 'Oui, supprimer mon compte'
            : 'Oui, supprimer ce compte'}
        </ModalBtn>
        <ModalBtn btnColor='blue' onClick={closing}>
          {ownAccount
            ? 'Annuler et retouner sur mon profil'
            : 'Annuler et retourner sur le profil'}
        </ModalBtn>
      </ModalWrapper>
    </>
  )
}

export default Modal
