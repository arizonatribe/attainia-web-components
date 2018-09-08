import {PureComponent} from 'react'
import PropTypes from 'prop-types'

class AuthStatus extends PureComponent {
  componentWillMount() {
    this.props.startSubscription()
  }

  render() {
    return this.props.children
  }
}

AuthStatus.propTypes = {
  children: PropTypes.node,
  startSubscription: PropTypes.func
}

export default AuthStatus
