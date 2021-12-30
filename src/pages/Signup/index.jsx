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
import { NameWrapper } from './style'
import vector from '../../assets/form-background/topright_background.svg'
import fullCircle from '../../assets/form-background/fullcircle.svg'
import innerEllipse from '../../assets/form-background/inner_ellipse.svg'
import outerEllipse from '../../assets/form-background/outer_ellipse.svg'

const Signup = () => {
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
        <FormWrapper>
          <NameWrapper>
            <StyledInput type='text' placeholder='Prénom' />
            <StyledInput type='text' placeholder='Nom' />
          </NameWrapper>
        </FormWrapper>
      </MainLayout>
    </>
  )
}

export default Signup
