import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'ramda'
import FormField from '../common/FormField'
import TableFieldWrapperHoC from './TableFieldWrapperHoC'
import TableFieldWithState from './TableFieldWithState'

const FormFieldWrapperWithState = compose(
    TableFieldWithState,
    TableFieldWrapperHoC
)(FormField)

FormField.displayName = 'FormField'

FormFieldWrapperWithState.displayName = 'FormFieldWrapperWithState'

const TableFormField = props => <FormFieldWrapperWithState {...props} />

TableFormField.propTypes = {
    name: PropTypes.string.isRequired
}

export default TableFormField
