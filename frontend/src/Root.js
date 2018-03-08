import { Provider } from 'react-redux'
import App from './App'
import ReactDOM from "react-dom"
import React from "react"
import store from './store'
import { BrowserRouter, Route } from 'react-router-dom'


const Root = () => (
  <Provider store={store}>
    <BrowserRouter basename={''}>
      <Route component={App} />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))

export default Root