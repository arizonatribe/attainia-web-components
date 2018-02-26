import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {graphql} from 'react-apollo'

import Registration from './Registration'
import {REGISTER_USER} from './mutations'
import ducks from './ducks'

const {validators, creators: {handleError, register}} = ducks

const FormedRegistration = reduxForm({
    validate: validators.userRegistration,
    fields: ['email', 'name'],
    form: 'RegistrationForm'
})(Registration)

const RegistrationWithData = graphql(REGISTER_USER, {
    props: ({ownProps, mutate}) => ({
        async tryRegister(user) {
            try {
                const {data: {error, registerUser}} = await mutate({variables: user})
                if (error) {
                    throw new Error(error)
                }
                if (registerUser) ownProps.register(user)
            } catch (err) {
                ownProps.handleError(err)
            }
        }
    })
})(FormedRegistration)

export default connect(null, {handleError, register})(RegistrationWithData)
