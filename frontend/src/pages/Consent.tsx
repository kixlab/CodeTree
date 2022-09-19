import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../components/Header/Header'
import TestForm from '../components/TestFrom'
import { nextStage, getId } from '../shared/ExperimentHelper'

interface MatchParams {}

interface State {}

class Consent extends React.Component<RouteComponentProps<MatchParams>, State> {
  isInitialLoad = true

  onUrlChange = () => {
    if (this.isInitialLoad) {
      this.isInitialLoad = false
    } else {
      this.props.history.push(nextStage())
    }
  }

  render() {
    const participantID = getId()

    return (
      <div>
        <Header />
        <TestForm
          testUrl={`https://docs.google.com/forms/d/e/1FAIpQLScHnYCbB6iw9zBxP3Uj54x7xf36y7geWdxUU1MqHQmCSy1jlw/viewform?usp=pp_url&entry.1076547829=${participantID}`}
          urlChangeListener={this.onUrlChange}
        />
      </div>
    )
  }
}

export default Consent
