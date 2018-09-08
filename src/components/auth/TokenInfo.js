import {PureComponent} from 'react'
import PropTypes from 'prop-types'

class TokenInfo extends PureComponent {
  componentDidMount() {
    if (this.props.token) {
      this.props.tryGetTokenInfo(this.props.token)
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.token && nextProps.token !== this.props.token) {
      this.props.tryGetTokenInfo(nextProps.token)
    }
  }

  render() {
    return this.props.children
  }
}

TokenInfo.propTypes = {
  children: PropTypes.node,
  token: PropTypes.string,
  tryGetTokenInfo: PropTypes.func.isRequired
}

export default TokenInfo
