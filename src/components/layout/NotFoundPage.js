import React, {createContext, Component} from 'react'
import PropTypes from 'prop-types'
import {withTheme} from 'styled-components'
import {__, always, cond, gte, lte, path, pathOr} from 'ramda'

import NotFound from './NotFound'
import HeaderImage from './HeaderImage'
import ContentWrapper from './ContentWrapper'
import ContentCentered from './ContentCentered'
import TwoColorSvgIcon from '../common/TwoColorSvgIcon'

const NotFoundLogoContext = createContext('scale')

const calculateDirection =
    cond([
        [gte(__, 1.05), always('down')],
        [lte(__, 0.95), always('up')]
    ])

export const ScaledLogo = (props) =>
    <NotFoundLogoContext.Consumer>
        {scale =>
            <TwoColorSvgIcon
              scale={scale}
              primaryPaths={[path(['theme', 'icons', 'secondary', 'paths', 0])(props)]}
              secondaryPaths={[path(['theme', 'icons', 'secondary', 'paths', 1])(props)]}
              primaryColor={pathOr('crimson', ['theme', 'colors', 'primary', 'default'])(props)}
              secondaryColor={pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(props)}
            />
        }
    </NotFoundLogoContext.Consumer>

class NotFoundPage extends Component {
    state = {
        scale: 1,
        scaleDirection: 'up'
    }
    pulse = () => {
        const {scale} = this.state
        const scaleDirection = calculateDirection(scale) || this.state.scaleDirection
        this.setState({
            scaleDirection,
            scale: scaleDirection === 'up' ? scale + 0.005 : scale - 0.005
        })
    }
    render() {
        const {scale} = this.state
        const {fontSize, message, imgSrc, imgHeaderHeight, ...restOfProps} = this.props
        return (
            <NotFoundLogoContext.Provider value={scale}>
                <ContentWrapper onMouseMove={this.pulse}>
                    {imgSrc && <HeaderImage backgroundImage={imgSrc} height={imgHeaderHeight} />}
                    <ContentCentered>
                        <ScaledLogo {...restOfProps} />
                    </ContentCentered>
                    {message && <NotFound message={message} fontSize={fontSize} />}
                </ContentWrapper>
            </NotFoundLogoContext.Provider>
        )
    }
}

NotFoundPage.propTypes = {
    message: PropTypes.string,
    fontSize: PropTypes.string,
    imgSrc: PropTypes.string,
    imgHeaderHeight: PropTypes.string
}

NotFoundPage.defaultProps = {
    fontSize: '18px',
    message: 'this page is currently under construction'
}

export default withTheme(NotFoundPage)
