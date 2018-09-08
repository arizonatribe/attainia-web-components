import React from 'react'
import {compose} from 'ramda'
import BasicFormField from 'formatta/BasicFormField'
import PropTypes from 'prop-types'
import TableFieldWrapperHoC from './TableFieldWrapperHoC'
import TableFieldWithState from './TableFieldWithState'

const FormFieldWrapperWithState = compose(
  TableFieldWithState,
  TableFieldWrapperHoC
)(BasicFormField)

BasicFormField.displayName = 'BasicFormField'

FormFieldWrapperWithState.displayName = 'FormFieldWrapperWithState'

const TableFormField = props => <FormFieldWrapperWithState {...props} />

TableFormField.propTypes = {
  name: PropTypes.string.isRequired
}

export default TableFormField
