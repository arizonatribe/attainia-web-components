import React from 'react'
import QueryEditor from '../components/api-browser/QueryEditor'
import {apolloFetch} from '../store'

const DemoQueryEditor = props =>
    <QueryEditor {...props} fetcher={apolloFetch} />

export default DemoQueryEditor

