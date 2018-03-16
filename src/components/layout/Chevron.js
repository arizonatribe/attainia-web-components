import styled from 'styled-components'

export default styled.i`
    content: '';
    width: 0.5em;
    height: 0.5em;
    display: block;
    border-style: solid;
    border-width: 0.11em 0.11em 0 0;
    transform: rotate(${props => (props.isOpen ? 135 : 45)}deg);
    transition: transform .05s ease;
`
