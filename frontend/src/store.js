import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk))

export default configureStore()
