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
        width: 0.9em;
        height: 0.9em;
        border-style: solid;
        border-width: 0.11em 0.11em 0 0;
        transform: rotate(135deg);
        transition: transform .05s ease;
    }
`
