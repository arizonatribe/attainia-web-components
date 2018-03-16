import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {graphql} from 'react-apollo'

import RegisterApplication from './RegisterApplication'
import {REGISTER_APP} from './mutations'
import ducks from './ducks'

const {validators, creators: {registerApp}} = ducks

const FormedApplication = reduxForm({
    validate: validators.applicationRegistration,
    fields: ['name', 'redirect'],
    form: 'ApplicationRegistrationForm'
})(RegisterApplication)

const RegisterApplicationWithData = graphql(REGISTER_APP, {
    props: ({mutate, ownProps}) => ({
        async tryRegisterApp(app) {
            const success = await mutate({variables: app})
            if (success) ownProps.registerApp(app)
        }
    })
})(FormedApplication)

export default connect(null, {registerApp})(RegisterApplicationWithData)
