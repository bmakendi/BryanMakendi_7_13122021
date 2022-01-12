import Header from '../../components/Header'
import { useFetchUser } from '../../utils/hooks'
import { useSearchParams } from 'react-router-dom'
import { MainWrapper } from '../Home/style'
import { ProfileBtn } from '../../components/ProfilePageBtn'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

const Profile = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const currentUserId = localStorage.getItem('userId')
  const currentUsersPage = parseInt(id) === parseInt(currentUserId) // parsing just to make sure we have ids of the same type
  const { userLoading, user, userError } = useFetchUser(
    `http://localhost:8000/auth/${id}`
  )
  console.log(user, currentUsersPage)
  userError && console.log(userError)

  return (
    <>
      <Header picture={user.pictureUrl} />
      <MainWrapper>
        <Link to='/groupomania'>
          <ProfileBtn>
            <ChevronLeftIcon />
            <span>Retourner au forum</span>
          </ProfileBtn>
        </Link>
      </MainWrapper>
      <ProfileBtn deleteBtn={true}>Supprimer mon compte</ProfileBtn>
    </>
  )
}

export default Profile
