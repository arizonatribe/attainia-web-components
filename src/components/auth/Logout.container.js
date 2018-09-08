import {graphql} from 'react-apollo'
import {connect} from 'react-redux'

import Logout from './Logout'
import {LOGOUT_USER} from './mutations'
import {removeToken, getAccessTokenFromStorage} from './helpers'
import ducks from './ducks'

const {selectors, creators: {logout, handleError}} = ducks
const mapStoreToProps = state => ({token: selectors.token(state)})
const mapDispatchToProps = {handleError, logout}

const LogoutWithData = graphql(LOGOUT_USER, {
  props: ({mutate, ownProps}) => ({
    async tryLogout() {
      try {
        const token = ownProps.token || getAccessTokenFromStorage()
        if (token) {
          await mutate({variables: {token}})
        }
      } catch (err) {
        ownProps.handleError(err)
      }
      removeToken()
      ownProps.logout()
    }
  })
})(Logout)

export default connect(mapStoreToProps, mapDispatchToProps)(LogoutWithData)
