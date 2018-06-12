import React from 'react'
import styled, {withTheme} from 'styled-components'
import PropTypes from 'prop-types'
import {either, pathOr, prop} from 'ramda'

export const BaseInputStyles = `
    display: block;
    border-radius: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    font-size: 14px;
    line-height: 16px;
    height: 2.3em;
    box-shadow: none;
    &:focus {
        outline: none;
    }
`
export const CheckboxStyles = ({type}) => (
    /(checkbox)/i.test(type) ? `
        visibility: hidden;
        &:checked + label:after {
            opacity: 1;
        }    
    ` : ''
)
export const TextArea = styled.textarea`
    ${BaseInputStyles}
    resize: none;
    box-shadow: none;
    padding: ${pathOr('0.6em', ['padding'])};
    color: ${either(prop('color'), pathOr('darkgray', ['theme', 'colors', 'misc', 'gray', 'lightJet']))};
    background-color: ${either(prop('backgroundColor'), pathOr('white', ['theme', 'colors', 'grayscale', 'white']))};
    border: 1px solid ${either(prop('border'), pathOr('lightgray', ['theme', 'colors', 'misc', 'gray', 'timberwolf']))};
`
export const Input = styled.input`
    ${BaseInputStyles}
    ${CheckboxStyles}
    color: ${either(prop('color'), pathOr('darkgray', ['theme', 'colors', 'misc', 'gray', 'lightJet']))};
    background-color: ${either(prop('backgroundColor'), pathOr('white', ['theme', 'colors', 'grayscale', 'white']))};
    border: 1px solid ${either(prop('border'), pathOr('lightgray', ['theme', 'colors', 'misc', 'gray', 'timberwolf']))};
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
