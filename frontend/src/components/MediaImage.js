import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MediaImage extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
  }

  render = () => {
    const { title, image } = this.props
    return <img alt={title} src={`/media/${image}`} />
  }
}

export default MediaImage