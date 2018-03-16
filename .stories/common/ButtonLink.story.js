/* eslint "max-len": "off" */
import React from 'react'
import {compose} from 'ramda'
import {storiesOf} from '@storybook/react'
import {withKnobs, text} from '@storybook/addon-knobs'
import {withNotes} from '@storybook/addon-notes'
import {action} from '@storybook/addon-actions'
import {withInfo} from '@storybook/addon-info'
import {ThemeProvider} from 'styled-components'

import theme from '@theme'
import ButtonLink from '@awc/common/ButtonLink'
import LinkButton from '@awc/common/LinkButton'
import ContentCentered from '@awc/layout/ContentCentered'

const fontLabel = 'Font Size'
const fontDefault = '12px'

storiesOf('Button Links', module)
    .addDecorator(withKnobs)
    .addDecorator(StoryComponent => (
        <ThemeProvider theme={theme}>
            <ContentCentered>
                <StoryComponent />
            </ContentCentered>
        </ThemeProvider>
    ))
    .add('Button Links',
        compose(
            withInfo('A basic button link, royal blue, underlined with the basic link following rules.'),
            withNotes('A basic button link.  Use the knobs to change the label or the font size to see different variations.')
        )(() => ([
            <div>
                <ButtonLink onClick={action('Link clicked!')} styles={{fontSize: text(fontLabel, fontDefault)}}>
                    {text('Label', 'Button Link Example')}
                </ButtonLink>
            </div>
        ]))
    )
    .add('Link Buttons',
        compose(
            withInfo('A basic link, royal blue, underlined with the basic link following rules.'),
            withNotes('A basic link button.  Use the knobs to change the label or the font size to see different variations.')
        )(() => ([
            <div>
                <LinkButton onClick={action('Link Button clicked!')} styles={{fontSize: text(fontLabel, fontDefault)}}>
                    {text('Label', 'Link Button Example')}
                </LinkButton>
            </div>
        ]))
    )

