import React, { Component } from 'react'

class Login extends Component {
  render = () => {
    const isInvalid = (/[?&]invalid=([^&]*)/g).exec(window.location.search)
    const invalidUsername = isInvalid && isInvalid[1]
    return (
      <div className="font-display dark-gray flex flex-wrap justify-center w-100">
        <div className="center w-30-l">
          <h1 className="f2 tc mb5 nt5 dark-gray">USER AREA</h1>
          <form action="/api/login/" method="post">
            <input type="hidden" name="next" value="/news/" />
            <div id="div_id_username" className="mb4">
              {invalidUsername && <span className="red fr">The username {invalidUsername} is invalid!</span>}
              <label htmlFor="id_username" className="f4">USERNAME (maybe try "marcelotokarnia")</label>
              <input
                type="text"
                name="username"
                maxLength="100"
                autoCapitalize="off"
                autoCorrect="off"
                className={`w-100 ba br2 mt1 pa3 ${invalidUsername ? 'b--red' : 'b--moon-gray'}`}
                id="id_username"
                required=""
              />
            </div>
            <div id="div_id_password" className="mb4">
              <label htmlFor="id_password" className="w-100 f4">PASSWORD</label>
              <input
                type="password"
                name="password"
                maxLength="100"
                autoCapitalize="off"
                autoCorrect="off"
                className="w-100 ba br2 mt1 pa3 b--moon-gray"
                id="id_password"
                required=""
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue white h3-l h3-m h3-ns h3-xs f3 w-100 bn"
                id="submit-id-submit"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
