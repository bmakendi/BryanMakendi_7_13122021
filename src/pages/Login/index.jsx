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

const Login = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const submitForm = data => {
    console.log('form data is : ', data)
  }

  return (
    <>
      <TopRightDeco src={vector} alt='Background decoration' />
      <BottomLeftDeco src={fullCircle} alt='Background decoration' zindex={1} />
      <BottomLeftDeco
        src={innerEllipse}
        alt='Background decoration'
        zindex={0}
      />
      <BottomLeftDeco
        src={outerEllipse}
        alt='Background decoration'
        zindex={-1}
      />
      <MainLayout>
        <LogoWrapper>
          <img src={logo} alt='Logo Groupomania' />
          <img src={logoText} alt='Logo Groupomania' />
        </LogoWrapper>
        <FormWrapper onSubmit={handleSubmit(submitForm)}>
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
          />
          <RoundedBtn type='submit'>Se connecter</RoundedBtn>
          <StyledLink to='/signup'>Créer un compte</StyledLink>
        </FormWrapper>
      </MainLayout>
    </>
  )
}

export default Login
