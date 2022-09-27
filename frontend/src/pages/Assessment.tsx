import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import CodeEditor from '../components/CodeEditor'
import Header from '../components/Header/Header'
import ProblemContainer from '../components/ProblemContainer'
import TaskContainer from '../components/TaskContainer/TaskContainer'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetProblemMarkDownParams, GetProblemMarkDownResults } from '../protocol/GetProblemMarkDown'
import { PostAssessmentCodeParams, PostAssessmentCodeResults } from '../protocol/PostAssessmentCode'
import { getId, ID_NOT_FOUND, nextStage, shouldMoveStage } from '../shared/ExperimentHelper'
import { Get, Post } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { getProblemNumber } from '../shared/Utils'
import { InstructionTask } from '../templates/InstructionTask'

interface MatchParams {
  lecture: string
  fileName: string
}

interface State {
  problem: string
  code: string
  isSubmitting: boolean
}

class Assessment extends React.Component<RouteComponentProps<MatchParams>, State> {
  constructor(props: RouteComponentProps<MatchParams>) {
    super(props)
    this.state = {
      problem: '',
      code: '',
      isSubmitting: false,
    }
  }

  componentDidMount() {
    this.getProblem()
    if (shouldMoveStage()) {
      this.props.history.push(nextStage())
    }

    window.addEventListener('beforeunload', onBeforeUnload)
  }

  componentDidUpdate(prevProps: RouteComponentProps<MatchParams>) {
    if (
      prevProps.match.params.fileName !== this.props.match.params.fileName ||
      prevProps.match.params.lecture !== this.props.match.params.lecture
    ) {
      this.getProblem()
      if (shouldMoveStage()) {
        this.props.history.push(nextStage())
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', onBeforeUnload)
  }

  onCodeChange = (code: string) => {
    this.setState({
      code,
    })
  }

  moveOnToNextProblem = () => {
    if (window.confirm(getString('assessment_confirm_submit'))) {
      this.submit()
    }
  }

  submit = () => {
    if (this.state.isSubmitting) {
      return
    }
    this.setState({
      isSubmitting: true,
    })
    Post<PostAssessmentCodeParams, PostAssessmentCodeResults>(
      `${SERVER_ADDRESS}/postAssessmentCode`,
      {
        participantId: getId() ?? ID_NOT_FOUND,
        lectureName: this.props.match.params.lecture,
        fileName: this.props.match.params.fileName,
        code: this.state.code,
      },
      () => {
        this.setState(
          {
            isSubmitting: false,
            code: '',
          },
          () => this.props.history.push(nextStage())
        )
      },
      error => {
        this.setState(
          {
            isSubmitting: false,
          },
          () => window.alert(error.message)
        )
      }
    )
  }

  getProblem = () => {
    Get<GetProblemMarkDownParams, GetProblemMarkDownResults>(
      `${SERVER_ADDRESS}/getProblemMarkDown`,
      {
        lectureName: this.props.match.params.lecture,
        fileName: this.props.match.params.fileName,
      },
      result => {
        this.setState({
          problem: result.problem,
        })
      },
      error => window.alert(error.message)
    )
  }

  onTimeout = () => {
    window.alert(getString('assessment_alert_time_up'))
    this.submit()
  }

  render() {
    return (
      <div>
        <Header timerKey={this.props.match.params.fileName} onTimeOut={this.onTimeout} />
        <InstructionTask
          instruction={
            <TaskContainer
              instruction={
                <div>
                  <h1>{`${getString('assessment_title')} ${getProblemNumber()}`}</h1>
                  <div>{getString('assessment_instruction')}</div>
                  <ProblemContainer problem={this.state.problem} />
                </div>
              }
              task={<div />}
              footer={
                <button
                  className="submit"
                  type="submit"
                  onClick={this.moveOnToNextProblem}
                  disabled={this.state.isSubmitting}
                >
                  {getString('assessment_action_button')}
                </button>
              }
            />
          }
          task={
            <CodeEditor
              code={this.state.code}
              editorKey={this.props.match.params.fileName}
              onCodeChange={this.onCodeChange}
            />
          }
        />
      </div>
    )
  }
}

function onBeforeUnload(event: BeforeUnloadEvent) {
  event.returnValue = getString('assessment_alert_back')
  return getString('assessment_alert_back')
}

export default Assessment
