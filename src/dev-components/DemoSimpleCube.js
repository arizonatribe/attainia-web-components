import React, {createContext, Component} from 'react'
import styled from 'styled-components'
import {applySpec, compose, multiply} from 'ramda'

import SimpleCube from '../components/common/SimpleCube'

const Wrapper = styled.section`
    height: 100%;
    display: grid;
    cursor: pointer;
    justify-content: center;
    align-content: center;
`

const DimensionsContext = createContext('dimensions')

const randomBetweenOneAnd100 = compose(multiply(300), Math.random)
const randomizeDimensions = applySpec({
    depth: randomBetweenOneAnd100,
    height: randomBetweenOneAnd100,
    width: randomBetweenOneAnd100
})

const CubeWrapper = () =>
    <DimensionsContext.Consumer>
        {dimensions => <SimpleCube maxSideLength={300} {...dimensions} />}
    </DimensionsContext.Consumer>

class DemoCube extends Component {
    state = randomizeDimensions()
    randomize = () => { this.setState(randomizeDimensions) }
    render = () =>
        <DimensionsContext.Provider value={this.state}>
            <Wrapper onClick={this.randomize}>
                <CubeWrapper />
            </Wrapper>
        </DimensionsContext.Provider>
}

export default DemoCube
