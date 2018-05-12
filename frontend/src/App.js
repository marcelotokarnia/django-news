import React from 'react'
import Nav from './components/Nav'
import Routes from './routes'

const App = () => (
  <main>
    <Nav />
    <div className="mt7">{Routes}</div>
  </main>
)

export default App
