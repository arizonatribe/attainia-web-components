import {PureComponent} from 'react'
import PropTypes from 'prop-types'

class JwtDecode extends PureComponent {
  componentDidMount() {
    if (this.props.jwt) {
      this.props.tryDecodeJwt(this.props.jwt)
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.jwt && nextProps.jwt !== this.props.jwt) {
      this.props.tryDecodeJwt(nextProps.jwt)
    }
  }

  render() {
    return this.props.children
  }
}

JwtDecode.propTypes = {
  children: PropTypes.node,
  jwt: PropTypes.string,
  tryDecodeJwt: PropTypes.func.isRequired
}

export default JwtDecode
