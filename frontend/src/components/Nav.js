import { map } from 'ramda'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import React, { Component, Fragment } from 'react'
import logo from '../../assets/logo.png'
import menu from '../../assets/menu.png'
import { fetchCategories } from '../actions/Categories'

import Loading from './Loading'
import Category from './Category'

class Nav extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.object,
    fetchCategories: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  componentDidMount = () => {
    this.props.fetchCategories()
  }

  render = () => {
    const { categories, isFetching } = this.props
    return (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
              <img alt="Menu" src={menu} />
            </button>
            <a href="/news" title="Logo">
              <img alt="Logo" src={logo} />
            </a>
          </div>
          <div id="navbar-collapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              { isFetching
                ? <Loading />
                : map(({ name }) => <li className="pointer">{name}</li>, categories)
              }
              <li className="pointer">LOGIN</li>
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
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: bindActionCreators(fetchCategories, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
