import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import repeat from 'lodash/repeat'
import min from 'lodash/min'
import Header from '../components/Header/Header'
import TaskContainer from '../components/TaskContainer/TaskContainer'
import { SERVER_ADDRESS } from '../environments/Configuration'
import CodeEditor from '../components/CodeEditor/CodeEditor'
import { PostPythonCodeParams, PostPythonCodeResults } from '../protocol/PostPythonCode'
import OutputTerminal from '../components/OutputTerminal'
import ProgramRunner from '../components/ProgramRunner/ProgramRunner'
import { nextStage, getId, ID_NOT_FOUND } from '../shared/ExperimentHelper'
import ProblemContainer from '../components/ProblemContainer'
import { PostPracticeCodeParams, PostPracticeCodeResults } from '../protocol/PostPracticeCode'
import { Post, Get } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { InstructionTask } from '../templates/InstructionTask'
import { getPracticeNumber, getSubgoals } from '../shared/Utils'
import { GetProgramCodeParams, GetProgramCodeResults } from '../protocol/GetProgramCode'
import { Color } from '../shared/Common'
import { GetProblemMarkDownParams, GetProblemMarkDownResults } from '../protocol/GetProblemMarkDown'
import { CodeMirror } from '../components/CodeMirror'

interface MatchParams {
  lecture: string
  fileName: string
}

interface State {
  problem: string
  code: string
  codeExample: string
  programOutput: string
  outputCorrect: boolean | null
  isRunning: boolean
  isSubmitting: boolean
}

class Practice extends React.Component<RouteComponentProps<MatchParams>, State> {
  constructor(props: RouteComponentProps<MatchParams>) {
    super(props)
    this.state = {
      problem: '',
      code: '',
      codeExample: '',
      programOutput: getString('practice_terminal_output'),
      outputCorrect: null,
      isRunning: false,
      isSubmitting: false,
    }
  }

  componentDidMount() {
    const { lecture, fileName } = this.props.match.params
    Get<GetProblemMarkDownParams, GetProblemMarkDownResults>(
      `${SERVER_ADDRESS}/getProblemMarkDown`,
      {
        lectureName: lecture,
        fileName,
      },
      result => {
        this.setState({
          problem: result.problem,
        })
      },
      error => window.alert(error.message)
    )
    Get<GetProgramCodeParams, GetProgramCodeResults>(
      `${SERVER_ADDRESS}/getProgramCode`,
      {
        lectureName: lecture,
        fileName: `example${fileName.split('-')[0].slice(-1)}.py`,
      },
      result => {
        const subgoals = getSubgoals(`example${fileName.split('-')[0].slice(-1)}.py`).sort((a, b) => {
          const bMin = min(b.group) ?? 0
          const aMin = min(a.group) ?? 0
          return aMin === bMin ? a.group.length - b.group.length : bMin - aMin
        })

        const lines = result.code.split('\n')
        subgoals.forEach(subgoal => {
          const firstLine = min(subgoal.group) ?? 0
          const indentation = lines[firstLine].split('\t').length - 1
          lines.splice(firstLine, 0, `${repeat('\t', indentation)}# ${subgoal.label}`)
        })

        this.setState({
          codeExample: lines.join('\n'),
        })
      },
      error => window.alert(error.message)
    )

    window.addEventListener('beforeunload', onBeforeUnload)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', onBeforeUnload)
  }

  onCodeChange = (code: string) => {
    this.setState({
      code,
    })
  }

  run = () => {
    if (this.state.code.trim().length <= 0) {
      return
    }

    this.setState({
      isRunning: true,
      programOutput: getString('practice_terminal_running'),
      outputCorrect: null,
    })

    Post<PostPythonCodeParams, PostPythonCodeResults>(
      `${SERVER_ADDRESS}/postPythonCode`,
      {
        code: this.state.code,
        lectureName: this.props.match.params.lecture,
        fileName: this.props.match.params.fileName,
      },
      result => {
        this.setState({
          isRunning: false,
          programOutput: result.output,
          outputCorrect: result.correct,
        })
      },
      error => {
        console.error(error)
        this.setState({
          isRunning: false,
          programOutput: 'program crashed.',
          outputCorrect: false,
        })
      }
    )
  }

  submit = () => {
    this.setState({
      isSubmitting: true,
    })
    Post<PostPracticeCodeParams, PostPracticeCodeResults>(
      `${SERVER_ADDRESS}/postPracticeCode`,
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

  render() {
    return (
      <div>
        <Header />
        <InstructionTask
          instruction={
            <TaskContainer
              instruction={
                <div>
                  <h1>{`${getString('practice_title')} ${getPracticeNumber()}`}</h1>
                  <div>{getString('practice_instruction')}</div>
                  <ProblemContainer problem={this.state.problem} />
                </div>
              }
              task={
                <TaskWrapper>
                  <TaskSubTitle>{getString('practice_code_example')}</TaskSubTitle>
                  <CodeMirror key={this.state.codeExample} code={this.state.codeExample} />
                  {this.state.outputCorrect !== null ? (
                    <Result correct={this.state.outputCorrect}>
                      {this.state.outputCorrect
                        ? getString('practice_result_correct')
                        : getString('practice_result_incorrect')}
                    </Result>
                  ) : null}
                  <OutputTerminal output={this.state.programOutput} />
                </TaskWrapper>
              }
              footer={
                <ProgramRunner
                  onClickRun={this.run}
                  onSubmit={this.submit}
                  isRunning={this.state.isRunning}
                  isSubmitting={this.state.isSubmitting}
                />
              }
            />
          }
          task={<CodeEditor code={this.state.code} onCodeChange={this.onCodeChange} />}
        />
      </div>
    )
  }
}

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const TaskSubTitle = styled.div`
  margin: 5px;
  margin-left: 10px;
  color: ${Color.Gray85};
  font-size: 12px;
`

const Result = styled.div<{ correct: boolean }>`
  ${({ correct }) => css`
    color: ${correct ? Color.Green40 : Color.Error20};
    margin: 10px;
    font-size: 24px;
  `}
`

function onBeforeUnload(event: BeforeUnloadEvent) {
  event.returnValue = getString('practice_alert_back')
  return getString('practice_alert_back')
}

export default Practice
