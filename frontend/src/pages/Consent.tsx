import React from 'react'
import { Page } from '../components/Page'
import { TestForm } from '../components/TestForm'
import { getId } from '../shared/ExperimentHelper'

function Consent() {
  const participantID = getId()

  return (
    <Page>
      <TestForm
        testUrl={`https://docs.google.com/forms/d/e/1FAIpQLScmE-v1CB66CnhKNfbKdH6i9pT-a3m7LP83mB-Go0Mx3C-YNQ/viewform?usp=pp_url&entry.1076547829=${participantID}`}
      />
    </Page>
  )
}

export default Consent
