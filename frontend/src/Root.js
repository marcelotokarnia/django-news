import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './App'
import store from './store'

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<Root />, window.document.getElementById('root'))

export default Root
