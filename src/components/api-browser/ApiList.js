import React, {PureComponent} from 'react'
import color from 'color'
import uuid from 'uuid/v4'
import {pathOr, is} from 'ramda'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'react-router-dom/Link'
import Button from '../common/Button'

const ListWrapper = styled.section`
    display: grid;
    padding: 1em;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1.5em;
    grid-row-gap: 2.5em;
    color: ${pathOr('darkgray', ['theme', 'fonts', 'fontColor'])};
    font-family: ${pathOr('Roboto, Helvetica, Arial', ['theme', 'fonts', 'fontFamily'])};
`
const ApiCard = styled.div`
    display: grid;
    padding: 1.5em;
    align-items: center;
    background: ${pathOr('white', ['theme', 'colors', 'grayscale', 'white'])};
    border: 1px solid ${pathOr('gray', ['theme', 'colors', 'grayscale', 'md'])};
    grid-template-columns: auto auto 1fr;
    grid-column-gap: 0.6em;
    grid-row-gap: 0.8em;
    grid-template-areas:
        "avatar avatar        name name"
        "avatar avatar        .    ."
        "${props => (props.healthcheck ? 'status' : 'url')} url url ui-button"
        "description description   description description";
    & a.ui-link {
        display: block;
        grid-area: ui-button;
    }
    & button.ui-button {
        border-radius: 50%;
        padding: 0.5em;
    }
`
const ApiName = styled.h2`
    grid-area: name;
    font-size: 2em;
    font-weight: bold;
`
const ApiDescription = styled.p`
    display: block;
    grid-area: description;
    font-style: italic;
    font-size: ${pathOr('14px', ['theme', 'fonts', 'fontSize'])};
`
const ApiUrl = styled.a`
    display: block;
    grid-area: url;
    font-size: 0.9em;
    color: ${color(pathOr('gray', ['theme', 'fonts', 'fontColor'])).lighten(0.1).hex()};
`
const ApiHealth = styled.p`
    display: block;
    text-align: center;
    cursor: pointer;
    grid-area: status;
    padding: 0.2em;
    width: 1.2em;
    height: 1.2em;
    font-size: 0.8em;
    border-radius: 50%;
    background: ${props => (props.status ? 'forestgreen' : 'red')};
    border: 1px solid ${pathOr('lightgray', ['theme', 'colors', 'grayscale', 'lt'])};
    &:before {
        content: "\\${props => (props.status ? '2713' : '2717')}";
        color: white;
    }
`
const UiAvatar = styled.img`
    display: block;
    border: 1px solid transparent;
    height: 18px;
    width: 18px;
`
const Avatar = styled.img`
    display: block;
    grid-area: avatar;
    position: relative;
    border-radius: 50%;
    border: 2px solid ${pathOr('white', ['theme', 'colors', 'grayscale', 'white'])};
    box-shadow: 2px 2px 4px ${pathOr('lightgray', ['theme', 'colors', 'grayscale', 'lt'])};
    font-family: ${pathOr('Roboto, Helvetica, Arial', ['theme', 'fonts', 'fontFamily'])};
    height: 70px;
    width: 70px;

    &::after {
        content: "";
        ${props => props.avatarSrc && `background: url(${props.avatarSrc}) no-repeat;`}
        background-size: 100%;
        max-height: 2.8em;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
    }
`
const apiHealthCheck = async (url) => {
    const response = await fetch(url)
    return response.status >= 200 && response.status < 300
}

class ApiList extends PureComponent {
    state = {}
    componentWillMount() {
        const {apis = []} = this.props
        apis.filter(a => a.url && a.healthcheck)
            .forEach(({url, healthcheck}) => this.checkHealth(url, healthcheck))
    }
    checkHealth = (url, healthcheck) => {
        apiHealthCheck(is(String, healthcheck) ? healthcheck : url)
            .then(up => this.setState({[url]: up}))
    }
    render() {
        const {apis} = this.props
        return (
            <ListWrapper>
                {apis.map(({name, healthcheck, uiUrl, uiSrc, avatarSrc, description, url}) =>
                    <ApiCard key={uuid()} healthcheck={healthcheck}>
                        {uiUrl && uiSrc &&
                            <Link className="ui-link" to={uiUrl}>
                                <UiAvatar src={uiSrc} />
                            </Link>
                        }
                        {uiUrl && !uiSrc &&
                            <Link className="ui-link" to={uiUrl}>
                                <Button className="ui-button" type="button">UI</Button>
                            </Link>
                        }
                        {healthcheck &&
                            <ApiHealth onClick={() => this.checkHealth(url, healthcheck)} status={this.state[url]} />
                        }
                        <Avatar src={avatarSrc} />
                        <ApiName>{name}</ApiName>
                        <ApiUrl href={url}>{url}</ApiUrl>
                        <ApiDescription>{description}</ApiDescription>
                    </ApiCard>
                )}
            </ListWrapper>
        )
    }
}

ApiList.propTypes = {
    apis: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        uiUrl: PropTypes.string,
        name: PropTypes.string,
        healthcheck: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        description: PropTypes.string,
        uiSrc: PropTypes.string,
        avatarSrc: PropTypes.string
    }))
}

ApiList.defaultProps = {
    apis: []
}

export default ApiList
