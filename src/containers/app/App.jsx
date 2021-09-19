import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from '../auth/login/Login';
import Home from '../auth/home/Home';
import Channel from '../channel/Channel';
import Profile from '../profile/Profile';
import ProtectedRoute from '../../router/component/Protected';
import '../../styles/index.scss';

const App = () => (
  <Switch>
    <Route path="/login" component={Login} exact />
    <ProtectedRoute path="/" component={Home} exact />
    <ProtectedRoute path="/channel/:id" component={Channel} />
    <ProtectedRoute path="/profile" component={Profile} />
  </Switch>
)

export default App
