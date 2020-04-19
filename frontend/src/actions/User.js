import {
  REQUEST_USER, RECEIVE_USER,
  RECEIVE_USER_ERROR,
  REQUEST_CHANGE_USER_PREFERENCES,
  RECEIVE_USER_PREFERENCES,
} from './types'
import * as API from './api'

export const requestUser = () => ({
  type: REQUEST_USER,
})

export const requestChangeUserPreferences = () => ({
  type: REQUEST_CHANGE_USER_PREFERENCES,
})

export const receiveUserPreferences = categories => ({
  type: RECEIVE_USER_PREFERENCES,
  categories,
})

export const receiveUser = profile => ({
  type: RECEIVE_USER,
  profile,
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
    .then(response => response.json())
    .then(profile => dispatch(receiveUser(profile)))
    .catch(error => dispatch(receiveError(error)))
}

export const mutatePreferences = preferences => (dispatch) => {
  dispatch(requestChangeUserPreferences())

  return window.fetch(`${API.CHANGE_USER_PREFERENCES}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preferences),
  })
    .then(() => window.location.replace('/news'))
    .catch(error => dispatch(receiveError(error)))
}
