import {path, pickBy, complement, isEmpty, isNil} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import styled, {withTheme} from 'styled-components'
import uuid from 'uuid/v4'
import {Conditional} from './Conditional'
import {getThemeProp} from './helpers'

const isNotNil = complement(isNil)
const isNotEmpty = complement(isEmpty)
const Svg = styled.svg`display: block;`

const SimpleSvgIcon = props => {
    const {icon, width, height, viewBox, fill, ...svgProps} = props
    const parsedIcon = getThemeProp(['icons', icon])(props)
    const {paths, transform, ...iconProps} = parsedIcon || {paths: []}
    
    return (
        <Conditional condition={isNotNil(paths) && isNotEmpty(paths)}>
            <Svg
              width={width || iconProps.width}
              height={height || iconProps.height}
              {...pickBy(isNotNil, {
                  viewBox: viewBox || iconProps.viewBox
              })}
              {...svgProps}
            >
                <g
                  {...pickBy(isNotNil, {
                      transform,
                      fill: props.fill
                            || iconProps.fill
                            || getThemeProp(['colors', 'primary', 'default'], 'crimson')(props)
                  })}
                >
                    {paths.map(d => <path key={uuid()} d={d} />)}
                </g>
            </Svg>
        </Conditional>
    )
}

SimpleSvgIcon.propTypes = {
    fill: PropTypes.string,
    viewBox: PropTypes.string,
    icon: PropTypes.string.isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    theme: PropTypes.shape({
        icons: PropTypes.shape({
            paths: PropTypes.arrayOf(PropTypes.string),
            transform: PropTypes.string,
            height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            viewBox: PropTypes.string
        })
    })
}

SimpleSvgIcon.defaultProps = {
    icon: ''
}

export default withTheme(SimpleSvgIcon)
