import color from 'color'
import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import {withTheme} from 'styled-components'
import {
    __,
    always,
    converge,
    both,
    compose,
    filter,
    gte,
    is,
    join,
    lte,
    map,
    max,
    min,
    multiply,
    toPairs,
    pathOr,
    pipe,
    reduce,
    unless,
    values
} from 'ramda'

/* helpers */
const numFormatOpts = {maximumFractionDigits: 2, minimumFractionDigits: 0}
const getMaxSideLength = compose(reduce(max, 0), values, filter(is(Number)))
const validateShadingOffset = unless(both(gte(__, 0), lte(__, 1)), always(0.3))
const getPrimaryColor = pathOr('crimson', ['theme', 'colors', 'primary', 'default'])
const getFontColor = pathOr('darkslategray', ['theme', 'colors', 'grayscale', 'dk'])
const getFontSizeAndFace = converge(
    pipe(toPairs, join(' ')), [
        pathOr('12px', ['theme', 'fonts', 'fontSize']),
        pathOr('Roboto', ['theme', 'fonts', 'fontFamily'])
    ]
)
const parseDimensions = (maxSideLength = 0, dimensions) => (
    maxSideLength ? map(
        multiply(maxSideLength / getMaxSideLength(dimensions))
    )(dimensions) : dimensions
)

/**
 * Creates a 2-dimensional drawing of a cube with slightly different shades for
 * the top and side of the cube (to make it stand out).
 * Also appends width, height, and depth labels to the cube.
 * An optional value can be used to make sure the cube scales (as a ratio)
 * based on a threshold limit you provide.
 *
 * @func
 * @sig ({k: v}, Number, Number, {k: v}, {k: v}) -> undefined
 * @name cubeMe
 * @param {Object} ctx A context object (obtained via a canvas.getContext('2d') method call)
 * @param {Object} dimensions An object containing width, depth, height,
 * as well as an optional maxSideLength value. That value serves as a threshold limit
 * which the width, depth and height cannot exceed (and if they do, this limit
 * will be used to calculate an aspect ratio to scale the dimensions)
 * @param {Object} styles An object containing configuration options for colors
 * (baseColor, topColor, fontColor) and fontSizeAndFace
 * (formatted as 'fontsize fontfamily')
 * @returns {undefined}
 */
function cubeMe(ctx, {maxSideLength, ...restOfProps}, styles = {}) {
    const {width, height, depth} = parseDimensions(maxSideLength, restOfProps)
    const {baseColor, topColor, sideColor, fontColor, fontSizeAndFace} = styles

    const x = 10
    const y = 0
    const DEPTH_SCALING = depth * 0.5
    const DEPTH_MIDPOINT = Math.sqrt((DEPTH_SCALING ** 2) * 0.5) * 0.5

    ctx.canvas.width = width + DEPTH_SCALING + 50
    ctx.canvas.height = height + DEPTH_SCALING + 20

    // side
    ctx.fillStyle = sideColor
    ctx.beginPath()
    ctx.moveTo(x + DEPTH_SCALING, y + DEPTH_SCALING)
    ctx.lineTo(x + DEPTH_SCALING, y + height + DEPTH_SCALING)
    ctx.lineTo(x, y + height)
    ctx.lineTo(x, y)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = fontColor
    ctx.font = fontSizeAndFace
    ctx.fillText(
        restOfProps.depth.toLocaleString('en-US', numFormatOpts),
        x + (DEPTH_MIDPOINT - min(15, DEPTH_SCALING + 5)),
        y + height + DEPTH_MIDPOINT + min(15, DEPTH_SCALING + 5)
    )

    // center
    ctx.fillStyle = baseColor
    ctx.beginPath()
    ctx.moveTo(x + DEPTH_SCALING, y + DEPTH_SCALING)
    ctx.lineTo(x + width + DEPTH_SCALING, y + DEPTH_SCALING)
    ctx.lineTo(x + width + DEPTH_SCALING, y + height + DEPTH_SCALING)
    ctx.lineTo(x + DEPTH_SCALING, y + height + DEPTH_SCALING)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = fontColor
    ctx.fillText(
        restOfProps.width.toLocaleString('en-US', numFormatOpts),
        x + DEPTH_SCALING + (width * 0.4),
        y + DEPTH_SCALING + height + 15
    )

    // top
    ctx.fillStyle = topColor
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + width, y)
    ctx.lineTo(x + width + DEPTH_SCALING, y + DEPTH_SCALING)
    ctx.lineTo(x + DEPTH_SCALING, y + DEPTH_SCALING)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = fontColor
    ctx.fillText(
        restOfProps.height.toLocaleString('en-US', numFormatOpts),
        x + width + DEPTH_SCALING + min(8, height + 5),
        y + DEPTH_SCALING + (height * 0.5)
    )
}

class SimpleCube extends PureComponent {
    componentDidMount() {
        const {maxSideLength, dimensions, styles} = this.props
        const shadingOffset = validateShadingOffset(this.props.shadingOffset)
        const dimensionDefaults = {maxSideLength, width: 0, height: 0, depth: 0, ...dimensions}

        const baseColor = styles.baseColor || getPrimaryColor(this.props)
        const topColor = color(baseColor).lighten(shadingOffset).hex()
        const sideColor = color(baseColor).darken(shadingOffset).hex()
        const fontColor = styles.fontColor || getFontColor(this.props)
        const fontSizeAndFace = styles.fontSizeAndFace || getFontSizeAndFace(this.props)

        const ctx = this.canvas.getContext('2d')

        cubeMe(ctx, dimensionDefaults, {
            baseColor,
            topColor,
            sideColor,
            fontColor,
            fontSizeAndFace
        })
    }

    render() {
        return <canvas ref={(c) => { this.canvas = c }} />
    }
}

SimpleCube.propTypes = {
    dimensions: PropTypes.shape({
        depth: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number
    }),
    maxSideLength: PropTypes.number,
    shadingOffset: PropTypes.number,
    styles: PropTypes.shape({
        baseColor: PropTypes.string,
        fontColor: PropTypes.string,
        fontSizeAndFace: PropTypes.string
    })
}

SimpleCube.defaultProps = {
    dimensions: {
        depth: 100,
        height: 100,
        width: 100
    },
    maxSideLength: 100,
    shadingOffset: 0.3,
    styles: {
        fontColor: 'darkslategray',
        fontSizeAndFace: '11px Roboto'
    }
}

export default withTheme(SimpleCube)
