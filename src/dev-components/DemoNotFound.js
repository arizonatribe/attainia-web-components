import React from 'react'
import PropTypes from 'prop-types'

import NotFoundPage from '../components/layout/NotFoundPage'

const DemoNotFound = ({imgSrc}) =>
  <NotFoundPage imgSrc={imgSrc} />

DemoNotFound.propTypes = {
  imgSrc: PropTypes.string
}

export default DemoNotFound
