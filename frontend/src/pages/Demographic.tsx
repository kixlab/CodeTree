import React from 'react'
import { Page } from '../components/Page'
import { TestForm } from '../components/TestForm'
import { getId } from '../shared/ExperimentHelper'

function Demographic() {
  const participantID = getId()

  return (
    <Page>
      <TestForm
        testUrl={`https://docs.google.com/forms/d/e/1FAIpQLSfk6g3oDfRsxRhN-nMnQTdMZwBCH8mrMdLxW5RgC0KC3Wu5ng/viewform?usp=pp_url&entry.1240818499=${participantID}`}
      />
    </Page>
  )
}

export default Demographic
