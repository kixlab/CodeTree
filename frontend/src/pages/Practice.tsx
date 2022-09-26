import { css } from '@emotion/react'
import styled from '@emotion/styled'
import min from 'lodash/min'
import repeat from 'lodash/repeat'
import React, { useCallback, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import CodeEditor from '../components/CodeEditor/CodeEditor'
import { CodeMirror } from '../components/CodeMirror'
import Header from '../components/Header/Header'
import OutputTerminal from '../components/OutputTerminal'
import ProblemContainer from '../components/ProblemContainer'
import ProgramRunner from '../components/ProgramRunner/ProgramRunner'
import TaskContainer from '../components/TaskContainer/TaskContainer'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetProblemMarkDownParams, GetProblemMarkDownResults } from '../protocol/GetProblemMarkDown'
import { GetProgramCodeParams, GetProgramCodeResults } from '../protocol/GetProgramCode'
import { PostPracticeAnswerParams, PostPracticeAnswerResults } from '../protocol/PostPracticeAnswer'
import { PostPracticeCodeParams, PostPracticeCodeResults } from '../protocol/PostPracticeCode'
import { Color } from '../shared/Common'
import { getId, ID_NOT_FOUND, nextStage } from '../shared/ExperimentHelper'
import { Get, Post } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { getSubgoals } from '../shared/Utils'
import { InstructionTask } from '../templates/InstructionTask'

interface MatchParams {
  category: string
  problemId: string
}

function Practice(props: RouteComponentProps<MatchParams>) {
  const [problem, setProblem] = useState('')
  const [code, setCode] = useState('')
  const [codeExample, setCodeExample] = useState('')
  const [programOutput, setProgramOutput] = useState(getString('practice_terminal_output'))
  const [outputCorrect, setOutputCorrect] = useState<boolean | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { category, problemId } = props.match.params

  useEffect(() => {
    Get<GetProblemMarkDownParams, GetProblemMarkDownResults>(
      `${SERVER_ADDRESS}/getProblemMarkDown`,
      {
        lectureName: category,
        fileName: problemId,
      },
      result => {
        setProblem(result.problem)
      },
      error => window.alert(error.message)
    )
    Get<GetProgramCodeParams, GetProgramCodeResults>(
      `${SERVER_ADDRESS}/getProgramCode`,
      {
        lectureName: category,
        fileName: problemId,
      },
      result => {
        const subgoals = getSubgoals(problemId).sort((a, b) => {
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

        setCodeExample(lines.join('\n'))
      },
      error => window.alert(error.message)
    )

    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [category, problemId])

  const run = useCallback(() => {
    if (code.trim().length <= 0) {
      return
    }

    setIsRunning(true)
    setProgramOutput(getString('practice_terminal_running'))
    setOutputCorrect(null)

    Post<PostPracticeAnswerParams, PostPracticeAnswerResults>(
      `${SERVER_ADDRESS}/postPracticeAnswer`,
      {
        code,
        category,
        problemId,
        codeType: 'python3',
      },
      result => {
        setIsRunning(false)
        setProgramOutput(result.output)
        setOutputCorrect(result.correct)
      },
      error => {
        console.error(error)
        setIsRunning(false)
        setProgramOutput('program crashed.')
        setOutputCorrect(false)
      }
    )
  }, [category, code, problemId])

  const submit = useCallback(() => {
    setIsSubmitting(true)
    Post<PostPracticeCodeParams, PostPracticeCodeResults>(
      `${SERVER_ADDRESS}/postPracticeCode`,
      {
        participantId: getId() ?? ID_NOT_FOUND,
        lectureName: category,
        fileName: problemId,
        code,
      },
      () => {
        setIsSubmitting(false)
        props.history.push(nextStage())
      },
      error => {
        window.alert(error.message)
        setIsSubmitting(false)
      }
    )
  }, [category, code, problemId, props.history])

  return (
    <div>
      <Header />
      <InstructionTask
        instruction={
          <TaskContainer
            instruction={<ProblemContainer problem={problem} />}
            task={
              <TaskWrapper>
                <TaskSubTitle>{getString('practice_code_example')}</TaskSubTitle>
                <CodeMirror key={codeExample} code={codeExample} />
                {outputCorrect !== null ? (
                  <Result correct={outputCorrect}>
                    {outputCorrect ? getString('practice_result_correct') : getString('practice_result_incorrect')}
                  </Result>
                ) : null}
                <OutputTerminal output={programOutput} />
              </TaskWrapper>
            }
            footer={
              <ProgramRunner onClickRun={run} onSubmit={submit} isRunning={isRunning} isSubmitting={isSubmitting} />
            }
          />
        }
        task={<CodeEditor code={code} onCodeChange={setCode} />}
      />
    </div>
  )
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
