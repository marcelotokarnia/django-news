import React, {Component} from 'react'
import PropTypes from 'prop-types'

class PieceNews extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
    }

    render = () => {
        const {title} = this.props
        return <div className="f3">{title}</div>
    }
}

export default PieceNews