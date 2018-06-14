import React from 'react'
import PropTypes from 'prop-types'
import ApiList from '../components/api-browser/ApiList'

const DemoApiBrowser = ({apis}) =>
    <ApiList apis={apis} />

DemoApiBrowser.propTypes = {
    apis: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string,
        healthcheck: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        description: PropTypes.string,
        avatarSrc: PropTypes.string
    }))
}

export default DemoApiBrowser
