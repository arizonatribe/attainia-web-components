import React from 'react'
import {Field} from 'redux-form'
import PropTypes from 'prop-types'
import BasicFormField from 'formatta/BasicFormField'

const ReduxFormField = props =>
    <Field
      name={props.name}
      component={BasicFormField}
      {...props}
    />

ReduxFormField.propTypes = {
    name: PropTypes.string.isRequired
}

export default ReduxFormField
