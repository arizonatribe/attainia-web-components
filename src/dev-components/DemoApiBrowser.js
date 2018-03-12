import React from 'react'
import ApiBrowser from '../components/api-browser/ApiBrowser'
import {apolloFetch} from '../store'

const DemoApiBrowser = props =>
    <ApiBrowser {...props} graphQlFetcher={apolloFetch} />

export default DemoApiBrowser
