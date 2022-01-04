import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import { MainWrapper } from '../Home/style'
import {
  Cancel,
  TitleBox,
  StyledInput,
  StyledTextArea,
  PublishBtn,
  FormWrapper,
} from './style'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useForm } from 'react-hook-form'

const AddPost = ({ userPicture }) => {
  const { register, handleSubmit } = useForm()

  const sendPost = async data => {
    const article = { title: data.title, content: data.content }
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token').replace(/['"]+/g, '')
    const bearer = 'Bearer ' + token
    const body = { userId: userId, article }
    console.log(bearer)
    const url = 'http://localhost:8000/articles/'
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: bearer },
      body: JSON.stringify(body),
    }
    try {
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Header picture={userPicture} />
      <MainWrapper>
        <Link to='/groupomania'>
          <Cancel>Annuler</Cancel>
        </Link>
        <TitleBox>Ajouter un post</TitleBox>
        <FormWrapper onSubmit={handleSubmit(sendPost)}>
          <StyledInput placeholder='Ajouter un titre' {...register('title')} />
          <StyledTextArea
            placeholder='Rédiger un post'
            {...register('content')}
          />
          <PublishBtn type='submit'>
            Publier
            <span>
              <ChevronRightIcon />
            </span>
          </PublishBtn>
        </FormWrapper>
      </MainWrapper>
    </>
  )
}

export default AddPost
