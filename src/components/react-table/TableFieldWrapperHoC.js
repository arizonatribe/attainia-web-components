import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {curry, assoc, path, pathEq} from 'ramda'
import {getThemeProp} from '../common'

const onBlur = curry((props, event) => {
    props.onBlur(event)
    props.onStateChange({showField: false})
})

const onChange = curry((props, event) => {
    const value = path(['target', 'value'], event)
    const nextState = assoc('value', value, props.state)
    props.onStateChange(nextState)
})

const showField = curry((props, event) => {
    event.preventDefault()
    props.onStateChange({
        showField: true
    })
})

const isShowField = pathEq(['state', 'showField'], true)

const tableToReduxForm = props => ({
    ...props,
    id: props.name,
    name: props.name,
    value: props.state.value,
    // Provide legacy Redux Form interface
    handlers: {
        onBlur: onBlur(props),
        onChange: onChange(props)
    },
    // Maintain dropdown interface
    onBlur: onBlur(props),
    onChange: onChange(props)
})

const ShowFieldLink = styled.a`
    color: ${getThemeProp(['colors', 'grayscale', 'black'])};
    text-decoration: none;
    &:hover {
        text-decoration: none;
        border-bottom: 1px dotted ${getThemeProp(['colors', 'grayscale', 'md'])};
    }
`

const FormFieldWrapperHoC = TableField => {
    const FormFieldWrapper = props => {
        const formFieldProps = tableToReduxForm(props)
        return (
            <div>
                {isShowField(props) && <TableField {...formFieldProps} />}
                {!isShowField(props) && (
                    <ShowFieldLink href="#showField" onClick={showField(props)} onFocus={showField(props)}>
                        {props.value}
                    </ShowFieldLink>
                )}
            </div>
        )
    }

    FormFieldWrapper.displayName = `FormFieldWrapper(${TableField.displayName})`

    FormFieldWrapper.propTypes = {
        state: PropTypes.shape({}).isRequired,
        onStateChange: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        onBlur: PropTypes.func,
        onChange: PropTypes.func
    }

    return FormFieldWrapper
}

export default FormFieldWrapperHoC
