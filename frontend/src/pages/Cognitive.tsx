import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../components/Header/Header'
import TestForm from '../components/TestFrom'
import { getId, nextStage, shouldMoveStage } from '../shared/ExperimentHelper'

interface MatchParams {}

interface State {}

class Cognitive extends React.Component<RouteComponentProps<MatchParams>, State> {
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

  render() {
    const participantID = getId()

    return (
      <div>
        <Header />
        <TestForm
          testUrl={`https://docs.google.com/forms/d/e/1FAIpQLSdPMbJTknbONQJ-ICUrKOqGcudAudH6jjzAHfRtnh1XF1l8VQ/viewform?usp=pp_url&entry.418013842=${participantID}`}
          urlChangeListener={this.onUrlChange}
        />
      </div>
    )
  }
}

export default Cognitive
