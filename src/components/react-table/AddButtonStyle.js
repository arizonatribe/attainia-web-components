import styled from 'styled-components'

export default styled.div`
    grid-area: add;
    a {
        text-decoration: none;
    }
    button {
        font-weight: normal;
        font-size: 1.6em;
        border-radius: 2px;
        padding: 0.25em 0.5em;
        height: 30px;
        width: 30px;
        &::after {
            content: '+';
        }
    }
`
