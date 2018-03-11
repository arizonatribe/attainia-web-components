import React from 'react'
import PropTypes from 'prop-types'
import GraphiQL from 'graphiql'
import 'graphiql/graphiql.css'

const QueryEditor = ({fetcher}) =>
    <GraphiQL fetcher={fetcher} />

QueryEditor.propTypes = {
    fetcher: PropTypes.func.isRequired
}

export default QueryEditor
