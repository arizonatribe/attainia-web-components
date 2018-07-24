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
    const {paths, rects, circles, transform, ...iconProps} = parsedIcon
    const id = props.id || icon
    
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
                    {paths.map((d, i) =>
                        <path
                          key={uuid()}
                          d={d}
                          id={`id-${i}:${id}`}
                        />)}
                    {rects ?
                        rects.map((rect, i) =>
                            <rect
                              key={uuid()}
                              id={`id-${i}:${id}`}
                              x={rect.x}
                              y={rect.y}
                              width={rect.width}
                              height={rect.height}
                            />) :
                        null
                    }
                    {circles ?
                        circles.map((circle, i) =>
                            <circle
                              key={uuid()}
                              id={`id-${i}:${id}`}
                              cx={circle.cx}
                              cy={circle.cy}
                              r={circle.r}
                            />) :
                        null
                    }
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
            rects: PropTypes.arrayOf(PropTypes.shape({
                x: PropTypes.number,
                y: PropTypes.number,
                width: PropTypes.number,
                height: PropTypes.number
            })),
            circles: PropTypes.arrayOf(PropTypes.shape({
                cx: PropTypes.number,
                cy: PropTypes.number,
                r: PropTypes.number
            })),
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
