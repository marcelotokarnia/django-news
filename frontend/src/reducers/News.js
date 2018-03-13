import { clone } from 'ramda'
import {
  REQUEST_NEWS,
  RECEIVE_NEWS,
  RECEIVE_NEWS_ERROR,
} from '../actions/types'


const initialState = {
  news: [],
  isFetching: false,
}

const News = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_NEWS: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case RECEIVE_NEWS: {
      return {
        ...state,
        isFetching: false,
        news: clone(action.news),
      }
    }
    case RECEIVE_NEWS_ERROR: {
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

export default News
