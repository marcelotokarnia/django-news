import { map } from 'ramda'

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  return new Promise((resolve, reject) => {
    response
      .json()
      .catch(() =>
        reject(new Error({
          msg: 'ERROR',
          code: 'default',
        })))
      .then((json) => {
        let code = -1
        let list

        if (json && json.Error) {
          code = json.Error.Code
          if (json.Errors) {
            list = map(err => ({
              code: err.Code || '',
            }), json.Errors)
          }
        }
        reject(new Error({ list, code: code || '' }))
      })
  })
}

export function parseJSON(response) {
  return response.json()
}
