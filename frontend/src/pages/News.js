import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { map } from 'ramda'

import { fetchNews } from '../actions/News'
import Loading from '../components/Loading'
import PieceNews from '../components/PieceNews'

class News extends Component {
  static propTypes = {
    news: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.object,
    fetchNews: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  componentWillMount = () => {
    this.props.fetchNews()
  }

  render = () => {
    const { news, isFetching } = this.props

    return isFetching
      ? <Loading />
      : map(({ title, thumbnail }) =>
        (<PieceNews
          title={title}
          smallImage={thumbnail ? thumbnail.small : null}
          bigImage={thumbnail ? thumbnail.big : null}
        />),
      news)
  }
}

const mapStateToProps = state => ({
  news: state.News.news,
  isFetching: state.News.isFetching,
  error: state.News.error,
})

const mapDispatchToProps = dispatch => ({
  fetchNews: bindActionCreators(fetchNews, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
