import logo from '../../assets/logos/icon.svg'
import logoText from '../../assets/logos/icon-text-only.svg'

const Login = () => {
  return (
    <>
      <div>
        <img src={logo} alt='Logo Groupomania' />
        <img src={logoText} alt='Logo Groupomania' />
      </div>
      <input type='text' placeholder='Adresse e-mail' />
      <input type='password' placeholder='Mot de passe' />
    </>
  )
}

export default Login
