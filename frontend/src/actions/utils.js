export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  return new Promise((resolve, reject) => {
    response
      .json()
      .catch(() =>
        reject({
          msg: 'ERROR',
          code: 'default',
        })
      )
      .then(json => {
        let message
        let code = -1
        let list

        if (json && json.Error) {
          code = json.Error.Code
          message = <FormattedMessage id={`error.${code}`} />
          if (json.Errors) {
            list = json.Errors.map(error => ({
            code: error.Code || '',
            message: <FormattedMessage id={`error.${error.Code}`} />,
            }))
          }
        }
        reject({ message, list, code: code || '' })
      })
  })
}

export function parseJSON(response) {
  return response.json()
}