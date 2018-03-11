import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MediaImage from './MediaImage'
import { cond, equals, always, T } from 'ramda'

class PieceNews extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.string,
    size: PropTypes.string,
    category: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    authorAvatar: PropTypes.string.isRequired,
  }

  static defaultProps = {
    image: null,
    size: 'small',
  }

  componentDidMount = () => {

  }

  getClasses = cond([
    [equals('big'), always('col-md-6')],
    [equals('medium'), always('col-md-3 col-sm-6')],
    [T, always('col-md-4 col-sm-6')],
  ])

  render = () => {
    const {
      authorName,
      authorAvatar,
      category,
      image,
      size,
      text,
      title,
    } = this.props
    return (
      <div className={this.getClasses(size)} >
        <label>{category}</label>
        {image && size !== 'small' && (
          <a className="pointer">
            <MediaImage title={title} image={image} />
            <button>Read More</button>
          </a>
        )}
        <h1 className="pointer">{title}</h1>
        <div>
            <MediaImage title={authorName} image={authorAvatar} />
            <label>by {authorName}</label>
        </div>
        { size !== 'big' && <p>{text}</p>}
      </div>
    )
  }
}

export default PieceNews
