import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pathOr} from 'ramda'

const ErrorMessage = styled.div`
    background: ${pathOr('black', ['theme', 'colors', 'grayscale', 'black'])};
    color: ${pathOr('red', ['theme', 'colors', 'primary', 'md'])};
    font-size: ${props => (
        props.styles.fontSize ||
        pathOr('12px', ['theme', 'fonts', 'fontSize'])(props)
    )};
    font-family: ${pathOr('Arial', ['theme', 'fonts', 'fontFamily'])};
    text-align: center;
`
ErrorMessage.propTypes = {
    styles: PropTypes.shape({
        fontSize: PropTypes.string
    })
}

ErrorMessage.defaultProps = {
    styles: {}
}

export default ErrorMessage
