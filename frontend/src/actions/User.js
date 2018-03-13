import {
    REQUEST_USER, RECEIVE_USER,
    RECEIVE_USER_ERROR,
    REQUEST_CHANGE_USER_PREFERENCE,
    RECEIVE_USER_PREFERENCE } from './types'
import { checkStatus, parseJSON } from './utils'
import * as API from './api'

export const requestUser = () => ({
  type: REQUEST_USER,
})

export const receiveUser = profile => ({
  type: RECEIVE_USER,
  profile: profile
})

export const receiveError = error => ({
  type: RECEIVE_USER_ERROR,
  error,
})

export const fetchUser = () => (dispatch) => {
  dispatch(requestUser())

  return window.fetch(`${API.USER}?format=json`, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(profile => dispatch(receiveUser(profile)))
    .catch(error => dispatch(receiveError(error)))
}
