import React from 'react'
import { Page } from '../components/Page'
import { TestForm } from '../components/TestForm'
import { useExperiment } from '../hooks/useExperiment'

export function Cognitive() {
  const { id } = useExperiment()

  return (
    <Page>
      <TestForm
        testUrl={`https://docs.google.com/forms/d/e/1FAIpQLSdPMbJTknbONQJ-ICUrKOqGcudAudH6jjzAHfRtnh1XF1l8VQ/viewform?usp=pp_url&entry.418013842=${id}`}
      />
    </Page>
  )
}

export default Cognitive
