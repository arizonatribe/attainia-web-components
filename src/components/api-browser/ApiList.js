import React from 'react'
import color from 'color'
import uuid from 'uuid/v4'
import {pathOr} from 'ramda'
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
    grid-template-columns: auto 1fr;
    grid-column-gap: 1em;
    grid-row-gap: 0.8em;
    grid-template-areas:
        "avatar        name name"
        "avatar        .    ."
        "url           url  ui-button"
        "description   description description";
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
    font-size: 1.1em;
    color: ${color(pathOr('gray', ['theme', 'fonts', 'fontColor'])).lighten(0.1).hex()};
`
const UiAvatar = styled.img`
    display: block;
    border-radius: 50%;
    border: 1px solid transparent;
    height: 20px;
    width: 20px;
    &:hover {
        border: 1px solid ${pathOr('lightgray', ['theme', 'colors', 'grayscale', 'lt'])};
    }
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

const ApiList = ({apis}) =>
    <ListWrapper>
        {apis.map(({name, uiUrl, uiSrc, avatarSrc, description, url}) =>
            <ApiCard key={uuid()}>
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
                <Avatar src={avatarSrc} />
                <ApiName>{name}</ApiName>
                <ApiUrl href={url}>{url}</ApiUrl>
                <ApiDescription>{description}</ApiDescription>
            </ApiCard>
        )}
    </ListWrapper>

ApiList.propTypes = {
    apis: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        uiUrl: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        uiSrc: PropTypes.string,
        avatarSrc: PropTypes.string
    }))
}

ApiList.defaultProps = {
    apis: []
}

export default ApiList
