import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import News from './pages/News'
import Login from './pages/Login'

export default (
  <Switch>
    <Route path="/news/:category?" component={News} />
    <Route path="/login" component={Login} />

    <Redirect exact from="/" to="/news" />
  </Switch>
)
