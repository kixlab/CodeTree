import React from 'react'
import { Page } from '../components/Page'
import { TestForm } from '../components/TestForm'
import { useExperiment } from '../hooks/useExperiment'

function Demographic() {
  const { id } = useExperiment()

  return (
    <Page>
      <TestForm
        testUrl={`https://docs.google.com/forms/d/e/1FAIpQLSfk6g3oDfRsxRhN-nMnQTdMZwBCH8mrMdLxW5RgC0KC3Wu5ng/viewform?usp=pp_url&entry.1240818499=${id}`}
      />
    </Page>
  )
}

export default Demographic
