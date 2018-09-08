import {path} from 'ramda'
import {ApolloClient, createNetworkInterface} from 'react-apollo'
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws'
import {isSupportedStorageType, getAccessTokenFromStorage, formatBaseUri} from './helpers'

export default ({
  baseUrl = 'localhost',
  storageType = 'local',
  useSubscriptions = true,
  apolloClientProps = {}
} = {}) => {
  if (apolloClientProps.networkInterface) {
    return new ApolloClient(apolloClientProps)
  }

  const uri = `${formatBaseUri(baseUrl)}/graphql`
  const networkInterface = createNetworkInterface({uri})

  if (isSupportedStorageType(storageType)) {
    networkInterface.use([{
      applyMiddleware(req, next) {
        if (!path(['options', 'headers'], req)) {
          req.options.headers = {}
        }
        req.options.headers.Authorization = `Bearer ${getAccessTokenFromStorage(storageType)}`
        next()
      }
    }])
  }

  if (useSubscriptions) {
    const wsClient = new SubscriptionClient(
      `ws://${uri.split('://')[1]}/subscriptions`,
      {reconnect: true}
    )
    return new ApolloClient({
      networkInterface: addGraphQLSubscriptions(networkInterface, wsClient),
      ...apolloClientProps
    })
  }

  return new ApolloClient({networkInterface, ...apolloClientProps})
}
