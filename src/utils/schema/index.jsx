import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("L'adresse mail n'est pas au bon format"),
  password: yup
    .string()
    .min(6)
    .required(
      'Le mot de passe doit contenir au moins 6 caractères et 1 chiffre'
    ),
  name: yup.string().min(2).required('Veuillez entrer un nom valide'),
  firstname: yup.string().min(2).required('Veuillez entrer un prénom valide'),
  job: yup.string().required('Veuillez indiquer votre emploi'),
})
