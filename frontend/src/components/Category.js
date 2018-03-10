import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Category extends Component {
    static propTypes = {
      name: PropTypes.string.isRequired,
      classes: PropTypes.string,
    }
    static defaultProps = {
      classes: 'bg-red',
    }

    render = () => {
      const { name, classes } = this.props
      return <div className={classes}>{name}</div>
    }
}

export default Category
