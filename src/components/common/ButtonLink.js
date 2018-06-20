import styled from 'styled-components'
import {path, pathOr} from 'ramda'

export default styled.button`
    padding: 0;
    border: none;
    display: block;
    cursor: pointer;
    background: transparent;
    text-decoration: underline;
    color: ${pathOr('royalblue', ['theme', 'colors', 'secondary', 'dk'])};
    font-size: ${props => (
        path(['styles', 'fontSize'])(props) ||
        pathOr('15px', ['theme', 'fonts', 'fontSize'])(props)
    )};
    &:focus {
        outline: none;
    }
`
