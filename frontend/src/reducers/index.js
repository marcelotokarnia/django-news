import { combineReducers } from 'redux'
import News from './News'
import Categories from './Categories'
import User from './User'

export default combineReducers({
  News,
  Categories,
  User,
})
