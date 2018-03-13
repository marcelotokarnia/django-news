import { clone } from 'ramda'
import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  RECEIVE_CATEGORIES_ERROR,
} from '../actions/types'

const initialState = {
  categories: [],
  isFetching: false,
}

const Categories = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CATEGORIES: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case RECEIVE_CATEGORIES: {
      return {
        ...state,
        isFetching: false,
        categories: clone(action.categories),
      }
    }
    case RECEIVE_CATEGORIES_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    }
    default:
      return state
  }
}

export default Categories
