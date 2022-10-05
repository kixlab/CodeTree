import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../components/Header/Header'
import TestForm from '../components/TestFrom'
import { useGoogleForm } from '../hooks/useGoogleForm'

function Consent(props: RouteComponentProps) {
  const { participantID, onUrlChange } = useGoogleForm(props.history.push)

  return (
    <div>
      <Header />
      <TestForm
        testUrl={`https://docs.google.com/forms/d/e/1FAIpQLScHnYCbB6iw9zBxP3Uj54x7xf36y7geWdxUU1MqHQmCSy1jlw/viewform?usp=pp_url&entry.1076547829=${participantID}`}
        urlChangeListener={onUrlChange}
      />
    </div>
  )
}

export default Consent
