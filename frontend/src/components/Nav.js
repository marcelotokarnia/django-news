import { map } from 'ramda'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import React, { Component, Fragment } from 'react'
import logo from '../../assets/logo.png'
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
      <div className="w-100 h3 bb">
        <img alt="Logo" src={logo} />
        <div className="fr">
          {isFetching
            ? <Loading />
            : (
              <Fragment>
                {map(({ name }) => <Category name={name} />, categories)}
                <div>Login</div>
              </Fragment>
            )
          }
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
