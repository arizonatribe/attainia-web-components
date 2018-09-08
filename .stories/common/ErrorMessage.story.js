import React from 'react'
import {compose} from 'ramda'
import {storiesOf} from '@storybook/react'
import {withKnobs, text} from '@storybook/addon-knobs'
import {withNotes} from '@storybook/addon-notes'
import {withInfo} from '@storybook/addon-info'
import {ThemeProvider} from 'styled-components'

import theme from '@theme'
import ErrorMessage from '@rc/common/ErrorMessage'
import ContentCentered from '@rc/layout/ContentCentered'

const fontLabel = 'Font Size'
const fontDefault = '12px'

storiesOf('Error Message', module)
  .addDecorator(withKnobs)
  .addDecorator(StoryComponent => (
    <ThemeProvider theme={theme}>
      <ContentCentered>
        <StoryComponent />
      </ContentCentered>
    </ThemeProvider>
  ))
  .add('Error Message',
    compose(
      withInfo('A styled error message that can be displayed on screen.'),
      withNotes('A styled error message that can be displayed on screen.')
    )(() =>
      <div>
        <ErrorMessage styles={{fontSize: text(fontLabel, fontDefault)}}>
          {text('Message', 'This is a sample error message indicating an error.')}
        </ErrorMessage>
      </div>
    )
  )
