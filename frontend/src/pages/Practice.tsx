import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CodeEditor from '../components/CodeEditor'
import { OutputTerminal } from '../components/OutputTerminal'
import { Page } from '../components/Page'
import ProblemContainer from '../components/ProblemContainer'
import { ProgramRunner } from '../components/ProgramRunner'
import { InstructionContainer } from '../components/TaskContainer'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { useConfirmBeforeLeave } from '../hooks/useConfirmBeforeLeave'
import { useProblem } from '../hooks/useProblem'
import { useSkeletonCode } from '../hooks/useSkeletonCode'
import { PostPracticeAnswerParams, PostPracticeAnswerResults } from '../protocol/PostPracticeAnswer'
import { PostPracticeCodeParams, PostPracticeCodeResults } from '../protocol/PostPracticeCode'
import { PostPracticeRunParams, PostPracticeRunResults } from '../protocol/PostPracticeRun'
import { Color } from '../shared/Common'
import { getCurrentStage, getId, ID_NOT_FOUND, nextStage } from '../shared/ExperimentHelper'
import { Post } from '../shared/HttpRequest'
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
  const [programOutput, setProgramOutput] = useState<null | PostPracticeRunResults['output']>(null)
  const [outputCorrect, setOutputCorrect] = useState<boolean | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [judgeResult, setJudgeResult] = useState<string>('')
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

    const res = await Post<PostPracticeRunParams, PostPracticeRunResults>(`${SERVER_ADDRESS}/postPracticeRun`, {
      code,
      category,
      problemId,
      codeType: mode,
      participantId: getId() ?? ID_NOT_FOUND,
    })
    if (res) {
      setProgramOutput([...res.output])
      setOutputCorrect(res.correctCases === res.testcases)
      setJudgeResult(`${res.correctCases} / ${res.testcases} ${getString('practice_result')}`)
    }
    setIsRunning(false)
  }, [category, code, mode, problemId])

  const judge = useCallback(async () => {
    if (code.trim().length <= 0 || !category || !problemId) {
      return
    }

    setIsRunning(true)
    setOutputCorrect(null)

    const res = await Post<PostPracticeAnswerParams, PostPracticeAnswerResults>(
      `${SERVER_ADDRESS}/postPracticeAnswer`,
      {
        code,
        category,
        problemId,
        codeType: mode,
        participantId: getId() ?? ID_NOT_FOUND,
      }
    )
    if (res) {
      setProgramOutput([])
      setOutputCorrect(res.correctCases === res.testcases)
      setJudgeResult(`${res.correctCases} / ${res.testcases} ${getString('practice_result')}`)
    }
    setIsRunning(false)
  }, [category, code, mode, problemId])

  const submit = useCallback(async () => {
    if (code.trim().length <= 0 || !category || !problemId) {
      return
    }

    setIsRunning(true)
    const res = await Post<PostPracticeCodeParams, PostPracticeCodeResults>(`${SERVER_ADDRESS}/postPracticeCode`, {
      participantId: getId() ?? ID_NOT_FOUND,
      lectureName: category,
      fileName: problemId,
      code,
    })
    setIsRunning(false)
    if (res) {
      navigate(nextStage())
    }
  }, [category, code, navigate, problemId])

  useEffect(() => {
    setCode(skeletonCode)
  }, [skeletonCode])

  return (
    <Page>
      <InstructionTask
        instruction={
          <InstructionContainer
            instruction={
              <>
                <Title>{getString('practice_title')}</Title>
                {getCurrentStage() === 4 ? getString('practice_instruction_easy') : getString('practice_instruction')}
                <br />
                <ProblemContainer problem={problem} />
              </>
            }
            task={
              <TaskWrapper>
                {outputCorrect !== null && <Result correct={outputCorrect}>{judgeResult}</Result>}
                <OutputTerminal>
                  {isRunning
                    ? getString('practice_terminal_running')
                    : programOutput === null
                    ? getString('practice_terminal_output')
                    : programOutput.map(({ input, output, expected }, i) => {
                        return (
                          <TestCase key={i}>
                            <div>
                              입력값:
                              <br />
                              {input}
                            </div>
                            <div>
                              출력값:
                              <br />
                              {output}
                            </div>
                            <div>
                              기대값:
                              <br />
                              {expected}
                            </div>
                          </TestCase>
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
                isJudging={isRunning}
                isSubmitting={isRunning}
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
    margin: 8px;
    font-size: 24px;
  `}
`

const Title = styled.div`
  font-size: 24px;
  color: ${Color.Gray75};
  font-weight: bold;
  margin-bottom: 12px;
`

const TestCase = styled.div`
  border: 1px solid ${Color.Gray60};
  padding: 4px;
  margin: 4px;
`
