import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {graphql} from 'react-apollo'

import RegistrationConfirmation from './RegistrationConfirmation'
import {CONFIRM_USER_REGISTRATION} from './mutations'
import ducks from './ducks'

const {validators, creators: {handleError, register}} = ducks

const FormedRegistration = reduxForm({
    validate: validators.userRegistrationConfirmation,
    fields: ['password', 'confirm'],
    form: 'ConfirmUserRegistrationForm'
})(RegistrationConfirmation)

const RegistrationWithData = graphql(CONFIRM_USER_REGISTRATION, {
    props: ({ownProps, mutate}) => ({
        async tryConfirmRegistration(user) {
            try {
                const {data: {error, confirmUserRegistration}} = await mutate({variables: user})
                if (error) {
                    throw new Error(error)
                }
                if (confirmUserRegistration) ownProps.confirmRegistration(user)
            } catch (err) {
                ownProps.handleError(err)
            }
        }
    })
})(FormedRegistration)

export default connect(null, {handleError, register})(RegistrationWithData)
