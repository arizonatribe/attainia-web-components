import PropTypes from 'prop-types'
import styled from 'styled-components'
import {getThemeProp} from './helpers'

const ErrorMessage = styled.div`
    background: ${getThemeProp(['colors', 'grayscale', 'black'], 'black')};
    color: ${getThemeProp(['colors', 'primary', 'md'], 'red')};
    font-size: ${props => (
        props.styles.fontSize ||
        getThemeProp(['fonts', 'fontSize'], '12px')(props)
    )};
    font-family: ${getThemeProp(['fonts', 'fontFamily'], 'Arial')};
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
