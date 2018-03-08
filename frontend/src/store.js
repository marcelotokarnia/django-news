import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './reducers'

const configureStore = () => createStore(rootReducer)

export default configureStore()
