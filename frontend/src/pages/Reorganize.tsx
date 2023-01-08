import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { CodeEditor } from '../components/CodeEditor'
import { InstructionBox } from '../components/InstructionBox'
import { InstructionContainer } from '../components/InstructionContainer'
import { Page } from '../components/Page'
import { SplitView } from '../components/SplitView'
import { StageBar } from '../components/StageBar'
import { SubgoalContainer } from '../components/SubgoalContainer'
import { useConfirmBeforeLeave } from '../hooks/useConfirmBeforeLeave'
import { useExperiment } from '../hooks/useExperiment'
import { useMyCode } from '../hooks/useMyCode'
import { useMySubgoals } from '../hooks/useMySubgoals'
import { useSubmitCode } from '../hooks/useSubmitCode'
import { Color } from '../shared/Common'
import { getString } from '../shared/Localization'

type MatchParams = {
  category: string
  problemId: string
}

export function Reorganize() {
  const { category, problemId } = useParams<MatchParams>()
  const { id } = useExperiment()
  const { code: myCode, codeType: mode } = useMyCode(category, problemId, id)
  const [code, setCode] = useState(myCode)
  const subgoals = useMySubgoals(category, problemId, id)
  const { submit, isSubmitting } = useSubmitCode(category, problemId, code, mode)

  useConfirmBeforeLeave()

  useEffect(() => {
    setCode(myCode)
  }, [myCode])

  return (
    <Page>
      <SplitView initialWidths={[3, 6]}>
        <InstructionContainer
          footer={
            <ActionButton onClick={submit} disabled={isSubmitting}>
              {getString('practice_action_button')}
            </ActionButton>
          }
        >
          <InstructionBox>
            <Title>하위 목표 학습</Title>
            <StageBar currentStageIndex={1} />
            다음 단계에선 앞서 나열한 목표들이 자신의 코드의 어느 부분에 해당하는지 이어 볼 것입니다. 잇기 쉽도록 먼저
            자신의 코드 형식을 목표에 맞춰 정리해보세요.
            <br />
          </InstructionBox>
          <SubgoalContainer subgoals={subgoals} selectedSubgoal={null} />
        </InstructionContainer>
        <TaskContainer>
          <CodeEditor code={code} onCodeChange={setCode} mode={mode} />
        </TaskContainer>
      </SplitView>
    </Page>
  )
}

const Title = styled.div`
  font-size: 24px;
  color: ${Color.Gray75};
  font-weight: bold;
  margin-bottom: 12px;
`

const TaskContainer = styled.div`
  border-left: 1px solid ${Color.Gray15};
  height: 100%;
`
