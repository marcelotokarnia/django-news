import { clone } from 'ramda'
import {
  REQUEST_USER,
  RECEIVE_USER,
  RECEIVE_USER_ERROR,
  REQUEST_CHANGE_USER_PREFERENCE,
  RECEIVE_USER_PREFERENCE
} from '../actions/types'


const initialState = {
  username: '',
  categories: [],
  isFetching: false,
  isMutating: false,
}

const User = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USER: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case RECEIVE_USER: {
      return {
        ...state,
        isFetching: false,
        username: action.profile.user.username,
        categories: clone(action.profile.categories)
      }
    }
    case RECEIVE_USER_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    }
    case REQUEST_CHANGE_USER_PREFERENCE: {
      return {
        ...state,
        isMutating: true,
      }
    }
    case RECEIVE_USER_PREFERENCE: {
      return {
        ...state,
        isMutating: false,
        categories: clone(action.profile.categories),
      }
    }
    default:
      return state
  }
}

export default User
