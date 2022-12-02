import React from 'react'
import { Page } from '../components/Page'
import { TestForm } from '../components/TestForm'
import { getGroup, getId } from '../shared/ExperimentHelper'

function Survey() {
  const group = getGroup()
  const participantID = getId()

  const url = (() => {
    switch (group) {
      case 'A':
        return `https://docs.google.com/forms/d/e/1FAIpQLSdoWIJYUc2MHzWfjnOGQYFxq70fHQGsRkeZCudem8BnPu9F0g/viewform?usp=pp_url&entry.1845500850=${participantID}`
      case 'B':
        return `https://docs.google.com/forms/d/e/1FAIpQLSe6isXHDPYVgYGsO9SUCCueIyjkD572eJ9LnI2D3oRBiEiS8Q/viewform?usp=pp_url&entry.1845500850=${participantID}`
      case 'C':
        return `https://docs.google.com/forms/d/e/1FAIpQLSfL1d6CTwFqbFUlgVCyKToHvchzK0qCgrFgLOe9dS-_rMxxxg/viewform?usp=pp_url&entry.1845500850=${participantID}`
      default:
        return ''
    }
  })()

  return (
    <Page>
      <TestForm testUrl={url} />
    </Page>
  )
}

export default Survey
