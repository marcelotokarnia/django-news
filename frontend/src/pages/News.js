import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { cond, equals, always, gte, T, join, trim } from 'ramda'

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

  getSize = cond([
    [equals(0), always('big')],
    [gte(2), always('medium')],
    [T, always('small')],
  ])

  render = () => {
    const { news, isFetching } = this.props

    return isFetching
      ? <Loading />
      : (
        <div className="container">
          {news.map(({
            title,
            text,
            thumbnail,
            id,
            category: {
              name: categoryName,
            },
            author: {
              user: {
                avatar: {
                  big: authorAvatar
                },
                first_name='',
                last_name=''
              }
            }
          }, idx) => (
            <PieceNews
              key={id}
              title={title}
              text={text}
              category={categoryName}
              size={this.getSize(idx)}
              image={thumbnail ? thumbnail.small : null}
              authorAvatar={authorAvatar}
              authorName={trim(join(' ', [first_name, last_name]))}
            />
          ))}
        </div>
      )
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
