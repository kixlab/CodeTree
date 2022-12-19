import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { CodeEditor } from '../components/CodeEditor'
import { CodeViewer } from '../components/CodeViewer'
import { HierarchyVisualizer } from '../components/HierarchyVisualizer'
import { InstructionBox } from '../components/InstructionBox'
import { InstructionContainer } from '../components/InstructionContainer'
import { OutputTerminal } from '../components/OutputTerminal'
import { Page } from '../components/Page'
import { ProblemContainer } from '../components/ProblemContainer'
import { ProgramRunner } from '../components/ProgramRunner'
import { SplitView } from '../components/SplitView'
import { SubgoalContainer } from '../components/SubgoalContainer'
import { SERVER_ADDRESS } from '../environments/Configuration'
import { useConfirmBeforeLeave } from '../hooks/useConfirmBeforeLeave'
import { useJudgeCode } from '../hooks/useJudgeCode'
import { useMyCode } from '../hooks/useMyCode'
import { useMySubgoals } from '../hooks/useMySubgoals'
import { useProblem } from '../hooks/useProblem'
import { useSkeletonCode } from '../hooks/useSkeletonCode'
import { PostPracticeCodeParams, PostPracticeCodeResults } from '../protocol/PostPracticeCode'
import { Color, SUBMIT_BUTTON_HEIGHT } from '../shared/Common'
import { HEADER_HEIGHT } from '../shared/Constants'
import { getCurrentStage, getId, ID_NOT_FOUND, nextStage } from '../shared/ExperimentHelper'
import { Post } from '../shared/HttpRequest'
import { getString } from '../shared/Localization'

type MatchParams = {
  category: string
  problemId: string
}

export function Practice() {
  const { category, problemId } = useParams<MatchParams>()
  const [code, setCode] = useState('')
  const [mode, setMode] = useState<'python' | 'javascript' | 'cpp'>('python')
  const { isRunning, run, judge, judgeResult, outputCorrect, programOutput } = useJudgeCode(
    code,
    category,
    problemId,
    mode
  )
  const problem = useProblem(category, problemId)
  const { skeletonCode } = useSkeletonCode(category, problemId, mode)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSecondPractice = getCurrentStage() === 6
  const subgoals = useMySubgoals(category, isSecondPractice ? 'p3' : undefined)
  const prevCode = useMyCode(category, isSecondPractice ? 'p3' : undefined)
  const [canProceed, setCanProceed] = useState(false)

  const navigate = useNavigate()

  useConfirmBeforeLeave()

  const submit = useCallback(async () => {
    if (code.trim().length <= 0 || !category || !problemId) {
      return
    }

    setIsSubmitting(true)
    const res = await Post<PostPracticeCodeParams, PostPracticeCodeResults>(`${SERVER_ADDRESS}/postPracticeCode`, {
      participantId: getId() ?? ID_NOT_FOUND,
      lectureName: category,
      fileName: problemId,
      code,
    })
    setIsSubmitting(false)
    if (res) {
      navigate(nextStage())
    }
  }, [category, code, navigate, problemId])

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
            <Title>{getString('practice_title')}</Title>
            {getCurrentStage() === 4 ? getString('practice_instruction_easy') : getString('practice_instruction')}
            <br />
            <ProblemContainer problem={problem} />
          </InstructionBox>
          {isSecondPractice && (
            <>
              <Title>{getString('practice_subgoal_title')}</Title>
              <CodeContainer>
                <HierarchyVisualizer subgoals={subgoals} lineHeight={20} />
                <CodeViewer code={prevCode} lineHeight={20} />
              </CodeContainer>
              <SubgoalContainer subgoals={subgoals} selectedSubgoal={null} canAddSubgoals={false} />
            </>
          )}
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
