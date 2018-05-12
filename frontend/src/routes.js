import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import News from './pages/News'
import Login from './pages/Login'
import User from './pages/User'

export default (
  <Switch>
    <Route path="/news/:category?" component={News} />
    <Route path="/login" component={Login} />
    <Route path="/user" component={User} />

    <Redirect exact from="/" to="/news" />
  </Switch>
)
