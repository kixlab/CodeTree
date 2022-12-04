import React from 'react'
import { Page } from '../components/Page'
import { TestForm } from '../components/TestForm'
import { getId } from '../shared/ExperimentHelper'

function Survey() {
  const participantID = getId()

  return (
    <Page>
      <TestForm
        testUrl={`https://docs.google.com/forms/d/e/1FAIpQLScq4NtxKVyDYHat-1tAJU4yMztBRM6Nlu1tRWHwdFNOwTdtSQ/viewform?usp=pp_url&entry.1752659842=${participantID}`}
      />
    </Page>
  )
}

export default Survey
