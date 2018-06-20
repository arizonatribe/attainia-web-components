/* eslint "max-len": "off" */
import React from 'react'
import {pathOr} from 'ramda'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'
import styled, {withTheme} from 'styled-components'

const Svg = styled.svg`
    transition: all 0.3s ease;
    transform: scale(${props => props.logoScale});
`
const TwoColorSvgIcon = ({
    width, height, scale, primaryColor, secondaryColor, primaryPaths, secondaryPaths,
    ...restProps
}) =>
    <Svg logoScale={scale} width={width} height={height} {...restProps}>
        <g>
            {primaryPaths.map(d =>
                <path
                  key={uuid()}
                  fill={primaryColor || pathOr('crimson', ['theme', 'colors', 'primary', 'default'])(restProps)}
                  d={d}
                />
            )}
            {secondaryPaths.map(d =>
                <path
                  key={uuid()}
                  fill={secondaryColor || pathOr('transparent', ['theme', 'colors', 'secondary', 'default'])(restProps)}
                  d={d}
                />
            )}
        </g>
    </Svg>

TwoColorSvgIcon.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    scale: PropTypes.number.isRequired,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    primaryPaths: PropTypes.arrayOf(PropTypes.string),
    secondaryPaths: PropTypes.arrayOf(PropTypes.string)
}

TwoColorSvgIcon.defaultProps = {
    width: 144,
    height: 144,
    scale: 1,
    primaryPaths: [
        'M103.3,60.2c5.8-0.5,10.7-2.1,14.6-4.7V75c0,4.1-1,7.6-3,10.4c-2,2.8-4.5,5.1-7.4,7 c-3,1.8-6.1,3.1-9.5,3.9c-3.4,0.8-6.5,1.1-9.4,1.1c-2.3,0-4.8-0.2-7.7-0.7c-2.8-0.5-5.4-1.3-7.8-2.4c-2.4-1.1-4.4-2.7-6.1-4.7 c-1.7-2-2.5-4.4-2.5-7.3c0-3.3,0.6-6.2,1.7-8.6c1.1-2.4,2.7-4.3,4.7-5.7c2-1.4,4.3-2.6,6.9-3.4c2.6-0.8,5.3-1.5,8-1.9 C91.7,61.6,97.5,60.8,103.3,60.2z M140.1,117.9c-5.3,0-9.8-1.1-13.3-3.2c-3.5-2.1-5.8-5.9-6.9-11.2c-5.2,5-11.5,8.7-19.1,11 c-7.5,2.3-14.8,3.4-21.8,3.4c-5.3,0-10.4-0.7-15.3-2.2c-4.9-1.4-9.2-3.6-12.9-6.4c-3.7-2.8-6.7-6.4-8.9-10.7 c-2.2-4.3-3.3-9.4-3.3-15.2c0-7.3,1.3-13.3,4-17.8c2.7-4.6,6.2-8.1,10.5-10.7c4.3-2.6,9.2-4.5,14.6-5.6c5.4-1.1,10.9-2,16.3-2.6 c4.7-0.9,9.2-1.6,13.5-1.9c4.3-0.4,8-1,11.3-1.9c3.3-0.9,5.9-2.3,7.8-4.2c1.9-1.9,2.9-4.8,2.9-8.6c0-3.3-0.8-6.1-2.4-8.2 c-1.6-2.1-3.6-3.8-5.9-4.9c-2.4-1.1-5-1.9-7.9-2.3c-2.9-0.4-5.6-0.6-8.2-0.6c-7.3,0-13.3,1.5-18.1,4.6c-4.7,3-7.4,7.8-8,14.2H43 c0.5-7.6,2.3-13.9,5.5-19s7.3-9.1,12.2-12.1C61.6,1,62.6,0.5,63.5,0H0v144h144v-26.3C142.5,117.9,141.2,117.9,140.1,117.9z'
    ],
    secondaryPaths: [
        'M63.5,0c-1,0.5-1.9,1-2.9,1.6c-5,3.1-9,7.1-12.2,12.1s-5,11.4-5.5,19H69c0.6-6.4,3.3-11.1,8-14.2 c4.7-3,10.7-4.6,18.1-4.6c2.6,0,5.3,0.2,8.2,0.6c2.9,0.4,5.5,1.1,7.9,2.3c2.4,1.1,4.3,2.8,5.9,4.9c1.6,2.1,2.4,4.9,2.4,8.2 c0,3.8-1,6.7-2.9,8.6c-1.9,1.9-4.5,3.3-7.8,4.2c-3.3,0.9-7.1,1.6-11.3,1.9c-4.3,0.4-8.8,1-13.5,1.9c-5.5,0.6-10.9,1.5-16.3,2.6 c-5.4,1.1-10.3,3-14.6,5.6c-4.3,2.6-7.8,6.2-10.5,10.7c-2.7,4.6-4,10.5-4,17.8c0,5.8,1.1,10.9,3.3,15.2c2.2,4.3,5.2,7.9,8.9,10.7 c3.7,2.8,8,5,12.9,6.4c4.9,1.4,10,2.2,15.3,2.2c7,0,14.3-1.1,21.8-3.4c7.5-2.3,13.9-5.9,19.1-11c1.1,5.3,3.3,9.1,6.9,11.2 c3.5,2.1,7.9,3.2,13.3,3.2c1.1,0,2.4-0.1,3.9-0.2V0H63.5z M117.9,75c0,4.1-1,7.6-3,10.4c-2,2.8-4.5,5.1-7.4,7 c-3,1.8-6.1,3.1-9.5,3.9c-3.4,0.8-6.5,1.1-9.4,1.1c-2.3,0-4.8-0.2-7.7-0.7c-2.8-0.5-5.4-1.3-7.8-2.4c-2.4-1.1-4.4-2.7-6.1-4.7 c-1.7-2-2.5-4.4-2.5-7.3c0-3.3,0.6-6.2,1.7-8.6c1.1-2.4,2.7-4.3,4.7-5.7c2-1.4,4.3-2.6,6.9-3.4c2.6-0.8,5.3-1.5,8-1.9 c5.8-1.1,11.6-1.9,17.4-2.4c5.8-0.5,10.7-2.1,14.6-4.7V75z'
    ]
}

export default withTheme(TwoColorSvgIcon)
