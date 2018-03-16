import {pickBy, isNil, complement} from 'ramda'

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FieldError from './FieldError'
import InputField from './InputField'
import CheckboxLabel from './CheckboxLabel'

const isNotNil = complement(isNil)
const isCheck = type => /checkbox/i.test(type)

const FieldWrapper = styled.div`
    ${props => isCheck(props.type) && 'width: 16px;'} 
    ${props => isCheck(props.type) && 'position: relative;'} 
`

const FormField = ({
    handlers, input, id, meta: {touched, error}, label, name, placeholder, type, checked, value, className
}) =>
    <FieldWrapper type={type} className={`${className}`}>
        {isNotNil(label) && !isCheck(type) && <label htmlFor={id}>{label}</label>}
        <InputField {...pickBy(isNotNil, {id, value, checked, type, placeholder, name, ...input, ...handlers})} />
        {isNotNil(label) && isCheck(type) &&
            <CheckboxLabel onClick={handlers.onChange}>{label}</CheckboxLabel>
        }
        {touched && error && <FieldError>{error}</FieldError>}
    </FieldWrapper>

FormField.propTypes = {
    handlers: PropTypes.shape({
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onDragStart: PropTypes.func,
        onDrop: PropTypes.func,
        onFocus: PropTypes.func,
        onUpdate: PropTypes.func
    }),
    meta: PropTypes.shape({
        active: PropTypes.bool,
        checked: PropTypes.bool,
        dirty: PropTypes.bool,
        error: PropTypes.arrayOf(PropTypes.string),
        invalid: PropTypes.bool,
        pristine: PropTypes.bool,
        touched: PropTypes.bool,
        valid: PropTypes.bool,
        visited: PropTypes.bool
    }),
    className: PropTypes.string,
    input: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object
    ]),
    label: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    checked: PropTypes.bool,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string
    ])
}

FormField.defaultProps = {
    meta: {},
    handlers: {},
    input: {},
    className: ''
}

export default FormField
