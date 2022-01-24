import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Veuillez entrer une adresse mail valide')
    .required('Veuillez entrer une adresse mail valide'),
  password: yup.string().required('Veuillez entrer un mot de passe'),
})

/* Allowing one letter names and firstnames for the MVP */
export const signupSchema = yup.object().shape({
  firstname: yup.string().required('Veuillez entrer un prénom'),
  name: yup.string().required('Veuillez entrer un nom'),
  email: yup
    .string()
    .matches(
      /^[a-z]+\.[a-z]+@\bgroupomania\b\.\bcom\b$/,
      'Doit être au format prenom.nom@groupomania.com'
    )
    .required('Veuillez entrer une adresse mail'),
  job: yup.string().required('Veuillez indiquer votre emploi'),
  password: yup
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Veuillez entrer un mot de passe'),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Les mots de passe ne correspondent pas'
    ),
})
