import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { mutatePreferences } from '../actions/User'

class User extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
  }
  render = () => {
    const { username } = this.props
    return (
      <div className="font-display dark-gray flex flex-wrap justify-center w-100">
        <div className="center w-50-l">
          <h1 className="f2 tc mb5 nt5 dark-gray">WELCOME, <b className="ttu blue">{username}</b></h1>
          <div className="pv3">
            <label htmlFor="id_username" className="w-100 f4">MY INTERESTS</label>
          </div>
          <div className="flex flex-wrap justify-center w-100">
            <button className="bg-blue white h3-l h3-m h3-ns h3-xs f3 w-30 bn center">
              SAVE
            </button>
          </div>
          <div className="flex flex-wrap justify-center w-100">
            <button className="bg-white blue h3-l h3-m h3-ns h3-xs f3 w-30 bn center">
              BACK TO HOME
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.Categories.categories,
  isFetching: state.Categories.isFetching,
  isMutating: state.User.isMutating,
  preferred: state.User.categories,
  username: state.User.username,
})

const mapDispatchToProps = dispatch => ({
  mutatePreferences: bindActionCreators(mutatePreferences, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
