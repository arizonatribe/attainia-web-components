import React from 'react'
import uuid from 'uuid/v4'
import PropTypes from 'prop-types'
import {isStringieThingie} from 'attasist'
import styled, {withTheme} from 'styled-components'
import {any, both, is, isNil, pathOr, reject} from 'ramda'
import {Conditional} from './Conditional'

const Svg = styled.svg`display: block;`

const SimpleSvgIcon = props => {
    const {icon, className, width, height, viewBox, fill, ...svgProps} = props
    const parsedIcon = pathOr({paths: []}, ['theme', 'icons', icon], props)
    const {paths, transform, ...iconProps} = parsedIcon
    const id = props.id || uuid()
    
    return (
        <Conditional condition={both(is(Array), any(isStringieThingie))(paths)}>
            <Svg
              id={`svg:${id}`}
              className={className}
              width={width || iconProps.width}
              height={height || iconProps.height}
              {...reject(isNil, {viewBox: viewBox || iconProps.viewBox})}
              {...svgProps}
            >
                <g
                  id={`g:${id}`}
                  {...reject(isNil, {
                      transform,
                      fill: props.fill
                            || iconProps.fill
                            || pathOr('crimson', ['colors', 'primary', 'default'])(props)
                  })}
                >
                    {paths.map((d, i) => <path key={uuid()} d={d} id={`id-${i}:${id}`} />)}
                </g>
            </Svg>
        </Conditional>
    )
}

SimpleSvgIcon.propTypes = {
    fill: PropTypes.string,
    viewBox: PropTypes.string,
    className: PropTypes.string,
    icon: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
    className: 'simple-svg-icon',
    icon: ''
}

export default withTheme(SimpleSvgIcon)
