import React, { Component } from 'react'

class Login extends Component {
  render = () => {
    return (
      <div className="font-display dark-gray flex flex-wrap justify-center w-100">
        <div className="center w-30">
          <h1 className="f2 tc mb5 nt5 dark-gray">USER AREA</h1>
            <form action="/api/login/" role="form" method="post">
              <input type="hidden" name="csrfmiddlewaretoken" value={csrf_token} />
              <input type="hidden" name="next" value="/news/" />
              <div id="div_id_username" className="mb4">
                <label for="id_username" className="w-100 f4">USERNAME</label>
                <input type="text" name="username" maxlength="100"
                        autocapitalize="off" autocorrect="off"
                        className="w-100 ba br2 mt1 pa3 b--moon-gray"
                        id="id_username" required="" autofocus="" />
              </div>
              <div id="div_id_password" className="mb4">
                <label for="id_password" className="w-100 f4">PASSWORD</label>
                <input type="password" name="password" maxlength="100"
                        autocapitalize="off" autocorrect="off"
                        className="w-100 ba br2 mt1 pa3 b--moon-gray"
                        id="id_password" required="" />
              </div>
              <div>
                <button type="submit" name="submit"
                    className="bg-blue white h3-l h3-m h3-ns h3-xs f3 w-100 bn"
                    id="submit-id-submit">
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