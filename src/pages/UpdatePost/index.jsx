import { Link, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import { MainWrapper } from '../Home/style'
import {
  Cancel,
  TitleBox,
  StyledInput,
  StyledTextArea,
  PublishBtn,
  FormWrapper,
} from '../AddPost/style'
import { ResultMsg } from '../Signup/style'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { CurrentUserContext } from '../../utils/context'
import { useFetchOneArticle } from '../../utils/hooks'

const UpdatePost = () => {
  const { currentUser } = useContext(CurrentUserContext)
  const { register, handleSubmit } = useForm()
  const [resultMsg, setResultMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate()
  const { articleId } = useParams()
  const { article } = useFetchOneArticle(
    `http://localhost:8000/articles/${articleId}`
  )

  console.log(article)

  const sendPost = async data => {
    const article = {
      userId: currentUser.id,
      title: data.title,
      content: data.content,
    }
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token').replace(/['"]+/g, '')
    const bearer = 'Bearer ' + token
    const body = { userId: userId, article }
    const url = `http://localhost:8000/articles/${articleId}`
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: bearer },
      body: JSON.stringify(body),
    }
    setLoading(true)
    setClicked(true)
    try {
      const response = await fetch(url, requestOptions)
      const data = await response.json()
      if (!data.message) {
        setResultMsg("N'oubliez pas d'écrire avant de poster !")
      } else {
        setResultMsg('Article posté !')
        setTimeout(() => {
          navigate('/groupomania', { replace: true })
        }, 1000)
      }
      console.log(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <MainWrapper>
        {!loading && clicked ? <ResultMsg>{resultMsg}</ResultMsg> : null}
        <Link to='/groupomania'>
          <Cancel>Annuler</Cancel>
        </Link>
        <TitleBox>Ajouter un post</TitleBox>
        <FormWrapper onSubmit={handleSubmit(sendPost)}>
          <StyledInput
            placeholder={article.title}
            defaultValue={article.title}
            {...register('title')}
          />
          <StyledTextArea
            defaultValue={article.content}
            {...register('content')}
          />
          <PublishBtn type='submit' disabled={loading}>
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

export default UpdatePost
