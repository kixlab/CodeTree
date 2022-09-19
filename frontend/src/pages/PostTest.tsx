import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../components/Header/Header'
import TestForm from '../components/TestFrom'
import { getId, nextStage, shouldMoveStage } from '../shared/ExperimentHelper'
import { getString } from '../shared/Localization'

interface MatchParams {}

interface State {}

class PostTest extends React.Component<RouteComponentProps<MatchParams>, State> {
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
    window.alert(getString('posttest_alert_time_up'))
  }

  render() {
    const participantID = getId()

    return (
      <div>
        <Header onTimeOut={this.onTimeOut} />
        <TestForm
          testUrl={`https://docs.google.com/forms/d/e/1FAIpQLScphvy2-8EhzZYiscZqhpD1V57K5bHktAViG_CfYAv7nWvbZQ/viewform?usp=pp_url&entry.1709447=${participantID}`}
          urlChangeListener={this.onUrlChange}
        />
      </div>
    )
  }
}

export default PostTest
