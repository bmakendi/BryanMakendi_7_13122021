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
import { NameWrapper, SignupResult } from './style'
import vector from '../../assets/form-background/topright_background.svg'
import fullCircle from '../../assets/form-background/fullcircle.svg'
import innerEllipse from '../../assets/form-background/inner_ellipse.svg'
import outerEllipse from '../../assets/form-background/outer_ellipse.svg'
import RoundedBtn from '../../components/RoundedBtn'
import { InputAdornment } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import WorkIcon from '@mui/icons-material/Work'
import { useState } from 'react'

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

  console.log('loading? ' + isLoading + ' and clicked ? ' + clicked)
  const submitForm = async formData => {
    delete formData.confirmPassword
    console.log('form data is : ', formData)
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
      if (data.error) setResultText('Adresse mail déjà utilisée')
      else setResultText('Inscription réussie !')
      console.log(data)
    } catch (error) {
      console.log(error)
      console.log('Grosse erreur ici là')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <TopRightDeco src={vector} alt='Background decoration' />
      <BottomLeftDeco
        src={fullCircle}
        alt='Background decoration'
        zindex={-1}
      />
      <BottomLeftDeco
        src={innerEllipse}
        alt='Background decoration'
        zindex={-2}
      />
      <BottomLeftDeco
        src={outerEllipse}
        alt='Background decoration'
        zindex={-3}
      />
      <MainLayout>
        {!isLoading && clicked ? (
          <SignupResult error={resultText !== 'Inscription réussie !'}>
            {resultText}
          </SignupResult>
        ) : null}
        <LogoWrapper>
          <img src={logo} alt='Logo Groupomania' />
          <img src={logoText} alt='Logo Groupomania' />
        </LogoWrapper>
        <FormWrapper onSubmit={handleSubmit(submitForm)}>
          <NameWrapper>
            <StyledInput
              type='text'
              placeholder='Prénom'
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
          <RoundedBtn type='submit'>Créer mon compte</RoundedBtn>
        </FormWrapper>
      </MainLayout>
    </>
  )
}

export default Signup
