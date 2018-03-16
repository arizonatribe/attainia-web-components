import React from 'react'
import {compose} from 'ramda'
import {storiesOf} from '@storybook/react'
import {withKnobs, text, boolean, select} from '@storybook/addon-knobs'
import {withNotes} from '@storybook/addon-notes'
import {action} from '@storybook/addon-actions'
import {withInfo} from '@storybook/addon-info'
import styled, {ThemeProvider} from 'styled-components'

import theme from '@theme'
import Button from '@awc/common/Button'
import ContentCentered from '@awc/layout/ContentCentered'

const Spaced = styled.div`
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`

const buttonStyler = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    color: '#FFFFF',
    padding: '15px',
    backgroundColor: '#E4E8E4'
}

const buttonHeader = {
    margin: 'auto',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'left'
}

// Primary Button Colors
const rossoCorsa = {
    backgroundColor: '#E10600'
}

const tongue = {
    backgroundColor: '#EF4B49'
}

const rossoCorsaHover = {
    backgroundColor: '#F06967'
}

const rossoCorsaVisited = {
    backgroundColor: '#B81814'
}

const rossoCorsaDisabled = {
    backgroundColor: '#D8C4C3'
}

// Secondary Button Colors (with padding)
const trueBlue = {
    backgroundColor: '#0072CE',
    padding: '10px'
}

const trueBlueActive = {
    backgroundColor: '#328ED7',
    padding: '10px'
}

const trueBlueHover = {
    backgroundColor: '#4C9CDC',
    padding: '10px'
}

const trueBlueVisited = {
    backgroundColor: '#005BA4',
    padding: '10px'
}

const trueBlueDisabled = {
    backgroundColor: '#C1CDD7',
    padding: '10px'
}

storiesOf('Buttons', module)
    .addDecorator(withKnobs)
    .addDecorator(StoryComponent => (
        <ThemeProvider theme={theme}>
            <ContentCentered>
                <StoryComponent />
            </ContentCentered>
        </ThemeProvider>
    ))
    .add('Attainia Buttons',
        compose(
            withInfo('The basic Attainia buttons with primary and secondary colors.'),
            withNotes('These are the basic Attainia buttons with both primary and secondary colors.')
        )(() => ([
            <div id="button-wrapper">
                <div id="button-header" style={buttonHeader}>
            Primary Buttons
                </div>
                <div id="primary-buttons" style={buttonStyler}>
                    <Spaced>
                        <Button styles={rossoCorsa}>
                            Button
                        </Button>

                        <Button styles={tongue}>
                            Button Active
                        </Button>

                        <Button styles={rossoCorsaHover}>
                            Button Hover
                        </Button>

                        <Button styles={rossoCorsaVisited}>
                            Button Visited
                        </Button>

                        <Button styles={rossoCorsaDisabled}>
                            Button Disabled
                        </Button>
                    </Spaced>
                </div>
                <br />
                <br />
                <div id="button-header" style={buttonHeader}>
                Secondary Buttons
                </div>
                <div id="secondary-buttons" style={buttonStyler}>
                    <Spaced>
                        <Button styles={trueBlue}>
                            Button
                        </Button>
                        <Button styles={trueBlueActive}>
                            Button Active
                        </Button>
                        <Button styles={trueBlueHover}>
                            Button Hover
                        </Button>
                        <Button styles={trueBlueVisited}>
                            Button Visited
                        </Button>
                        <Button styles={trueBlueDisabled}>
                            Button Disabled
                        </Button>
                    </Spaced>
                </div>
            </div>
        ]))
    )
    .add('Button Playground',
        compose(
            withInfo('This is the basic button with some knobs playground stuff.'),
            withNotes('This is a basic Attainia button with some knobs to provide user feedback.')
        )(() =>
            <div>
                <Button
                  onClick={action('Button clicked')}
                  disabled={boolean('Disabled', false)}
                  status={select('Button Style', ['none', 'warning', 'ok', 'error'])}
                  
                >
                    {text('Label', 'Attainia Button')}
                </Button>
            </div>
        )
    )
