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
import { SignupResult } from '../Signup/style'
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
import { UserContext } from '../../utils/context'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })
  const { isLogged, toggleLogged } = useContext(UserContext)
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  console.log('is user logged ? ', isLogged)
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
      console.log(data)
      if (data.token) {
        setMsg('')
        localStorage.setItem('userId', JSON.stringify(data.userId))
        localStorage.setItem('token', JSON.stringify(data.token))
        console.log('Connexion réussie')
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
      <TopRightDeco src={vector} alt='Background decoration' mw={600} />
      <BottomLeftDeco
        src={fullCircle}
        alt='Background decoration'
        zindex={1}
        w={30}
        mw={230}
      />
      <BottomLeftDeco
        src={innerEllipse}
        alt='Background decoration'
        zindex={0}
        w={37}
        mw={284}
      />
      <BottomLeftDeco
        src={outerEllipse}
        alt='Background decoration'
        zindex={-1}
        w={45}
        mw={345}
      />
      <MainLayout>
        {msg !== '' ? (
          <SignupResult error={msg !== 'Utilisateur non trouvé !'}>
            {msg}
          </SignupResult>
        ) : null}
        <LogoWrapper>
          <img src={logo} alt='Logo Groupomania' />
          <img src={logoText} alt='Logo Groupomania' />
        </LogoWrapper>
        <FormWrapper onSubmit={handleSubmit(handleLogin)}>
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
          <StyledLink to='/signup'>Créer un compte</StyledLink>
        </FormWrapper>
      </MainLayout>
    </>
  )
}

export default Login
