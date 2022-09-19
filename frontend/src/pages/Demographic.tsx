import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../components/Header/Header'
import TestForm from '../components/TestFrom'
import { nextStage, getId } from '../shared/ExperimentHelper'

interface MatchParams {}

interface State {}

class Demographic extends React.Component<RouteComponentProps<MatchParams>, State> {
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
          testUrl={`https://docs.google.com/forms/d/e/1FAIpQLSd9E-Nki0jz5t6SufNQkudRxat_OaBH8xcJmUp2SLzLFI6TcA/viewform?usp=pp_url&entry.1240818499=${participantID}`}
          urlChangeListener={this.onUrlChange}
        />
      </div>
    )
  }
}

export default Demographic
