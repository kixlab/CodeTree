import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../components/Header/Header'
import TestForm from '../components/TestFrom'
import { useGoogleForm } from '../hooks/useGoogleForm'

function Demographic(props: RouteComponentProps) {
  const { participantID, onUrlChange } = useGoogleForm(props.history.push)

  return (
    <div>
      <Header />
      <TestForm
        testUrl={`https://docs.google.com/forms/d/e/1FAIpQLSd9E-Nki0jz5t6SufNQkudRxat_OaBH8xcJmUp2SLzLFI6TcA/viewform?usp=pp_url&entry.1240818499=${participantID}`}
        urlChangeListener={onUrlChange}
      />
    </div>
  )
}

export default Demographic
