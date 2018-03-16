/* eslint "max-len": "off" */
import React from 'react'
import {compose} from 'ramda'
import {storiesOf} from '@storybook/react'
import {withNotes} from '@storybook/addon-notes'
import {withInfo} from '@storybook/addon-info'
import {action} from '@storybook/addon-actions'
import styled, {ThemeProvider} from 'styled-components'

import theme from '@theme'
import ContentCentered from '@awc/layout/ContentCentered'
// Combined component import using what I learned from Login.js
import {FormField} from '@awc/common'
import Button from '@awc/common/Button'


// Define constants to make things look nice.

const Radiogrid = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 1rem;
`

const innerForm = {
    background: '#E4E8E4',
    padding: '12px 7px 7px 7px',
    margin: 'auto',
    fontSize: '12px'
}

const submitDiv = {
    padding: '7px',
    margin: 'auto',
    fontSize: '12px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around'
}

const formWrapper = {
    borderRadius: '5px',
    border: '1px #D6D6D2',
    padding: '20px',
    margin: 'auto',
    background: ' #EFF0EF',
    fontFamily: 'Roboto, sans-serif',
    color: '#363636'
}

const formShadow = {
    boxShadow: '2px 3px 5px rgba(0,0,0,.5)'
}

const formH2Header = {
    margin: 'auto',
    fontSize: '21px',
    fontWeight: 'bold',
    textAlign: 'left',
    padding: '0px 0px 5px 0px'
}

const formH1Header = {
    margin: 'auto',
    fontSize: '25px',
    fontWeight: 'bold',
    textAlign: 'left',
    padding: '10px',
    background: '#000000',
    fontFamily: 'Roboto, sans-serif',
    color: '#FFFFFF'
}

const smallerHeader = {
    margin: '0 0 -5px 0',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'left',
    padding: '15px 0 0 0'
}

storiesOf('Form Sample', module)
    .addDecorator(StoryComponent => (
        <ThemeProvider theme={theme}>
            <ContentCentered>
                <StoryComponent />
            </ContentCentered>
        </ThemeProvider>
    ))
    .add('Sample Form',
        compose(
            withInfo('An input element type of text box.'),
            withNotes('An input element type of text box.')
        )(() =>
            // Define main form Div containing shadow.
            <div id="main-form-div" style={formShadow}>
                <div id="form-h1-header" style={formH1Header}>
                    Attainia Sample Form
                </div>
                <div id="form-wrapper" style={formWrapper}>
                    <div id="form-header" style={formH2Header}>
                        Meeting Scheduler
                    </div>
                    <div id="storybook-form">
                        <header style={smallerHeader}>Basic Information</header>
                        <div id="inner-form-name" style={innerForm}>
                            <FormField
                              className="Form Field"
                              label="Name"
                              type="text"
                              name="text"
                              placeholder="John Smith"
                            />
                        </div>
                        <div id="inner-form-password" style={innerForm}>
                            <FormField
                              className="Password Field"
                              label="Password"
                              type="password"
                              name="password"
                              placeholder=""
                            />
                        </div>
                        <div id="inner-form-email" style={innerForm}>
                            <FormField
                              className="Email Field"
                              label="Email"
                              type="email"
                              name="email"
                              placeholder="john.smith@domain.com"
                            />
                        </div>
                        <div id="checkboxes-form-header" style={smallerHeader}>
                            Employee Classification
                        </div>
                        <div id="fulltime-inner-form" style={innerForm}>
                            <FormField
                              className="checked-box"
                              label="Full Time"
                              type="checkbox"
                              name="checked-box"
                              checked="0"
                            />
                        </div>
                        <div id="parttime-inner-form" style={innerForm}>
                            <FormField
                              className="unchecked-box"
                              label="Part Time"
                              type="checkbox"
                              name="unchecked-box"
                            />
                        </div>
                        <div id="radio-form-header" style={smallerHeader}>
                            Associated Department
                        </div>
                        <div id="radios-inner-form" style={innerForm}>
                            <Radiogrid>
                                <div id="sales">
                                    <FormField
                                      className="Radio-1"
                                      label="Sales"
                                      type="radio"
                                      name="radio"
                                      checked="checked"
                                    />
                                </div>
                                <div id="manager">
                                    <FormField
                                      className="Radio-2"
                                      label="Manager"
                                      type="radio"
                                      name="radio"
                                    />
                                </div>
                                <div id="engineering">
                                    <FormField
                                      className="Radio-3"
                                      label="Engineering"
                                      type="radio"
                                      name="radio"
                                    />
                                </div>
                                <div id="marketing">
                                    <FormField
                                      className="Radio-4"
                                      label="Marketing"
                                      type="radio"
                                      name="radio"
                                    />
                                </div>
                            </Radiogrid>
                        </div>
                        <div id="time-form-header" style={smallerHeader}>
                            Meeting Availability
                        </div>
                        <div id="datepicker-inner-form" style={innerForm}>
                            <FormField
                              className="DatePicker Field"
                              type="date"
                              name="date"
                              label="Availability Date: "
                            />
                        </div>
                        <div id="weekpicker-inner-form" style={innerForm}>
                            <FormField
                              className="Week Field"
                              type="week"
                              name="week"
                              label="Available Week: "
                            />
                        </div>

                        <div id="colorfile-form-header" style={smallerHeader}>
                            Pick a Color and Upload a File
                        </div>
                        <div id="color-inner-form" style={innerForm}>
                            <FormField
                              className="Color Field"
                              type="color"
                              name="color"
                              label="Favorite Color: "
                            />
                        </div>
                        <div id="file-inner-form" style={innerForm}>
                            <FormField
                              className="File Picker Field"
                              type="file"
                              name="file"
                              label="Favorite File: "
                            />
                        </div>
                        <div id="submit" style={submitDiv}>
                            <Button
                              onClick={action('Form cancelled!')}
                              styles={{backgroundColor: '#A5A5A5'}}
                            >
                                Cancel
                            </Button>
                            {'        '}
                            <Button
                              onClick={action('Form submitted!')}
                              styles={{backgroundColor: '#0072CE'}}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    )


    // #0072CE