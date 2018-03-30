import React from 'react'
import PropTypes from 'prop-types'
import {Button, ButtonLink} from '../common'

const Logout = ({className, tryLogout, asLink}) => (
    asLink ? <ButtonLink className={className} onClick={tryLogout}>Logout</ButtonLink>
        : <Button className={className} onClick={tryLogout} type="button">Logout</Button>
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
