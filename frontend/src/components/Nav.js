import { map } from 'ramda'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import React, { Component, Fragment } from 'react'
import logo from '../../assets/logo.png'
import menu from '../../assets/menu.png'
import { fetchCategories } from '../actions/Categories'
import { fetchUser } from '../actions/User'

import Loading from './Loading'
import Category from './Category'

class Nav extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.object,
    fetchCategories: PropTypes.func.isRequired,
    preferred: PropTypes.arrayOf(PropTypes.string),
    username: PropTypes.string
  }

  static defaultProps = {
    error: null,
    preferred: [],
    username: ''
  }

  componentDidMount = () => {
    this.props.fetchCategories()
    this.props.fetchUser()
  }

  render = () => {
    const { categories, isFetching, username, preferred } = this.props
    return (
      <div className="pa3 bb bg-white b--black navbar navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
              <img alt="Menu" src={menu} />
            </button>
            <Link to="/news" title="Logo">
              <img alt="Logo" src={logo} />
            </Link>
          </div>
          <div id="navbar-collapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              { isFetching
                ? <Loading />
                : map(({ name }) =>
                  <li><Link className="pointer dark-gray" to="/news">{name}</Link></li>,
                categories)
              }
              { username
                ? <Fragment>
                  <li>
                    <Link className="blue pointer ml5-l" to="/user">{username}</Link>
                  </li>
                  <li>
                    <a className="blue pointer ml5-l" href="/api/logout">LOGOUT</a>
                  </li>
                </Fragment>
                : <li><Link className="blue pointer ml5-l" to="/login">LOGIN</Link></li>
              }
            </ul>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  categories: state.Categories.categories,
  isFetching: state.Categories.isFetching,
  error: state.Categories.error,
  preferred: state.User.categories,
  username: state.User.username
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: bindActionCreators(fetchCategories, dispatch),
  fetchUser: bindActionCreators(fetchUser, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
