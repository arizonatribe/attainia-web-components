import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const BaseStyles = `
    box-sizing: border-box;
    padding: 5px;
    line-height: 16px;
    &:focus {
        outline: none;
    }
`
const ExtraStyles = ({type}) => (
    /(password|url|number|text|email)/i.test(type) ? `
        height: 2.000em;
        width: 100%;
        font-size: 14px;
        background-color: white;
    ` : ''
)
const CheckboxStyles = ({type}) => (
    /(checkbox)/i.test(type) ? `
        visibility: hidden;
        &:checked + label:after {
            opacity: 1;
        }    
    ` : ''
)

const TextArea = styled.textarea`
    ${BaseStyles}
`
const Input = styled.input`
    ${BaseStyles}
    ${ExtraStyles}
    ${CheckboxStyles}
`
const InputField = props => (
    /textarea/i.test(props.type) ?
        <TextArea {...props} /> : <Input {...props} />
)

InputField.propTypes = {
    type: PropTypes.oneOf([
        'checkbox',
        'color',
        'date',
        'email',
        'month',
        'number',
        'password',
        'radio',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'textarea',
        'url',
        'week'
    ])
}

InputField.defaultProps = {
    type: 'text'
}

export default InputField
