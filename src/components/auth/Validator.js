import {PureComponent} from 'react'
import PropTypes from 'prop-types'

class Validator extends PureComponent {
  componentDidMount() {
    if (this.props.token) {
      this.props.tryValidateToken(this.props.token)
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.token && nextProps.token !== this.props.token) {
      this.props.tryValidateToken(nextProps.token)
    }
  }

  render() {
    return this.props.children
  }
}

Validator.propTypes = {
  children: PropTypes.node,
  token: PropTypes.string,
  tryValidateToken: PropTypes.func.isRequired
}

export default Validator
