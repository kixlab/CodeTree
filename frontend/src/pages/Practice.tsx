import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { CodeEditor } from '../components/CodeEditor'
import { InstructionBox } from '../components/InstructionBox'
import { InstructionContainer } from '../components/InstructionContainer'
import { OutputTerminal } from '../components/OutputTerminal'
import { Page } from '../components/Page'
import { ProblemContainer } from '../components/ProblemContainer'
import { ProgramRunner } from '../components/ProgramRunner'
import { SplitView } from '../components/SplitView'
import { useConfirmBeforeLeave } from '../hooks/useConfirmBeforeLeave'
import { useJudgeCode } from '../hooks/useJudgeCode'
import { useProblem } from '../hooks/useProblem'
import { useSkeletonCode } from '../hooks/useSkeletonCode'
import { useSubmitCode } from '../hooks/useSubmitCode'
import { CodeType } from '../protocol/Common'
import { Color, SUBMIT_BUTTON_HEIGHT } from '../shared/Common'
import { HEADER_HEIGHT } from '../shared/Constants'
import { getString } from '../shared/Localization'

type MatchParams = {
  category: string
  problemId: string
}

export function Practice() {
  const { category, problemId } = useParams<MatchParams>()
  const [code, setCode] = useState('')
  const [mode, setMode] = useState<CodeType>('python')
  const { isRunning, run, judge, judgeResult, outputCorrect, programOutput } = useJudgeCode(
    code,
    category,
    problemId,
    mode
  )
  const problem = useProblem(category, problemId)
  const { skeletonCode } = useSkeletonCode(category, problemId, mode)
  const [canProceed, setCanProceed] = useState(false)
  const { submit, isSubmitting } = useSubmitCode(category, problemId, code, mode)

  useConfirmBeforeLeave()

  useEffect(() => {
    setCode(skeletonCode)
  }, [skeletonCode])

  useEffect(() => {
    if (isRunning && !canProceed) {
      setCanProceed(true)
    }
  }, [canProceed, isRunning])

  return (
    <Page>
      <SplitView initialWidths={[3, 6]}>
        <InstructionContainer
          footer={
            <ActionButton onClick={submit} disabled={isRunning || isSubmitting || !canProceed}>
              {getString('practice_action_button')}
            </ActionButton>
          }
        >
          <InstructionBox>
            <Title>전체 탐색으로 문제 풀기</Title>
            {getString('practice_instruction_easy')}
            <br />
            <ProblemContainer problem={problem} />
          </InstructionBox>
        </InstructionContainer>
        <TaskContainer>
          <CodeEditor code={code} onCodeChange={setCode} mode={mode} />
          <ProgramRunner
            onClickRun={run}
            onJudging={judge}
            isRunning={isRunning || isSubmitting}
            mode={mode}
            onChangeMode={setMode}
          />
          <TaskWrapper>
            {outputCorrect !== null && <Result correct={outputCorrect}>{judgeResult}</Result>}
            <OutputTerminal>
              {isRunning
                ? getString('practice_terminal_running')
                : programOutput === null
                ? getString('practice_terminal_output')
                : programOutput.map(({ input, output, expected, correct }, i) => {
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
                          <Output isCorrect={correct}>{output}</Output>
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
        </TaskContainer>
      </SplitView>
    </Page>
  )
}

const TaskWrapper = styled.div`
  background: ${Color.Gray85};
  height: 100%;
  overflow: auto;
`

const Result = styled.div<{ correct: boolean }>`
  ${({ correct }) => css`
    color: ${correct ? Color.Green20 : Color.Error20};
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

const Output = styled.div<{ isCorrect: boolean }>`
  ${({ isCorrect }) => css`
    display: inline-block;
    background-color: ${isCorrect ? Color.Green20 : Color.Error20};
    color: ${Color.Gray00};
  `}
`

const TaskContainer = styled.div`
  display: grid;
  grid-template-rows: 0.6fr ${SUBMIT_BUTTON_HEIGHT + 8}px 0.4fr;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  border-left: 1px solid ${Color.Gray15};
`
