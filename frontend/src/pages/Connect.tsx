import styled from '@emotion/styled'
import React from 'react'
import { useParams } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { CodeGrouper } from '../components/CodeGrouper'
import { HierarchyVisualizer } from '../components/HierarchyVisualizer'
import { InstructionBox } from '../components/InstructionBox'
import { InstructionContainer } from '../components/InstructionContainer'
import { Page } from '../components/Page'
import { SplitView } from '../components/SplitView'
import { StageBar } from '../components/StageBar'
import { SubgoalContainer } from '../components/SubgoalContainer'
import { useConfirmBeforeLeave } from '../hooks/useConfirmBeforeLeave'
import { useExperiment } from '../hooks/useExperiment'
import { useGroupSubgoals } from '../hooks/useGroupSubgoals'
import { useLabelSubmit } from '../hooks/useLabelSubmit'
import { useMyCode } from '../hooks/useMyCode'
import { useMySubgoals } from '../hooks/useMySubgoals'
import { Color } from '../shared/Common'
import { getString } from '../shared/Localization'

type MatchParams = {
  category: string
  problemId: string
}

export function Connect() {
  const { category, problemId } = useParams<MatchParams>()
  const { id } = useExperiment()
  const { code } = useMyCode(category, problemId, id)
  const initialSubgoals = useMySubgoals(category, problemId, id)
  const { addSubgoal, selectSubgoal, clickCheckBox, subgoals, selectedSubgoal, checkBoxAvailability } =
    useGroupSubgoals(code.split('\n').length, initialSubgoals)
  const { submit, isSubmitting } = useLabelSubmit(category, problemId)

  useConfirmBeforeLeave()

  return (
    <Page>
      <SplitView initialWidths={[3, 6]}>
        <InstructionContainer
          footer={
            <ActionButton onClick={submit(subgoals)} disabled={isSubmitting}>
              {getString('label_action_button')}
            </ActionButton>
          }
        >
          <InstructionBox>
            <Title>하위 목표 학습</Title>
            <StageBar currentStageIndex={2} />
            나열한 목표들과 코드를 이어봅니다. 먼저 목표를 하나 클릭한 후, 오른쪽에서 해당되는 코드 줄을 클릭하면
            됩니다. 혹시 코드 형식을 바꿔야 한다면 이전 단계로 돌아가 수정하세요.
          </InstructionBox>
          <SubgoalContainer
            subgoals={subgoals}
            addSubgoal={addSubgoal}
            selectedSubgoal={selectedSubgoal}
            selectSubgoal={selectSubgoal}
            canAddSubgoals={false}
          />
        </InstructionContainer>
        <TaskContainer>
          <HierarchyVisualizer subgoals={subgoals} />
          <CodeGrouper code={code} checkBoxAvailability={checkBoxAvailability} selectable onClickLine={clickCheckBox} />
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
  display: grid;
  grid-template-columns: 41px 1fr;
`
