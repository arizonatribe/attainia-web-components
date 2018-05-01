import {either, path, pathOr} from 'ramda'
import styled from 'styled-components'

export const DownCaret = styled.i`
    display: block;
    position: absolute;
    top: ${pathOr('1.15em', ['styles', 'top'])};
    right: ${pathOr('1.15em', ['styles', 'right'])};
    color: ${either(path(['styles', 'color']), pathOr('white', ['theme', 'colors', 'grayscale', 'white']))};
    &::before {
        content: '';
    }
    content: '';
    width: 0.563em;
    height: 0.563em;
    border-style: solid;
    border-width: 0.125em 0.125em 0 0;
    transform: rotate(135deg);
    transition: transform .05s ease;
`
export const WithoutDropdownArrow = styled.section`
    .rw-select {
        display: none;
    }

    .rw-i-caret-down::before {
        content: '';
    }

    .rw-i-caret-down {
        content: '';
        border: 0;
    }
`
export const WithDropdownArrow = styled.section`
    .rw-i-caret-down::before {
        content: '';
    }

    .rw-i-caret-down {
        content: '';
        width: 0.563em;
        height: 0.563em;
        border-style: solid;
        border-width: 0.125em 0.125em 0 0;
        transform: rotate(135deg);
        transition: transform .05s ease;
    }
`
