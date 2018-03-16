import { map, toLower } from 'ramda'
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

class Nav extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
    username: PropTypes.string,
  }

  static defaultProps = {
    username: '',
  }

  componentDidMount = () => {
    this.props.fetchCategories()
    this.props.fetchUser()
  }

  render = () => {
    const { categories, isFetching, username } = this.props
    return (
      <div className="pa3 bb bg-white b--black navbar navbar-fixed-top">
        <div className="container">
          <div className="navbar-header pull-left navbar-menu_minified">
            <Link to="/news" className="fr navbar-menu_logo" title="Logo">
              <img alt="Logo" src={logo} />
            </Link>
            <button type="button" className="navbar-toggle navbar-menu_toggle" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
              <img alt="Menu" src={menu} />
            </button>
          </div>
          <div id="navbar-collapse" className="collapse navbar-menu_top">
            <ul className="nav navbar-nav navbar-right">
              { isFetching
                ? <Loading />
                : map(({ name }) => (
                  <li>
                    <Link className="bg-animate pointer dark-gray" to={`/news/${toLower(name)}`}>
                      {name}
                    </Link>
                  </li>
                ), categories)
              }
              { username
                ? (
                  <Fragment>
                    <li>
                      <Link className="bg-animate blue pointer ml5-l" to="/user">User Area</Link>
                    </li>
                    <li>
                      <a className="bg-animate blue pointer ml5-l" href="/api/logout">LOGOUT</a>
                    </li>
                  </Fragment>)
                : (
                  <li>
                    <Link className="bg-animate blue pointer ml5-l" to="/login">
                      LOGIN
                    </Link>
                  </li>
                )
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
  username: state.User.username,
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: bindActionCreators(fetchCategories, dispatch),
  fetchUser: bindActionCreators(fetchUser, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
