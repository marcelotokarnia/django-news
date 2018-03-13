import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  cond, equals, always, append,
  gte, T, join, trim, map,
  isEmpty, prepend, take, drop,
} from 'ramda'

import { fetchNews } from '../actions/News'
import Loading from '../components/Loading'
import PieceNews from '../components/PieceNews'

class News extends Component {
  static propTypes = {
    news: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchNews: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  componentWillMount = () => {
    const { match: { params: { category } } } = this.props
    this.props.fetchNews(category)
  }

  componentWillReceiveProps = (nextProps) => {
    const { match: { params: { category } } } = this.props
    const { match: { params: { category: nextCategory } } } = nextProps
    if (category !== nextCategory) {
      nextProps.fetchNews(nextCategory)
    }
  }

  getSize = cond([
    [equals(0), always('big')],
    [gte(2), always('medium')],
    [T, always('small')],
  ])

  separateNews = list => (
    isEmpty(list) ? [] : prepend(take(3, list), this.separateNews(drop(3, list)))
  )

  newsTransform = news => this.separateNews(
    news.reduce((acc, piece, idx) => {
      const {
        title,
        text,
        thumbnail,
        id,
        category: {
          name: categoryName,
          color: categoryColor,
        },
        author: {
          user: {
            avatar: {
              big,
              small,
            },
            first_name = '', // eslint-disable-line camelcase
            last_name = '', // eslint-disable-line camelcase
          },
        },
      } = piece
      const size = this.getSize(idx)
      const authorAvatar = size === 'big' ? big : small
      const image = thumbnail && (
        size === 'big'
          ? thumbnail.big
          : thumbnail.small)
      const authorName = trim(join(' ', [first_name, last_name])) // eslint-disable-line camelcase
      return append({
        title,
        text,
        image,
        size,
        id,
        categoryName,
        categoryColor,
        authorAvatar,
        authorName,
      }, acc)
    }, []),
  )

  render = () => {
    const { news, isFetching } = this.props

    if (isFetching) {
      return <Loading />
    }

    const containers = this.newsTransform(news)

    return (
      <Fragment>
        {containers.map((container, idx) => (
          <div key={idx} className="container mb4 relative">
            {map(
              ({
                title, text, image, size,
                id, categoryName, categoryColor,
                authorAvatar, authorName,
              }) => (
                <PieceNews
                  key={id}
                  title={title}
                  text={text}
                  categoryName={categoryName}
                  categoryColor={categoryColor}
                  size={size}
                  image={image}
                  authorAvatar={authorAvatar}
                  authorName={authorName}
                />
              ), container,
            )}
            { idx !== (containers.length - 1) && <hr className="hidden-xs absolute w-100 bottom--2" />}
          </div>
        ))}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  news: state.News.news,
  isFetching: state.News.isFetching,
})

const mapDispatchToProps = dispatch => ({
  fetchNews: bindActionCreators(fetchNews, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
