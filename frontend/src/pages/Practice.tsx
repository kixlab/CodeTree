import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import CodeEditor from '../components/CodeEditor'
import Header from '../components/Header/Header'
import OutputTerminal from '../components/OutputTerminal'
import ProblemContainer from '../components/ProblemContainer'
import ProgramRunner from '../components/ProgramRunner/ProgramRunner'
import TaskContainer from '../components/TaskContainer/TaskContainer'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { GetProblemMarkDownParams, GetProblemMarkDownResults } from '../protocol/GetProblemMarkDown'
import { GetProblemSkeletonParams, GetProblemSkeletonResults } from '../protocol/GetProblemSkeleton'
import { PostPracticeAnswerParams, PostPracticeAnswerResults } from '../protocol/PostPracticeAnswer'
import { PostPracticeCodeParams, PostPracticeCodeResults } from '../protocol/PostPracticeCode'
import { Color } from '../shared/Common'
import { getId, ID_NOT_FOUND, nextStage } from '../shared/ExperimentHelper'
import { Get, Post } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { InstructionTask } from '../templates/InstructionTask'

interface MatchParams {
  category: string
  problemId: string
}

function Practice(props: RouteComponentProps<MatchParams>) {
  const [problem, setProblem] = useState('')
  const [code, setCode] = useState('')
  const [programOutput, setProgramOutput] = useState(getString('practice_terminal_output'))
  const [outputCorrect, setOutputCorrect] = useState<boolean | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mode, setMode] = useState<'python' | 'javascript'>('python')

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
        codeType: mode,
        participantId: getId() ?? ID_NOT_FOUND,
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
  }, [category, code, mode, problemId])

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

  useEffect(() => {
    Get<GetProblemSkeletonParams, GetProblemSkeletonResults>(
      `${SERVER_ADDRESS}/getProblemSkeleton`,
      {
        category,
        problemId,
        codeType: mode,
      },
      result => {
        setCode(result.code)
      },
      error => window.alert(error.message)
    )
  }, [category, mode, problemId])

  return (
    <>
      <Header />
      <InstructionTask
        instruction={
          <TaskContainer
            instruction={<ProblemContainer problem={problem} />}
            task={
              <TaskWrapper>
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
        task={<CodeEditor code={code} onCodeChange={setCode} mode={mode} onChangeMode={setMode} />}
      />
    </>
  )
}

const TaskWrapper = styled.div`
  background: ${Color.Gray85};
  height: 100%;
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
