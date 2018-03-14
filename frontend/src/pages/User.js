import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { map, assoc, prop, contains, without, append } from 'ramda'
import { mutatePreferences } from '../actions/User'
import Loading from '../components/Loading'

class User extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool.isRequired,
    isFetchingUser: PropTypes.bool.isRequired,
    isMutating: PropTypes.bool.isRequired,
    preferred: PropTypes.arrayOf(PropTypes.object).isRequired,
    username: PropTypes.string.isRequired,
    mutatePreferences: PropTypes.func.isRequired,
  }

  constructor({ preferred }) {
    super()
    this.state = {
      preferred,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.isFetchingUser && !nextProps.isFetchingUser) {
      this.setState({ preferred: nextProps.preferred })
    }
  }

  treatCategories = () => {
    const { categories } = this.props
    const { preferred } = this.state
    return map(cat => assoc('isPreferred', contains(prop('name', cat), preferred))(cat), categories)
  }

  handleCategoryClick = (cat) => {
    const { preferred } = this.state
    if (contains(cat, preferred)) {
      this.setState({ preferred: without([cat], preferred) })
    } else {
      this.setState({ preferred: append(cat, preferred) })
    }
  }

  render = () => {
    const { username, isFetching, isMutating } = this.props
    const { preferred } = this.state
    if (isFetching) {
      return <Loading />
    }
    const categories = this.treatCategories()
    return (
      <div className="font-display dark-gray flex flex-wrap justify-center w-100">
        <div className="center w-50-l">
          <h1 className="f2 tc mb5 nt5 dark-gray">WELCOME, <b className="ttu blue">{username}</b></h1>
          <div className="mb4">
            <label htmlFor="id_username" className="w-100 f4">MY INTERESTS</label>
          </div>
          <div className="mb5">
            {map(({
              name, color, isPreferred,
            }) => (
              <span
                onClick={() => this.handleCategoryClick(name)}
                key={name}
                style={{ 'border-color': color, color }}
                className={`${isMutating ? 'o-20' : 'pointer'} f3 mr3 pv2 ph4 ba user-category__radius ${isPreferred && 'bw2 b'}`}
              >
                {name}
              </span>
            ), categories)}
          </div>
          <div className="flex flex-wrap justify-center w-100 mb3">
            <button
              className={`${isMutating && 'o-20'} bg-blue white h3-l h3-m h3-ns h3-xs f3 w-30 bn center`}
              onClick={() => !isMutating && this.props.mutatePreferences(preferred)}
            >
              {isMutating ? 'SAVING' : 'SAVE'}
            </button>
          </div>
          <div className="flex flex-wrap justify-center w-100">
            <Link className="bg-white blue h3-l h3-m h3-ns h3-xs f3 center" to="/news">
              BACK TO HOME
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.Categories.categories,
  isFetching: state.Categories.isFetching,
  isFetchingUser: state.User.isFetching,
  isMutating: state.User.isMutating,
  preferred: state.User.categories,
  username: state.User.username,
})

const mapDispatchToProps = dispatch => ({
  mutatePreferences: bindActionCreators(mutatePreferences, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
