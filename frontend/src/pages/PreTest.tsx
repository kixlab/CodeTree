import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../components/Header/Header'
import TestForm from '../components/TestFrom'
import { getId, nextStage, shouldMoveStage } from '../shared/ExperimentHelper'
import { getString } from '../shared/Localization'

interface MatchParams {}

interface State {}

class PreTest extends React.Component<RouteComponentProps<MatchParams>, State> {
  isInitialLoad = true

  componentDidMount() {
    if (shouldMoveStage()) {
      this.props.history.push(nextStage())
    }
  }

  onUrlChange = () => {
    if (this.isInitialLoad) {
      this.isInitialLoad = false
    } else {
      this.props.history.push(nextStage())
    }
  }

  onTimeOut = () => {
    window.alert(getString('pretest_alert_time_up'))
  }

  render() {
    const participantID = getId()

    return (
      <div>
        <Header onTimeOut={this.onTimeOut} />
        <TestForm
          testUrl={`https://docs.google.com/forms/d/e/1FAIpQLScDPCD1sDy1lPbV5vDWsLfRc6ycIrlsiKxxax9eqn9R5eUQIw/viewform?usp=pp_url&entry.1709447=${participantID}`}
          urlChangeListener={this.onUrlChange}
        />
      </div>
    )
  }
}

export default PreTest
