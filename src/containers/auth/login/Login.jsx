import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import { useAppDispatch } from '../../../context';

// ------ Components --------
import TextField from '../../../components/Inputs/InputText';
// ------ Schemas --------
import { loginSchema } from '../../../schemas/login';
// ------ utils --------
import AuthSession from '../../../utils/helpers/authSession';

import './style.scss';

const Login = () => {
  const dispatch = useAppDispatch();

  const { push } = useHistory();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });
    const { handleSubmit, control, formState: { errors, isValid } } = methods;
    const onSubmit = (data) => {
      delete data.password;
      AuthSession.setUser(data);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data});
      push('/');
    };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-heading">Sign In</div>
        <Controller
          name="fName"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="First name"
              name="fName"
              errors={errors}
            />
          )}
        />
        <Controller
          name="lName"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last name"
              name="lName"
              errors={errors}
            />
          )}
        />
        <Controller
          name="email"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              name="email"
              errors={errors}
            />
          )}
        />
        <Controller
          name="password"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              name="password"
              errors={errors}
              secure
            />
          )}
        />
        <Button 
          variant="contained" 
          color="primary"
          type="submit"
          disabled={!isValid}
        >
          Sign in
        </Button>
      </form>
    </div>
  )
}

export default Login;
