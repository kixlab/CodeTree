import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CodeEditor from '../components/CodeEditor'
import { OutputTerminal } from '../components/OutputTerminal'
import { Page } from '../components/Page'
import ProblemContainer from '../components/ProblemContainer'
import { ProgramRunner } from '../components/ProgramRunner'
import { TaskContainer } from '../components/TaskContainer'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { useConfirmBeforeLeave } from '../hooks/useConfirmBeforeLeave'
import { useProblem } from '../hooks/useProblem'
import { useSkeletonCode } from '../hooks/useSkeletonCode'
import { PostPracticeAnswerParams, PostPracticeAnswerResults } from '../protocol/PostPracticeAnswer'
import { PostPracticeCodeParams, PostPracticeCodeResults } from '../protocol/PostPracticeCode'
import { Color } from '../shared/Common'
import { getId, ID_NOT_FOUND, nextStage } from '../shared/ExperimentHelper'
import { Post, Post2 } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'
import { InstructionTask } from '../templates/InstructionTask'

type MatchParams = {
  category: string
  problemId: string
}

export function Practice() {
  const { category, problemId } = useParams<MatchParams>()
  const problem = useProblem(category, problemId)
  const [code, setCode] = useState('')
  const [programOutput, setProgramOutput] = useState<null | PostPracticeAnswerResults['output']>(null)
  const [outputCorrect, setOutputCorrect] = useState<boolean | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isJudging, setIsJudging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mode, setMode] = useState<'python' | 'javascript' | 'cpp'>('python')
  const { skeletonCode } = useSkeletonCode(category, problemId, mode)
  const navigate = useNavigate()

  useConfirmBeforeLeave()

  const run = useCallback(async () => {
    if (code.trim().length <= 0 || !category || !problemId) {
      return
    }

    setIsRunning(true)
    setOutputCorrect(null)

    const { output, correctCases, testcases } = await Post2<PostPracticeAnswerParams, PostPracticeAnswerResults>(
      `${SERVER_ADDRESS}/postPracticeRun`,
      {
        code,
        category,
        problemId,
        codeType: mode,
        participantId: getId() ?? ID_NOT_FOUND,
      }
    )
    setIsRunning(false)
    setProgramOutput([...output])
    setOutputCorrect(correctCases === testcases)
  }, [category, code, mode, problemId])

  const judge = useCallback(async () => {
    if (code.trim().length <= 0 || !category || !problemId) {
      return
    }

    setIsJudging(true)
    setOutputCorrect(null)

    const { output, correctCases, testcases } = await Post2<PostPracticeAnswerParams, PostPracticeAnswerResults>(
      `${SERVER_ADDRESS}/postPracticeAnswer`,
      {
        code,
        category,
        problemId,
        codeType: mode,
        participantId: getId() ?? ID_NOT_FOUND,
      }
    )
    setIsJudging(false)
    setProgramOutput(output)
    setOutputCorrect(correctCases === testcases)
  }, [category, code, mode, problemId])

  const submit = useCallback(() => {
    if (code.trim().length <= 0 || !category || !problemId) {
      return
    }

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
        navigate(nextStage())
      },
      error => {
        window.alert(error.message)
        setIsSubmitting(false)
      }
    )
  }, [category, code, navigate, problemId])

  useEffect(() => {
    setCode(skeletonCode)
  }, [skeletonCode])

  return (
    <Page>
      <InstructionTask
        instruction={
          <TaskContainer
            instruction={
              <>
                <Title>{getString('practice_title')}</Title>
                {getString('practice_instruction')}
                <br />
                <ProblemContainer problem={problem} />
              </>
            }
            task={
              <TaskWrapper>
                {outputCorrect !== null ? (
                  <Result correct={outputCorrect}>
                    {outputCorrect ? getString('practice_result_correct') : getString('practice_result_incorrect')}
                  </Result>
                ) : null}
                <OutputTerminal>
                  {isRunning
                    ? getString('practice_terminal_running')
                    : programOutput === null
                    ? getString('practice_terminal_output')
                    : programOutput.map(({ input, output, expected }, i) => {
                        return (
                          <div key={i}>
                            <span>{input}</span>
                            <span>{output}</span>
                            <span>{expected}</span>
                          </div>
                        )
                      })}
                </OutputTerminal>
              </TaskWrapper>
            }
            footer={
              <ProgramRunner
                onClickRun={run}
                onJudging={judge}
                onSubmit={submit}
                isRunning={isRunning}
                isJudging={isJudging}
                isSubmitting={isSubmitting}
              />
            }
          />
        }
        task={<CodeEditor code={code} onCodeChange={setCode} mode={mode} onChangeMode={setMode} />}
      />
    </Page>
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

const Title = styled.div`
  font-size: 24px;
  color: ${Color.Gray75};
  font-weight: bold;
  margin-bottom: 12px;
`
