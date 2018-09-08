import {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {setToken} from './helpers'

class WriteTokenToStorage extends PureComponent {
  componentDidMount() {
    if (this.props.token) {
      this.props.tryWriteTokenToStorage(this.props.token, this.props.storageType)
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.token && nextProps.token !== this.props.token) {
      this.props.tryWriteTokenToStorage(nextProps.token, nextProps.storageType)
    }
  }

  render() {
    return this.props.children
  }
}

WriteTokenToStorage.propTypes = {
  children: PropTypes.node,
  storageType: PropTypes.oneOf(['local', 'session', 'none']),
  token: PropTypes.string,
  tryWriteTokenToStorage: PropTypes.func.isRequired
}

WriteTokenToStorage.defaultProps = {
  storageType: 'local',
  tryWriteTokenToStorage: setToken
}

export default WriteTokenToStorage
