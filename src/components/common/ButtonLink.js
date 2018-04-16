import styled from 'styled-components'
import {getThemeProp, getProp} from './helpers'

export default styled.button`
    padding: 0;
    border: none;
    display: block;
    cursor: pointer;
    background: transparent;
    text-decoration: underline;
    color: ${getThemeProp(['colors', 'secondary', 'dk'], 'royalblue')};
    font-size: ${props => (
        getProp(['styles', 'fontSize'])(props) ||
        getThemeProp(['fonts', 'fontSize'], '15px')(props)
    )};
    &:focus {
        outline: none;
    }
`
