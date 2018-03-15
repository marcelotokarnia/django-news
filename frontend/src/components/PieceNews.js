import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { cond, equals, always, T } from 'ramda'
import MediaImage from './MediaImage'
import defaultImage from '../../assets/default-image.png'

class PieceNews extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.string,
    size: PropTypes.string,
    categoryName: PropTypes.string.isRequired,
    categoryColor: PropTypes.string.isRequired,
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
      categoryName,
      categoryColor,
      image,
      size,
      text,
      title,
    } = this.props
    return (
      <div className={this.getClasses(size)} >
        <p className="ttu f5" style={{ color: categoryColor }}>{categoryName}</p>
        { size !== 'small' && (
          <a className="pointer w-100 overflow-hidden db relative news-thumbnail-post__link">
            {
              image
                ? <MediaImage className="h-100 w-auto" title={title} image={image} />
                : <img alt={title} src={defaultImage} className="h-100 w-auto" />
            }
            <button className="dn db-l bg-black-30 hover-bg-black-60 bg-animate white pv3 ph4 ba b--white absolute news-thumbnail__btn">Read More</button>
          </a>
        )}
        <h1 className={`pointer ${size === 'big' ? 'f1' : 'f3'} b`}>{title}</h1>
        <div className="pt3 pb4">
          <MediaImage className={`pr3 ${size === 'big' && 'news-author-image__size'}`} title={authorName} image={authorAvatar} />
          <span className="f4 fw3 gray">by {authorName}</span>
        </div>
        <p className={`f4 gray ${size === 'big' ? 'dn-m dn-l' : ''}`}>{text}</p>
      </div>
    )
  }
}

export default PieceNews
