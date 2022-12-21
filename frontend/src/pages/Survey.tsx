import React from 'react'
import { Page } from '../components/Page'
import { TestForm } from '../components/TestForm'
import { useExperiment } from '../hooks/useExperiment'

function Survey() {
  const { id } = useExperiment()

  return (
    <Page>
      <TestForm
        testUrl={`https://docs.google.com/forms/d/e/1FAIpQLScq4NtxKVyDYHat-1tAJU4yMztBRM6Nlu1tRWHwdFNOwTdtSQ/viewform?usp=pp_url&entry.1752659842=${id}`}
      />
    </Page>
  )
}

export default Survey
