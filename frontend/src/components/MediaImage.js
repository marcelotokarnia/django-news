import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MediaImage extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  render = () => {
    const { title, image, className } = this.props
    return <img className={className} alt={title} src={`/media/${image}`} />
  }
}

export default MediaImage