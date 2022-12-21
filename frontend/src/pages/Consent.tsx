import React from 'react'
import { Page } from '../components/Page'
import { TestForm } from '../components/TestForm'
import { useExperiment } from '../hooks/useExperiment'

function Consent() {
  const { id } = useExperiment()

  return (
    <Page>
      <TestForm
        testUrl={`https://docs.google.com/forms/d/e/1FAIpQLScmE-v1CB66CnhKNfbKdH6i9pT-a3m7LP83mB-Go0Mx3C-YNQ/viewform?usp=pp_url&entry.1076547829=${id}`}
      />
    </Page>
  )
}

export default Consent
