import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { CodeEditor } from '../components/CodeEditor'
import { CodeViewer } from '../components/CodeViewer'
import { HierarchyVisualizer } from '../components/HierarchyVisualizer'
import { InstructionBox } from '../components/InstructionBox'
import { InstructionContainer } from '../components/InstructionContainer'
import { OutputTerminal } from '../components/OutputTerminal'
import { Page } from '../components/Page'
import { ProgramRunner } from '../components/ProgramRunner'
import { SplitView } from '../components/SplitView'
import { SubgoalContainer } from '../components/SubgoalContainer'
import { useConfirmBeforeLeave } from '../hooks/useConfirmBeforeLeave'
import { useExperiment } from '../hooks/useExperiment'
import { useJudgeCode } from '../hooks/useJudgeCode'
import { useMyCode } from '../hooks/useMyCode'
import { useMySubgoals } from '../hooks/useMySubgoals'
import { useSubmitCode } from '../hooks/useSubmitCode'
import { useSuggestionBySubgoals } from '../hooks/useSuggestionBySubgoals'
import { CodeType } from '../protocol/Common'
import { Color, SUBMIT_BUTTON_HEIGHT } from '../shared/Common'
import { HEADER_HEIGHT } from '../shared/Constants'
import { getString } from '../shared/Localization'

type MatchParams = {
  category: string
  problemId: string
}

export function Explore() {
  const { category, problemId } = useParams<MatchParams>()
  const [code, setCode] = useState('')
  const [mode, setMode] = useState<CodeType>('python')
  const { isRunning, run, judge, judgeResult, outputCorrect, programOutput } = useJudgeCode(
    code,
    category,
    problemId,
    mode
  )
  const { id } = useExperiment()
  const subgoals = useMySubgoals(category, problemId, id)
  const { code: myCode } = useMyCode(category, problemId, id)
  const [canProceed, setCanProceed] = useState(false)
  const { submit, isSubmitting } = useSubmitCode(category, problemId, code, mode)
  const { suggestions } = useSuggestionBySubgoals(category, problemId, subgoals)

  useConfirmBeforeLeave()

  useEffect(() => {
    setCode(myCode)
  }, [myCode])

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
            <Title>효율적인 풀이 찾기</Title>
            {getString('practice_instruction')}
          </InstructionBox>
          <InstructionBox>
            <CodeContainer>
              <HierarchyVisualizer subgoals={subgoals} lineHeight={20} />
              <CodeViewer code={myCode} lineHeight={20} />
            </CodeContainer>
          </InstructionBox>
          <SubgoalContainer
            subgoals={subgoals}
            selectedSubgoal={null}
            canAddSubgoals={false}
            suggestions={suggestions}
          />
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

const CodeContainer = styled.div`
  display: grid;
  grid-template-columns: 36px 1fr;
  background: ${Color.Gray00};
  margin-bottom: 8px;
  overflow: auto;
`
