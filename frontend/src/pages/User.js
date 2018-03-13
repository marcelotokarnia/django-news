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
    return <div>HELLO {username}</div>
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
