import React, {Fragment} from "react"
import Nav from './components/Nav'
import Routes from './routes'

const App = () => (
  <Fragment>
    <Nav />
    <ul>
      <li>456</li>
      <li>789</li>
    </ul>
    {Routes}
  </Fragment>
)

export default App
