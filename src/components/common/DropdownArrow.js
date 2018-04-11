import styled from 'styled-components'

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
        width: 9px;
        height: 9px;
        border-style: solid;
        border-width: 2px 2px 0 0;
        transform: rotate(135deg);
        transition: transform .05s ease;
    }
`
