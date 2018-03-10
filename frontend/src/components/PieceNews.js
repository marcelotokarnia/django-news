import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class PieceNews extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    smallImage: PropTypes.string,
    bigImage: PropTypes.string,
  }

  static defaultProps = {
    smallImage: null,
    bigImage: null,
  }

  componentDidMount = () => {

  }

  render = () => {
    const { title, smallImage } = this.props
    return (
      <Fragment>
        <div className="f3">{title}</div>
        {smallImage && <img alt={title} src={`/media/${smallImage}`} />}
      </Fragment>
    )
  }
}

export default PieceNews
