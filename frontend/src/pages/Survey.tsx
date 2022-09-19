import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../components/Header/Header'
import TestForm from '../components/TestFrom'
import { useForm } from '../hooks/useForm'
import { getGroup } from '../shared/ExperimentHelper'

interface MatchParams {}

function useSurvey(history: RouteComponentProps['history']) {
  const { participantID, onUrlChange } = useForm(history)
  const group = getGroup()

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

  return {
    url,
    onUrlChange,
  }
}

function Survey(props: RouteComponentProps<MatchParams>) {
  const { onUrlChange, url } = useSurvey(props.history)

  return (
    <div>
      <Header />
      <TestForm testUrl={url} urlChangeListener={onUrlChange} />
    </div>
  )
}

export default Survey
