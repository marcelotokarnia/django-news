import { toUpper } from 'ramda'
import { REQUEST_NEWS, RECEIVE_NEWS, RECEIVE_NEWS_ERROR } from './types'
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

export const fetchNews = category => (dispatch) => {
  dispatch(requestNews())

  return window.fetch(`${API.NEWS}?format=json${category ? `&category=${toUpper(category)}` : ''}`, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then(response => response.json())
    .then(news => dispatch(receiveNews(news)))
    .catch(error => dispatch(receiveError(error)))
}
