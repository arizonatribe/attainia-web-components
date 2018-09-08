import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  ContentCentered,
  ContentFullSize,
  HeaderImage,
  ContentHeader,
  ContentWrapper,
  ModalButton
} from '../components/layout'

const Greeting = styled.h1`
    display: block;
    padding: 0;
    font-size: 2em;
    font-weight: 700;
`
const Description = styled.p`
    display: block;
    justify-self: start;
`
const Excerpt = styled.p`
    display: block;
    padding: 0 4em;
    font-style: italic;
    justify-self: start;
    text-align: justify;
`
const TextWrapper = styled.section`
    display: grid;
    padding: 2em;
    justify-items: center;
    justify-content: center;
    grid-row-gap: 1.5em;
`

// eslint-disable-next-line max-len
const HippocraticOath = `I swear by Apollo Physician, by Asclepius, by Health, by Panacea and by all the gods and goddesses, making them my witnesses, that I will carry out, according to my ability and judgment, this oath and this indenture. To hold my teacher in this art equal to my own parents; to make him partner in my livelihood; when he is in need of money to share mine with him; to consider his family as my own brothers, and to teach them this art, if they want to learn it, without fee or indenture; to impart precept,1 oral instruction, and all other instruction2 to my own sons, the sons of my teacher, and to indentured pupils who have taken the physician’s oath, but to nobody else. I will use treatment to help the sick according to my ability and judgment, but never with a view to injury and wrong-doing. Neither will I administer a poison to anybody when asked to do so, nor will I suggest such a course. Similarly I will not give to a woman a pessary to cause abortion. But I will keep pure and holy both my life and my art. I will not use the knife, not even, verily, on sufferers from stone, but I will give place to such as are craftsmen
`

const DemoHome = ({imgSrc}) =>
  <ContentWrapper onMouseMove={this.pulse}>
    <HeaderImage backgroundImage={imgSrc} height="110px" />
    <ContentCentered>
      <Greeting>Welcome to our site!</Greeting>
    </ContentCentered>
    <ContentCentered>
      <ModalButton>
        <ContentFullSize>
          <ContentHeader hasAddButton resourceTitle="idea" resourceSubtitle="good ones are always welcome!" />
          <HeaderImage styles={{zIndex: 0, opacity: 1}} backgroundImage={imgSrc} />
          <TextWrapper>
            <Greeting>You opened a Modal component</Greeting>
            <Description>
                            Any kind of content can be placed into this modal (pictures, text, video, or complex forms).
                            Usually you would see some Lorem Ipsum filler text,
                            but since Attainia specializes in software for the medical industry,
                            we can try the Hippocratic Oath instead:
            </Description>
            <Excerpt>{HippocraticOath}</Excerpt>
            <Description>
                            The modal itself uses the React Portal API and is configured to close when you click
                            outside the modal window. Give it a shot!
            </Description>
          </TextWrapper>
        </ContentFullSize>
      </ModalButton>
    </ContentCentered>
  </ContentWrapper>

DemoHome.propTypes = {
  imgSrc: PropTypes.string
}

export default DemoHome
