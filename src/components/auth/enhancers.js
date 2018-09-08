import {compose} from 'ramda'
import {
  withTokenRefresh,
  withTokenInfo,
  withTokenValidation,
  withTokenParsing,
  withJwtDecode,
  untilAuthenticatedAndThenRedirectBack
} from './decorators'

export const withLoginEnhancers = compose(
  withTokenRefresh,
  withTokenInfo,
  withJwtDecode,
  withTokenValidation,
  withTokenParsing,
  untilAuthenticatedAndThenRedirectBack
)

export const withTokenHelpers = compose(
  withTokenRefresh,
  withJwtDecode,
  withTokenInfo,
  withTokenValidation,
  withTokenParsing
)
