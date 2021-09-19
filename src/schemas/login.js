import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("required field")
    .email('check the correct spelling of the email'),
  fName: Yup.string()
  .required("required field"),
  lName: Yup.string()
  .required("required field"),
  password: Yup.string()
    .required("required field"),
});
