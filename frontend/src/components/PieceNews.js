import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { cond, equals, always, T } from 'ramda'

class PieceNews extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    smallImage: PropTypes.string,
    bigImage: PropTypes.string,
    size: PropTypes.string,
    category: PropTypes.string.isRequired,
  }

  static defaultProps = {
    smallImage: null,
    bigImage: null,
    size: 'small',
  }

  componentDidMount = () => {

  }

  getClasses = cond([
    [equals('big'), always('col-md-6')],
    [equals('medium'), always('col-md-3 col-xs-6')],
    [T, always('col-md-4 col-xs-6')],
  ])

  render = () => {
    const { title, smallImage, size, category } = this.props
    return (
      <div className={this.getClasses(size)} >
        <label>{category}</label>
        <div className="f3">{title}</div>
        {smallImage && <img alt={title} src={`/media/${smallImage}`} />}
      </div>
    )
  }
}

export default PieceNews
