import logo from '../../assets/logos/icon.svg'
import logoText from '../../assets/logos/icon-text-only.svg'
import {
  MainLayout,
  LogoWrapper,
  FormWrapper,
  StyledInput,
  StyledLink,
  TopRightDeco,
  BottomLeftDeco,
} from './style'
import { ResultMsg } from '../Signup/style'
import RoundedBtn from '../../components/RoundedBtn'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../../utils/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputAdornment } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import vector from '../../assets/form-background/topright_background.svg'
import fullCircle from '../../assets/form-background/fullcircle.svg'
import innerEllipse from '../../assets/form-background/inner_ellipse.svg'
import outerEllipse from '../../assets/form-background/outer_ellipse.svg'
import darkVector from '../../assets/form-background/dark_topright.svg'
import darkFullCircle from '../../assets/form-background/darkfullcircle.svg'
import darkInnerEllipse from '../../assets/form-background/darkInnerEllipse.svg'
import darkOuterEllipse from '../../assets/form-background/darkOuterEllipse.svg'
import { UserContext } from '../../utils/context'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ThemeContext } from '../../utils/context'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })
  const { isLogged, toggleLogged } = useContext(UserContext)
  const { theme } = useContext(ThemeContext)
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  const darkMode = theme === 'dark'
  
  useEffect(() => {
    isLogged && navigate('/groupomania', { replace: true })
  }, [isLogged, navigate])

  const handleLogin = async ({ email, password }) => {
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
        setMsg('')
        localStorage.setItem('userId', JSON.stringify(data.userId))
        localStorage.setItem('token', JSON.stringify(data.token))
        console.log('Connexion r??ussie')
        toggleLogged()
        localStorage.setItem('loggedIn', 'true')
        setTimeout(() => {
          navigate('/groupomania', { replace: true })
        }, 1000)
      } else {
        setMsg(data.error)
      }
    } catch (err) {
      console.log(err)
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
        {msg !== '' ? (
          <ResultMsg error={msg !== 'Utilisateur non trouv?? !'}>
            {msg}
          </ResultMsg>
        ) : null}
        <LogoWrapper>
          <img src={logo} alt='Logo Groupomania' />
          <img src={logoText} alt='Logo Groupomania' />
        </LogoWrapper>
        <FormWrapper
          onSubmit={handleSubmit(handleLogin)}
          $isDarkMode={theme === 'dark'}
        >
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
          <RoundedBtn type='submit'>Se connecter</RoundedBtn>
          <StyledLink to='/signup' $isDarkMode={theme === 'dark'}>
            Cr??er un compte
          </StyledLink>
        </FormWrapper>
      </MainLayout>
    </>
  )
}

export default Login
