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
  UserJob,
} from './style'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import EditIcon from '@mui/icons-material/Edit'
import MailIcon from '@mui/icons-material/Mail'
import DefaultPicture from '../../assets/images/profile.png'
import { useEffect, useContext, useState } from 'react'
import { CurrentUserContext } from '../../utils/context'

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState()
  const [jobTitle, setJobTitle] = useState('')
  const { currentUser, updateCurrentUser } = useContext(CurrentUserContext)
  const { id } = useParams()
  const currentUsersPage = parseInt(id) === parseInt(currentUser.id) // parsing just to make sure we have ids of the same type
  const { user, userError } = useFetchUser(`http://localhost:8000/auth/${id}`)
  const currentUserIsAdmin = currentUser.admin
  const usersPageIsAdmin = user.admin

  const token = localStorage.getItem('token').replace(/['"]+/g, '')
  const bearer = 'Bearer ' + token
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: bearer },
  }

  useEffect(() => {
    if (Object.keys(currentUser).length === 0)
      updateCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
  }, [currentUser, updateCurrentUser])

  userError && console.log(userError)

  const handleFileChange = async e => {
    const file = e.target.files[0]
    setSelectedFile(file)
  }

  const handleFileUpload = async () => {
    const formData = new FormData()
    formData.append('image', selectedFile)
    try {
      const response = await fetch(
        `http://localhost:8000/auth/imageUpdate/${id}`,
        { method: 'PUT', headers: { Authorization: bearer }, body: formData }
      )
      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err, 'Erreur avec la modif de photo')
    }
  }

  const handleFileClick = () => {
    document.getElementById('fileElem').click()
  }

  const handleFileSubmitClick = () => {
    document.getElementById('fileSubmit').click()
  }

  const handleJobChange = e => {
    setJobTitle(e.target.value)
  }

  const handleJobClick = () => {
    document.getElementById('jobSubmit').click()
  }

  const handleJobSubmit = async () => {
    const body = { job: jobTitle, userId: id }
    try {
      const response = await fetch(
        `http://localhost:8000/auth/jobUpdate/${id}`,
        { ...requestOptions, body: JSON.stringify(body) }
      )
      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err, 'Erreur avec la modif de job')
    }
  }

  return (
    <>
      <Header picture={user.pictureUrl} />
      <MainWrapper page='profile'>
        <ProfileBtn>
          <Link to='/groupomania'>
            <ChevronLeftIcon />
            <span>Retourner au forum</span>
          </Link>
        </ProfileBtn>

        {(currentUsersPage || usersPageIsAdmin) && (
          <ProfileTitle>
            <h1 className='title'>{currentUsersPage && 'Mon profil'}</h1>
            <p className='admin'>{usersPageIsAdmin && 'Modérateur'}</p>
          </ProfileTitle>
        )}
        <ProfileInfo>
          <ProfilePictureWrapper marginbot={currentUsersPage}>
            {currentUsersPage ? (
              <>
                <ProfilePicture
                  src={user.pictureUrl ? user.pictureUrl : DefaultPicture}
                  editable={true}
                  onClick={handleFileClick}
                />
                <form encType='multipart/form-data' onSubmit={handleFileUpload}>
                  <input
                    id='fileElem'
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    style={{ display: 'none' }} //hiding input button
                  />
                  <EditUserInfo onClick={handleFileSubmitClick}>
                    <EditIcon />
                    Modifier ma photo de profil
                  </EditUserInfo>
                  <input
                    type='submit'
                    id='fileSubmit'
                    style={{ display: 'none' }}
                  />
                </form>
              </>
            ) : (
              <ProfilePicture
                src={user.pictureUrl ? user.pictureUrl : DefaultPicture}
              />
            )}
          </ProfilePictureWrapper>
          <ProfileUserName>{`${user.firstname} ${user.name}`}</ProfileUserName>
          <ProfileJobWrapper>
            {currentUsersPage ? (
              <form onSubmit={handleJobSubmit}>
                <ProfileUserJob
                  type='text'
                  defaultValue={user.job}
                  onChange={handleJobChange}
                />
                <EditUserInfo onClick={handleJobClick}>
                  <EditIcon />
                  Modifier mon titre
                </EditUserInfo>
                <input
                  type='submit'
                  id='jobSubmit'
                  style={{ display: 'none' }}
                />
              </form>
            ) : (
              <UserJob>{user.job}</UserJob>
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
