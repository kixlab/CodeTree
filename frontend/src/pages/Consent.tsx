import React from 'react'
import { Page } from '../components/Page'
import { TestForm } from '../components/TestForm'
import { getId } from '../shared/ExperimentHelper'

function Consent() {
  const participantID = getId()

  return (
    <Page>
      <TestForm
        testUrl={`https://docs.google.com/forms/d/e/1FAIpQLScHnYCbB6iw9zBxP3Uj54x7xf36y7geWdxUU1MqHQmCSy1jlw/viewform?usp=pp_url&entry.1076547829=${participantID}`}
      />
    </Page>
  )
}

export default Consent
