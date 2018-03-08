import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import News from './pages/News'

export default (
  <Switch>
    <Route path="/news" component={News} />

    <Redirect exact from="/" to="/news" />
  </Switch>
)