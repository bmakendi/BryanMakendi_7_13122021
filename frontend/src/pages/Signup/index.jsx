import { useForm } from 'react-hook-form'
import { signupSchema } from '../../utils/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import logo from '../../assets/logos/icon.svg'
import logoText from '../../assets/logos/icon-text-only.svg'
import {
  MainLayout,
  TopRightDeco,
  BottomLeftDeco,
  LogoWrapper,
  FormWrapper,
  StyledInput,
} from '../Login/style'
import { NameWrapper, ResultMsg } from './style'
import vector from '../../assets/form-background/topright_background.svg'
import fullCircle from '../../assets/form-background/fullcircle.svg'
import innerEllipse from '../../assets/form-background/inner_ellipse.svg'
import outerEllipse from '../../assets/form-background/outer_ellipse.svg'
import darkVector from '../../assets/form-background/dark_topright.svg'
import darkFullCircle from '../../assets/form-background/darkfullcircle.svg'
import darkInnerEllipse from '../../assets/form-background/darkInnerEllipse.svg'
import darkOuterEllipse from '../../assets/form-background/darkOuterEllipse.svg'
import RoundedBtn from '../../components/RoundedBtn'
import { InputAdornment } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import WorkIcon from '@mui/icons-material/Work'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { UserContext, ThemeContext } from '../../utils/context'

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  })
  const [isLoading, setLoading] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [resultText, setResultText] = useState('')
  const { toggleLogged } = useContext(UserContext)
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const darkMode = theme === 'dark'

  const handleLogin = async (email, password) => {
    const body = { email, password }
    const apiRoute = 'http://localhost:8000/auth/login'
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
    try {
      const response = await fetch(apiRoute, requestOptions)
      const data = await response.json()
      if (data.token) {
        localStorage.setItem('userId', JSON.stringify(data.userId))
        localStorage.setItem('token', JSON.stringify(data.token))
        console.log('Connexion r??ussie')
        toggleLogged()
        localStorage.setItem('loggedIn', 'true')
        setTimeout(() => {
          navigate('/groupomania', { replace: true })
        }, 1000)
      } else {
        console.log('Error ', data.error)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const submitForm = async formData => {
    delete formData.confirmPassword
    const body = formData
    const apiRoute = 'http://localhost:8000/auth/signup'
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
    setLoading(true)
    setClicked(true)
    try {
      const response = await fetch(apiRoute, requestOptions)
      const data = await response.json()
      if (data.error) setResultText('Adresse mail d??j?? utilis??e')
      else {
        setResultText('Inscription r??ussie !')
        handleLogin(formData.email, formData.password)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <TopRightDeco
        src={darkMode ? darkVector : vector}
        alt='Background decoration'
        mw={600}
      />
      <BottomLeftDeco
        src={darkMode ? darkFullCircle : fullCircle}
        alt='Background decoration'
        zindex={1}
        w={30}
        mw={230}
      />
      <BottomLeftDeco
        src={darkMode ? darkInnerEllipse : innerEllipse}
        alt='Background decoration'
        className='inner-deco'
        zindex={0}
        w={37}
        mw={284}
      />
      <BottomLeftDeco
        src={darkMode ? darkOuterEllipse : outerEllipse}
        alt='Background decoration'
        zindex={-1}
        w={45}
        mw={345}
      />
      <MainLayout>
        {!isLoading && clicked ? <ResultMsg>{resultText}</ResultMsg> : null}
        <LogoWrapper>
          <img src={logo} alt='Logo Groupomania' />
          <img src={logoText} alt='Logo Groupomania' />
        </LogoWrapper>
        <FormWrapper
          onSubmit={handleSubmit(submitForm)}
          $isDarkMode={theme === 'dark'}
        >
          <NameWrapper>
            <StyledInput
              type='text'
              placeholder='Pr??nom'
              {...register('firstname')}
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
            />
            <StyledInput
              type='text'
              placeholder='Nom'
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </NameWrapper>
          <StyledInput
            type='text'
            placeholder='Adresse e-mail'
            {...register('email')}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <StyledInput
            type='text'
            placeholder='Titre'
            {...register('job')}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <WorkIcon />
                </InputAdornment>
              ),
            }}
            error={!!errors.job}
            helperText={errors.job?.message}
          />
          <StyledInput
            type='password'
            placeholder='Mot de passe'
            {...register('password')}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <StyledInput
            type='password'
            placeholder='Confirmer mon mot de passe'
            {...register('confirmPassword')}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <RoundedBtn type='submit' disabled={isLoading}>
            Cr??er mon compte
          </RoundedBtn>
        </FormWrapper>
      </MainLayout>
    </>
  )
}

export default Signup
