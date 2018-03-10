import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES, RECEIVE_CATGORIES_ERROR } from './types'
import {checkStatus, parseJSON} from './utils'
import * as API from './api'

export const requestCategories = () => {
  return {
    type: REQUEST_CATEGORIES,
  }
}

export const receiveCategories = categories => {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  }
}

export const receiveError = error => {
  return {
    type: RECEIVE_CATEGORIES_ERROR,
    error,
  }
}

export const fetchCategories = () => {
  return dispatch => {
    dispatch(requestCategories())

    return fetch(`${API.CATEGORIES}?format=json`, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(categories => dispatch(receiveCategories(categories)))
      .catch(error => dispatch(receiveError(error)))
  }
}