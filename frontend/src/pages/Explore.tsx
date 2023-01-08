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
import { StageBar } from '../components/StageBar'
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
            <Title>하위 목표 학습</Title>
            <StageBar currentStageIndex={3} />
            <div>
              각 목표 당 효율화에 도움이 될 만한 알고리즘을 추천해보았습니다. 이를 참고하여 문제를 더 효율적으로 푸는
              코드로 수정해봅니다.
            </div>
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
            <OutputTerminal isRunning={isRunning} programOutput={programOutput} />
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
