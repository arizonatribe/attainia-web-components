/* eslint "max-len": "off" */
import React from 'react'
import {compose} from 'ramda'
import {storiesOf} from '@storybook/react'
import {withNotes} from '@storybook/addon-notes'
import {withInfo} from '@storybook/addon-info'
import {ThemeProvider} from 'styled-components'
import theme from '@theme'
import ContentCentered from '@awc/layout/ContentCentered'
import FormField from '@awc/common/FormField'

const innerForm = {
    background: '#E4E8E4',
    padding: '20px',
    margin: 'auto',
    fontSize: '12px',
    WebkitInputPlaceholder: {
        color: 'red'
    }
}
//  padding comment so I remember - padding is top, right, bottom, left.
const formWrapper = {
    borderRadius: '5px',
    border: '1px #D6D6D2',
    padding: '20px',
    margin: 'auto',
    background: ' #EFF0EF',
    text: '#363636'
}

const formHeader = {
    margin: 'auto',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'left'
}

storiesOf('Form Components', module)
    .addDecorator(StoryComponent => (
        <ThemeProvider theme={theme}>
            <ContentCentered>
                <StoryComponent />
            </ContentCentered>
        </ThemeProvider>
    ))
    .add('Checkbox with Label',
        compose(
            withInfo('A styled checkbox that is wrapped and the *onClick* is attached to the wrapper (value is still bound to the underlying *<input type=checkbox />*) to facilitate the checkbox behavior.'),
            withNotes('This is a checkbox that has a checkbox label on it.')
        )(() =>
            <div id="checkbox-form-wrapper" style={formWrapper}>
                <div id="checkbox-form-header" style={formHeader}>
                Checkbox Labels
                </div>
                <div id="checkbox-inner-form" style={innerForm}>
                    <FormField
                      className="Checkbox Label"
                      label="Label 1"
                      type="checkbox"
                      name="Checkbox 1"
                      checked="0"
                    />
                    <FormField
                      className="Checkbox Label"
                      label="Label 2"
                      type="checkbox"
                      name="Checkbox 2"
                    />
                </div>
            </div>
        )
    )
    .add('Sample Text Form Fields',
        compose(
            withInfo('An input element type of text box.'),
            withNotes('An input element type of text box.')
        )(() =>
            <div id="text-form-wrapper" style={formWrapper}>
                <div id="text-form-header" style={formHeader}>
                Sample Text Form Fields
                </div>
                <div id="text-inner-form" style={innerForm}>
                    <FormField
                      className="Form Field"
                      label="Text Input Field"
                      type="text"
                      name="text"
                      placeholder="John Smith"
                    />
                    <br />
                    <FormField
                      className="Password Field"
                      label="Password Input Field"
                      type="password"
                      name="password"
                      placeholder=""
                    />
                </div>
            </div>
        )
    )
    .add('Sample Radio Buttons',
        compose(
            withInfo('A radio button or option button is a graphical control element that allows the user to choose only one of a predefined set of mutually exclusive options.'),
            withNotes('Four radio buttons to show a layout consisting of four options in a small square grid.')
        )(() => ([
            <div id="form-wrapper" style={formWrapper}>
                <div id="form-header" style={formHeader}>
            Radio Buttons
                </div>
                <div id="inner-form" style={innerForm}>
                    <FormField
                      className="Radio Field"
                      label="Radio Button 1"
                      type="radio"
                      name="radio"
                    />

                    <FormField
                      className="Radio Field"
                      label="Radio Button 2"
                      type="radio"
                      name="radio"
                    />

                    <FormField
                      className="Radio Field"
                      label="Radio Button 3"
                      type="radio"
                      name="radio"
                    />

                    <FormField
                      className="Radio Field"
                      label="Radio Button 4"
                      type="radio"
                      name="radio"
                    />
                </div>
            </div>
        ]))
    )
    .add('Color Picker Field',
        compose(
            withInfo('A color picker field.'),
            withNotes('A color picker field.')
        )(() =>
            <div id="color-form-wrapper" style={formWrapper}>
                <div id="color-form-header" style={formHeader}>
            Color Picker
                </div>
                <div id="color-inner-form" style={innerForm}>
                    <FormField
                      className="Color Field"
                      type="color"
                      name="color"
                      value="#1b6595"
                    />
                </div>
            </div>
        )
    )
    .add('Email Field',
        compose(
            withInfo('Email field'),
            withNotes('Email field.')
        )(() =>
            <div id="email-form-wrapper" style={formWrapper}>
                <div id="email-form-header" style={formHeader}>
                Email Field
                    <div id="email-inner-form" style={innerForm}>
                        <FormField
                          className="Email Field"
                          label="Email"
                          type="email"
                          name="email"
                          icon="document"
                          placeholder="email@domain.com"
                        />
                    </div>
                </div>
            </div>
        )
    )
    .add('File Picker',
        compose(
            withInfo('File picker field'),
            withNotes('File picker field.')
        )(() =>
            <div id="file-form-wrapper" style={formWrapper}>
                <div id="file-form-header" style={formHeader}>
            File Picker Field
                    <div id="file-inner-form" style={innerForm}>
                        <FormField
                          className="File Picker Field"
                          type="file"
                          name="file"
                        />
                    </div>
                </div>
            </div>
        )
    )
    .add('Date & DateTime Fields',
        compose(
            withInfo('Date picker field'),
            withNotes('Date picker field.')
        )(() =>
            <div id="date-form-wrapper" style={formWrapper}>
                <div id="date-form-header" style={formHeader}>
            Date Picker
                </div>
                <div id="date-inner-form" style={innerForm}>
                    <FormField
                      className="Date Picker Field"
                      label=""
                      type="date"
                      name="date"
                    />
                </div>
                <br />
                <div id="datetime-form-header" style={formHeader}>
            Date/Time Picker
                </div>
                <div id="datetime-inner-form" style={innerForm}>
                    <FormField
                      className="DateTime Picker Field"
                      label=""
                      type="datetime-local"
                      name="datetime-local"
                    />
                </div>
            </div>
        )
    )
    .add('Date: Month Picker',
        compose(
            withInfo('Date: Month Picker'),
            withNotes('Date: Month Picker')
        )(() =>
            <div id="month-form-wrapper" style={formWrapper}>
                <div id="month-form-header" style={formHeader}>
            Month Picker
                </div>
                <div id="month-inner-form" style={innerForm}>
                    <FormField
                      className="Month Picker"
                      label=""
                      type="month"
                      name="month"
                    />
                </div>
            </div>
        )
    )
    .add('Date: Week Picker',
        compose(
            withInfo('Date: Week Picker'),
            withNotes('Date: Week Picker')
        )(() =>
            <div id="week-form-wrapper" style={formWrapper}>
                <div id="week-form-header" style={formHeader}>
                Week Picker
                    <div id="week-inner-form" style={innerForm}>
                        <FormField
                          className="Week Picker"
                          label=""
                          type="week"
                          name="week"
                        />
                    </div>
                </div>
            </div>
        )
    )
    .add('Date: Time Picker',
        compose(
            withInfo('Date: Time Picker'),
            withNotes('Date: Time Picker')
        )(() =>
            <div id="time-form-wrapper" style={formWrapper}>
                <div id="time-form-header" style={formHeader}>
            Time Picker
                </div>
                <div id="time-inner-form" style={innerForm}>
                    <FormField
                      className="Time Picker"
                      label=""
                      type="time"
                      name="time"
                    />
                </div>
            </div>

        )
    )
    .add('Number Field',
        compose(
            withInfo('Number field.'),
            withNotes('Number field.')
        )(() =>
            <div id="number-form-wrapper" style={formWrapper}>
                <div id="number-form-header" style={formHeader}>
            Number Selector
                </div>
                <div id="number-inner-form" style={innerForm}>
                    <FormField
                      className="Number field"
                      label="Select a number"
                      type="number"
                      name="number"
                    />
                </div>
            </div>
        )
    )
    .add('Range Slider',
        compose(
            withInfo('Range slider.'),
            withNotes('Range slider.')
        )(() =>
            <div id="range-form-wrapper" style={formWrapper}>
                <div id="range-form-header" style={formHeader}>
            Range Slider
                </div>
                <div id="range-inner-form" style={innerForm}>
                    <FormField
                      className="Range field"
                      type="range"
                      name="range"
                    />
                </div>
            </div>
        )
    )
    .add('Search Field',
        compose(
            withInfo('Search field.'),
            withNotes('Search field.')
        )(() =>
            <div id="search-form-wrapper" style={formWrapper}>
                <div id="search-form-header" style={formHeader}>
            Search Field
                </div>
                <div id="search-inner-form" style={innerForm}>
                    <FormField
                      className="Search field"
                      label="Search: "
                      type="search"
                      name="search"
                    />
                </div>
            </div>
        )
    )
    .add('Selector Field',
        compose(
            withInfo('Selector field.'),
            withNotes('Selector field.')
        )(() =>
            <div id="selector-form-wrapper" style={formWrapper}>
                <div id="selector-form-header" style={formHeader}>
                Sample Selector
                </div>
                <div id="selector-inner-form" style={innerForm}>
                    <select name="sample-selector">
                        <option value="option 1">Option 1</option>
                        <option value="option 2">Option 2</option>
                        <option value="option 3">Option 3</option>
                    </select>
                </div>
            </div>
        )
    )
