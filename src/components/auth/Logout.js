import React from 'react'
import PropTypes from 'prop-types'
import {Button, ButtonLink} from '../common'

const Logout = ({className, tryLogout, asLink, ...restOfProps}) => (
  asLink ? <ButtonLink className={className} onClick={tryLogout} {...restOfProps}>Logout</ButtonLink>
    : <Button className={className} onClick={tryLogout} type="button" {...restOfProps}>Logout</Button>
)

Logout.propTypes = {
  tryLogout: PropTypes.func.isRequired,
  asLink: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired
}

Logout.defaultProps = {
  asLink: false,
  className: 'btn-logout'
}

export default Logout
