import React from 'react'
import {compose} from 'ramda'
import {storiesOf} from '@storybook/react'
import {withKnobs, text} from '@storybook/addon-knobs'
import {withNotes} from '@storybook/addon-notes'
import {action} from '@storybook/addon-actions'
import {withInfo} from '@storybook/addon-info'
import {ThemeProvider} from 'styled-components'

import theme from '@theme'
import Link from '@rc/common/Link'
import ContentCentered from '@rc/layout/ContentCentered'

const fontLabel = 'Font Size'
const fontDefault = '12px'


storiesOf('Basic Link', module)
  .addDecorator(withKnobs)
  .addDecorator(StoryComponent => (
    <ThemeProvider theme={theme}>
      <ContentCentered>
        <StoryComponent />
      </ContentCentered>
    </ThemeProvider>
  ))
  .add('Basic Link',
    compose(
      withInfo('A basic link, royal blue, underlined with the basic link following rules.'),
      withNotes('A basic link.  Use the knobs to change the label or the font size to see different variations.')
    )(() => ([
      <div>
        <Link onClick={action('Link clicked!')} styles={{fontSize: text(fontLabel, fontDefault)}}>
          {text('Label', 'Link Example')}
        </Link>
      </div>
    ]))
  )
