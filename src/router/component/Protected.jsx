import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAppState } from '../../context';

const ProtectedRoute = ({component: Component, ...rest}) => {
  const state = useAppState();

  return (
    <Route
      {...rest}
      render={(props) => state.get("isAuth")
        ? <Component {...props} /> 
        : <Redirect to="/login" />
      }
    />
  );
}


export default ProtectedRoute;
