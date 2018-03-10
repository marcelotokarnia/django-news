import { REQUEST_NEWS, RECEIVE_NEWS, RECEIVE_NEWS_ERROR } from './types'
import { checkStatus, parseJSON } from './utils'
import * as API from './api'

export const requestNews = () => ({
  type: REQUEST_NEWS,
})

export const receiveNews = news => ({
  type: RECEIVE_NEWS,
  news,
})

export const receiveError = error => ({
  type: RECEIVE_NEWS_ERROR,
  error,
})

export const fetchNews = () => (dispatch) => {
  dispatch(requestNews())

  return window.fetch(`${API.NEWS}?format=json`, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(news => dispatch(receiveNews(news)))
    .catch(error => dispatch(receiveError(error)))
}
