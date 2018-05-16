import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled, {withTheme} from 'styled-components'
import {always, both, cond, prop, pathOr, T} from 'ramda'
import Chevron from './Chevron'
import SimpleSvgIcon from '../common/SimpleSvgIcon'

const DrawerStyle = styled.section`
    display: grid;
    grid-template-areas: "drawer-header" "drawer-content";
    background-color: ${pathOr('transparent', ['backgroundColor'])};
    ${props => !props.isExpanded && 'max-height: 4em;'}
    & > *:not(:first-child) {
        ${props => (!props.isExpanded && 'transform: scale(1,0);')}
        transition: transform 0.05s ease;
    }
`
const ContentWrapper = styled.section`
    display: grid;
    grid-area: drawer-content;
    padding: ${pathOr('0', ['padding'])};
    background-color: ${pathOr('transparent', ['backgroundColor'])};
    ${props => !props.isExpanded && 'display: none;'}
    & > * {
        border-left: ${pathOr('1px solid transparent', ['border'])};
        border-right: ${pathOr('1px solid transparent', ['border'])};
        border-bottom: ${pathOr('1px solid transparent', ['border'])};
    }
`
const Label = styled.span`
    display: block;
    grid-area: dh-title;
`
const DrawerHeader = styled.header`
    display: grid;
    box-sizing: border-box;
    grid-area: drawer-header;
    grid-column-gap: ${pathOr('8px', ['columnGap'])};
    grid-template-columns: auto 1fr ${props => both(prop('showCaret'), prop('hasIcon'))(props) && 'auto 16px'};
    ${cond([
        [both(prop('showCaret'), prop('hasIcon')), always('grid-template-areas: "dh-icon dh-title chevron .";')],
        [prop('showCaret'), always('grid-template-areas: "chevron dh-title";')],
        [prop('hasIcon'), always('grid-template-areas: "dh-icon dh-title";')],
        [T, always('grid-template-areas: "chevron dh-title";')]
    ])}
    cursor: pointer;
    align-items: center;
    padding: ${pathOr('.7em 1em', ['padding'])};
    font-size: ${pathOr('1.4em', ['fontSize'])};
    font-weight: ${pathOr('bold', ['fontWeight'])};
    color: ${props => (
        prop('color')(props) ||
        pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(props)
    )};
    background-color: ${props => (
        prop('backgroundColor')(props) ||
        pathOr('silver', ['theme', 'colors', 'misc', 'gray', 'ashGray'])(props)
    )};
    & .left-icon {
        grid-area: dh-icon;
        & g {
            fill: ${props => prop('color')(props) || pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(props)};
        }
    }
`

class Drawer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: !!props.isExpanded
        }
    }
    toggleDrawer = () => this.setState({isExpanded: !this.state.isExpanded})
    render() {
        const {className, iconName, showCaret, title, children, contentStyles, styles, ...restOfProps} = this.props
        return (
            <DrawerStyle
              {...restOfProps}
              className={className}
              backgroundColor={contentStyles.backgroundColor}
              isExpanded={this.state.isExpanded}
            >
                <DrawerHeader
                  onClick={this.toggleDrawer}
                  showCaret={showCaret}
                  hasIcon={!!iconName}
                  {...styles}
                >
                    {iconName && <SimpleSvgIcon className="left-icon" icon={iconName} width={20} height={20} />}
                    {showCaret && <Chevron isOpen={this.state.isExpanded} />}
                    {title && <Label>{title}</Label>}
                </DrawerHeader>
                <ContentWrapper isExpanded={this.state.isExpanded} {...contentStyles}>{children}</ContentWrapper>
            </DrawerStyle>
        )
    }
}

Drawer.propTypes = {
    className: PropTypes.string,
    isExpanded: PropTypes.bool.isRequired,
    iconName: PropTypes.string,
    showCaret: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    styles: PropTypes.shape({
        columnGap: PropTypes.string,
        fontSize: PropTypes.string,
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
        padding: PropTypes.string
    }),
    contentStyles: PropTypes.shape({
        backgroundColor: PropTypes.string,
        padding: PropTypes.string,
        border: PropTypes.string
    })
}

Drawer.defaultProps = {
    className: 'drawer',
    isExpanded: true,
    showCaret: true,
    contentStyles: {},
    styles: {}
}

export default withTheme(Drawer)
