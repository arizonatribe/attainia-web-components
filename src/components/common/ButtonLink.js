import styled from 'styled-components'
import {getThemeProp, getProp} from './helpers'

export default styled.button`
    color: ${getThemeProp(['colors', 'secondary', 'dk'], 'royalblue')};
    text-decoration: underline;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    font-size: ${props => (
        getProp(['styles', 'fontSize'])(props) ||
        getThemeProp(['fonts', 'fontSize'], '15px')(props)
    )};
    &:focus {
        outline: none;
    }
`
