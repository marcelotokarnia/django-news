import React, {Component, Fragment} from "react"
import ReactDOM from "react-dom"
import logo from "../../assets/logo.png"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchCategories} from '../actions/Categories'
import {map} from 'ramda'
import Loading from './Loading'
import Category from './Category'

class Nav extends Component {
  componentDidMount = () => {
    this.props.fetchCategories()
  }

  render = () => {
    const {categories, isFetching} = this.props
    return (
      <div className="w-100 h3 bb">
        <img src={logo} />
        <div className="fr">
          {isFetching
            ? <Loading />
            : <Fragment>
              {map(({name}) => <Category name={name}/>, categories)}
              <div>Login</div>
            </Fragment>
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
