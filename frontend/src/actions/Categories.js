import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES, RECEIVE_CATEGORIES_ERROR } from './types'
import * as API from './api'

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
})

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
})

export const receiveError = error => ({
  type: RECEIVE_CATEGORIES_ERROR,
  error,
})

export const fetchCategories = () => (dispatch) => {
  dispatch(requestCategories())

  return window.fetch(`${API.CATEGORIES}?format=json`, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then(response => response.json())
    .then(categories => dispatch(receiveCategories(categories)))
    .catch(error => dispatch(receiveError(error)))
}
