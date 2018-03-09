import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchNews} from '../actions/News'
import {map} from 'ramda'

class News extends Component {
  static propTypes = {
    news: PropTypes.arrayOf(PropTypes.object),
    isFetching: PropTypes.bool,
    error: PropTypes.object,
  }

  componentWillMount = () => {
    this.props.fetchNews()
  }

  render = () => {
    return map(news => <div>{news.title}</div>, this.props.news)
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
