import Header from '../../components/Header'
import { useFetchUser } from '../../utils/hooks'
import { useParams } from 'react-router-dom'
import { MainWrapper } from '../Home/style'
import { ProfileBtn } from '../../components/ProfilePageBtn'
import {
  EditUserInfo,
  ProfileInfo,
  ProfileJobWrapper,
  ProfilePicture,
  ProfilePictureWrapper,
  ProfileTitle,
  ProfileUserContact,
  ProfileUserJob,
  ProfileUserName,
} from './style'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import EditIcon from '@mui/icons-material/Edit'
import MailIcon from '@mui/icons-material/Mail'
import DefaultPicture from '../../assets/images/profile.png'
import { useEffect, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CurrentUserContext } from '../../utils/context'

const Profile = () => {
  const { register, handleSubmit } = useForm()
  const [selectedFile, setSelectedFile] = useState()
  const { currentUser, updateCurrentUser } = useContext(CurrentUserContext)
  const { id } = useParams()
  const currentUsersPage = parseInt(id) === parseInt(currentUser.id) // parsing just to make sure we have ids of the same type
  const { user, userError } = useFetchUser(`http://localhost:8000/auth/${id}`)
  const currentUserIsAdmin = currentUser.admin
  const usersPageIsAdmin = user.admin

  useEffect(() => {
    if (Object.keys(currentUser).length === 0)
      updateCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
  }, [currentUser, updateCurrentUser])

  userError && console.log(userError)

  const changeHandler = async e => {
    const file = e.target.files[0]
    setSelectedFile(file)
  }

  const handleFileUpload = async data => {
    const token = localStorage.getItem('token').replace(/['"]+/g, '')
    const bearer = 'Bearer ' + token
    data.append('userId', id)
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: bearer },
      data,
    }
    try {
      const response = await fetch(
        `http://localhost:8000/auth/${id}`,
        requestOptions
      )
      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Header picture={user.pictureUrl} />
      <MainWrapper page='profile'>
        <Link to='/groupomania'>
          <ProfileBtn>
            <ChevronLeftIcon />
            <span>Retourner au forum</span>
          </ProfileBtn>
        </Link>
        {(currentUsersPage || usersPageIsAdmin) && (
          <ProfileTitle>
            <h1 className='title'>{currentUsersPage && 'Mon profil'}</h1>
            <p className='admin'>{usersPageIsAdmin && 'Modérateur'}</p>
          </ProfileTitle>
        )}
        <ProfileInfo>
          <ProfilePictureWrapper marginbot={currentUsersPage}>
            <ProfilePicture
              src={user.pictureUrl ? user.pictureUrl : DefaultPicture}
            />
            {currentUsersPage && (
              <form
                id='profilePicForm'
                onSubmit={handleSubmit(handleFileUpload)}
                encType='multipart/form-data'
              >
                <EditUserInfo
                  onClick={() => {
                    const fileElem = document.getElementById('fileElem')
                    if (fileElem) {
                      fileElem.click()
                    }
                  }}
                >
                  <input
                    id='fileElem'
                    type='file'
                    accept='image/*'
                    onChange={changeHandler}
                    {...register('image')}
                    style={{ display: 'none' }} //inline style just to hide input, not to be used anywhere else
                  />
                  <EditIcon />
                  Modifier ma photo de profil
                </EditUserInfo>
                <input type='submit' value='Submit' />
              </form>
            )}
          </ProfilePictureWrapper>
          <ProfileUserName>{`${user.firstname} ${user.name}`}</ProfileUserName>
          <ProfileJobWrapper>
            <ProfileUserJob>{user.job}</ProfileUserJob>
            {currentUsersPage && (
              <EditUserInfo>
                <EditIcon />
                Modifier mon titre
              </EditUserInfo>
            )}
          </ProfileJobWrapper>
          <ProfileUserContact to={`mailto:${user.email}`}>
            <MailIcon />
            {user.email}
          </ProfileUserContact>
        </ProfileInfo>
      </MainWrapper>
      {(currentUsersPage || currentUserIsAdmin) && (
        <ProfileBtn deleteBtn={true}>
          {currentUsersPage
            ? 'Supprimer mon compte'
            : 'Supprimer cet utilisateur'}
        </ProfileBtn>
      )}
    </>
  )
}

export default Profile
