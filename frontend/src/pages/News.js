import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  cond, equals, always, append,
  gte, T, join, trim, map,
  isEmpty, prepend, take, drop } from 'ramda'

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

  separateNews = (list) => isEmpty(list) ? [] : prepend(take(3, list), this.separateNews(drop(3, list)))

  getSize = cond([
    [equals(0), always('big')],
    [gte(2), always('medium')],
    [T, always('small')],
  ])

  newsTransform = (news) => this.separateNews(
    news.reduce((acc, piece, idx) => {
      const {
        title,
        text,
        thumbnail,
        id,
        category: {
          name: categoryName,
          color: categoryColor
        },
        author: {
          user: {
            avatar: {
              big,
              small
            },
            first_name='',
            last_name=''
          }
        }
      } = piece
      const size = this.getSize(idx)
      const authorAvatar = size === 'big' ? big : small
      const image = thumbnail
        ? size === 'big'
          ? thumbnail.big
          : thumbnail.small
        : null
      const authorName = trim(join(' ', [first_name, last_name]))
      return append({
        title, text, image, size,
        id, categoryName, categoryColor,
        authorAvatar, authorName}, acc)
    }, [])
  )

  render = () => {
    const { news, isFetching } = this.props

    if (isFetching) {
      return (<div className="mt7"><Loading /></div>)
    }

    const containers = this.newsTransform(news)

    return (
      <div className="mt7">
        {containers.map((container, idx) => (
          <div key={idx} className="container mb4 relative">
            {map(
              ({title, text, image, size,
              id, categoryName, categoryColor,
              authorAvatar, authorName}) => (
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
              ), container
            )}
          { idx !== (containers.length - 1) && <hr className="hidden-xs absolute w-100 bottom--2"/>}
          </div>
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
