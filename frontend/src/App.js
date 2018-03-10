import React, { Fragment } from 'react'
import Nav from './components/Nav'
import Routes from './routes'

const App = () => (
  <Fragment>
    <Nav />
    {Routes}
  </Fragment>
)

export default App
