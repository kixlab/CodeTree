import React from 'react'
import { Page } from '../components/Page'
import { TestForm } from '../components/TestForm'
import { getId } from '../shared/ExperimentHelper'

function Demographic() {
  const participantID = getId()

  return (
    <Page>
      <TestForm
        testUrl={`https://docs.google.com/forms/d/e/1FAIpQLSd9E-Nki0jz5t6SufNQkudRxat_OaBH8xcJmUp2SLzLFI6TcA/viewform?usp=pp_url&entry.1240818499=${participantID}`}
      />
    </Page>
  )
}

export default Demographic
