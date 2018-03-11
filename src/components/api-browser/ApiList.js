import React from 'react'
import color from 'color'
import uuid from 'uuid/v4'
import {pathOr} from 'ramda'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ListWrapper = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 5em;
    grid-column-gap: 1.5em;
    grid-row-gap: 2.5em;
    justify-items: center;
    align-content: center;
    align-items: center;
    color: ${pathOr('darkgray', ['theme', 'fonts', 'fontColor'])};
    font-family: ${pathOr('Roboto, Helvetica, Arial', ['theme', 'fonts', 'fontFamily'])};
`
const ApiCard = styled.div`
    height: 5em;
    width: 7em;
    display: grid;
    padding: 1.5em;
    justify-content: center;
    align-content: center;
    background: ${pathOr('white', ['theme', 'colors', 'grayscale', 'white'])};
    border: 1px solid ${pathOr('darkgray', ['theme', 'colors', 'grayscale', 'dk'])};
    grid-template-columns: 3em 1fr;
    grid-template-rows: 2em;
    grid-auto-rows: 1.5em;
    grid-column-gap: 0.5em;
    grid-row-gap: 0.3em;
    grid-template-areas:
        "avatar       name"
        "avatar       url"
        "description  description";
`
const ApiName = styled.h2`
    grid-area: name;
    font-size: 2em;
    font-weight: bold;
`
const ApiDescription = styled.p`
    display: block;
    grid-area: desc;
    font-style: italic;
    font-size: ${pathOr('14px', ['theme', 'fonts', 'fontSize'])};
    color: ${color(pathOr('darkgray', ['theme', 'fonts', 'fontColor'])).lighten(0.1).hex()};
`
const ApiUrl = styled.a`
    display: block;
    grid-area: url;
    font-size: 1.1em;
`
const Avatar = styled.img`
    display: block;
    grid-area: avatar;
    position: relative;
    border-radius: 50%;
    border: 2px solid ${pathOr('white', ['theme', 'colors', 'grayscale', 'white'])};
    box-shadow: 1px 1px 4px ${pathOr('lightgray', ['theme', 'colors', 'grayscale', 'lt'])};
    font-family: ${pathOr('Roboto, Helvetica, Arial', ['theme', 'fonts', 'fontFamily'])};
    height: 3em;

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
        {apis.map(({name, avatarSrc, description, url}) =>
            <ApiCard key={uuid()}>
                <Avatar src={avatarSrc} />
                <ApiName>{name}</ApiName>
                <ApiUrl>{url}</ApiUrl>
                <ApiDescription>{description}</ApiDescription>
            </ApiCard>
        )}
    </ListWrapper>

ApiList.propTypes = {
    apis: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        avatarSrc: PropTypes.string
    }))
}

ApiList.defaultProps = {
    apis: []
}

export default ApiList
