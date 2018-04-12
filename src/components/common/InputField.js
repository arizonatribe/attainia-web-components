import React from 'react'
import styled, {withTheme} from 'styled-components'
import PropTypes from 'prop-types'
import {either, pathOr, prop} from 'ramda'

const BaseStyles = `
    border-radius: 0;
    box-sizing: border-box;
    padding: 5px;
    line-height: 16px;
    height: 2.3em;
    box-shadow: none;
    color: ${either(prop('color'), pathOr('darkgray', ['theme', 'colors', 'misc', 'gray', 'lightJet']))};
    &:focus {
        outline: none;
    }
`
const ExtraStyles = ({type}) => (
    /(password|url|number|text|email)/i.test(type) ? `
        padding: 8px;
        width: 100%;
        line-height: 18px;
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
    width: 100%;
    resize: none;
    display: block;
    box-shadow: none;
    padding: ${pathOr('0.6em', ['padding'])};
    border: 1px solid ${either(prop('border'), pathOr('lightgray', ['theme', 'colors', 'misc', 'gray', 'timberwolf']))};
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

export default withTheme(InputField)
