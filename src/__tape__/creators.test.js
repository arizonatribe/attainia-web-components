import tape from 'tape'
import duck from '../components/auth/ducks'

tape('Action creators for Auth duck', t => {
  const { creators, types } = duck

  t.deepEqual(creators.handleError('some error'), {error: 'some error', type: types.ERROR})
  t.deepEqual(creators.clearError(), {type: types.CLEAR_ERROR})

  // eslint-disable-next-line max-len
  const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  t.deepEqual(creators.decodedJwt(jwt), {jwt, type: types.DECODED_JWT})

  t.deepEqual(creators.refresh('something'), {refreshTimeout: 'something', type: types.REFRESH})
  t.deepEqual(creators.clearRefresh(), {type: types.CLEAR_REFRESH})

  t.deepEqual(creators.logout(), {type: types.LOGOUT})
  t.deepEqual(creators.toggleRememberMe(true), {rememberMe: true, type: types.REMEMBER_ME})

  const user = { name: 'John Doe', sub: '1234567890', iat: 1516239022 }
  t.deepEqual(creators.login(user), {user, type: types.LOGIN})
  t.deepEqual(creators.userInfoFromToken(user), {user, type: types.USER_INFO_FROM_TOKEN})

  const token = 'd20hgsa2Af01vbls023'
  t.deepEqual(creators.updatedToken(token), {token, type: types.UPDATED_TOKEN})
  t.deepEqual(creators.parsedToken(token), {token, type: types.PARSED_TOKEN})
  t.deepEqual(creators.validatedToken(token), {token, type: types.VALIDATED_TOKEN})

  t.deepEqual(creators.startedLoading(), {type: types.LOADING_STARTED})
  t.deepEqual(creators.finishedLoading(), {type: types.LOADING_FINISHED})

  t.end()
})
