import React from 'react'
import { Page } from '../components/Page'
import { TestForm } from '../components/TestForm'
import { getId } from '../shared/ExperimentHelper'

export function Cognitive() {
  const participantID = getId()

  return (
    <Page>
      <TestForm
        testUrl={`https://docs.google.com/forms/d/e/1FAIpQLSdPMbJTknbONQJ-ICUrKOqGcudAudH6jjzAHfRtnh1XF1l8VQ/viewform?usp=pp_url&entry.418013842=${participantID}`}
      />
    </Page>
  )
}

export default Cognitive
