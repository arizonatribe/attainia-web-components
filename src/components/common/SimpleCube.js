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
 * @param {Object} props An object containing width, depth, height,
 * as well as an optional maxSideLength value. That value serves as a threshold limit
 * which the width, depth and height cannot exceed (and if they do, this limit
 * will be used to calculate an aspect ratio to scale the dimensions). Also
 * contains a styles object containing configuration options for colors
 * (baseColor, topColor, fontColor) and fontSizeAndFace (formatted as 'fontsize fontfamily')
 * @returns {undefined}
 */
function cubeMe(ctx, {maxSideLength, styles, ...dimensions}) {
    const {width, height, depth} = parseDimensions(maxSideLength, dimensions)
    const {baseColor, topColor, sideColor, fontColor, fontSizeAndFace} = styles

    const x = 10 + ((dimensions.depth.toString().length - 1) * 6) // this helps position the cube in cases where depth labels are too many characters and draw outside of the canvas
    const y = 0
    const DEPTH_SCALING = depth * 0.5
    const DEPTH_MIDPOINT = Math.sqrt((DEPTH_SCALING ** 2) * 0.5) * 0.5

    ctx.canvas.width = width + DEPTH_SCALING + 60
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
        dimensions.depth.toLocaleString('en-US', numFormatOpts),
        x + (DEPTH_MIDPOINT - min(25, DEPTH_SCALING + 5)),
        y + height + DEPTH_MIDPOINT + min(25, DEPTH_SCALING + 5)
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
        dimensions.width.toLocaleString('en-US', numFormatOpts),
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
        dimensions.height.toLocaleString('en-US', numFormatOpts),
        x + width + DEPTH_SCALING + min(8, height + 5),
        y + DEPTH_SCALING + (height * 0.5)
    )
}

function updateCubeConfiguration(props) {
    const {maxSideLength, depth, height, width, styles} = props
    const shadingOffset = validateShadingOffset(props.shadingOffset)

    const baseColor = styles.baseColor || getPrimaryColor(props)
    const topColor = color(baseColor).lighten(shadingOffset).hex()
    const sideColor = color(baseColor).darken(shadingOffset).hex()
    const fontColor = styles.fontColor || getFontColor(props)
    const fontSizeAndFace = styles.fontSizeAndFace || getFontSizeAndFace(props)

    return {
        depth,
        width,
        height,
        maxSideLength,
        styles: {
            topColor,
            sideColor,
            baseColor,
            fontColor,
            fontSizeAndFace
        }
    }
}

class SimpleCube extends PureComponent {
    componentDidMount() {
        const ctx = this.canvas.getContext('2d')
        cubeMe(ctx, updateCubeConfiguration(this.props))
    }
    componentWillUpdate(nextProps) {
        const ctx = this.canvas.getContext('2d')
        cubeMe(ctx, updateCubeConfiguration(nextProps))
    }
    render() {
        return <canvas ref={(c) => { this.canvas = c }} />
    }
}

SimpleCube.propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    depth: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    maxSideLength: PropTypes.number,
    shadingOffset: PropTypes.number,
    styles: PropTypes.shape({
        baseColor: PropTypes.string,
        fontColor: PropTypes.string,
        fontSizeAndFace: PropTypes.string
    })
}

SimpleCube.defaultProps = {
    depth: 100,
    height: 100,
    width: 100,
    maxSideLength: 100,
    shadingOffset: 0.3,
    styles: {
        fontColor: 'darkslategray',
        fontSizeAndFace: '11px Roboto'
    }
}

export default withTheme(SimpleCube)
