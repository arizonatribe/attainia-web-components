import {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {getAccessTokenFromStorage, isValidToken, removeToken} from './helpers'

class ParseTokenFromStorage extends PureComponent {
    componentWillMount() {
        const token = this.props.tryParseTokenFromStorage()
        if (this.props.isValidToken(token)) {
            this.props.parsedToken(token)
        } else if (this.props.removeToken) {
            this.props.removeToken(token)
        }
    }

    render() {
        return this.props.children
    }
}

ParseTokenFromStorage.propTypes = {
    children: PropTypes.node,
    isValidToken: PropTypes.func.isRequired,
    parsedToken: PropTypes.func.isRequired,
    removeToken: PropTypes.func,
    tryParseTokenFromStorage: PropTypes.func.isRequired
}

ParseTokenFromStorage.defaultProps = {
    removeToken,
    isValidToken,
    tryParseTokenFromStorage: getAccessTokenFromStorage
}

export default ParseTokenFromStorage
