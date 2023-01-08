import styled from '@emotion/styled'
import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { CodeViewer } from '../components/CodeViewer'
import { InstructionBox } from '../components/InstructionBox'
import { InstructionContainer } from '../components/InstructionContainer'
import { Page } from '../components/Page'
import { SplitView } from '../components/SplitView'
import { StageBar } from '../components/StageBar'
import { SubgoalContainer } from '../components/SubgoalContainer'
import { Title } from '../components/Title'
import { useCodeToCompare } from '../hooks/useCodeToCompare'
import { useConfirmBeforeLeave } from '../hooks/useConfirmBeforeLeave'
import { useExperiment } from '../hooks/useExperiment'
import { useGroupSubgoals } from '../hooks/useGroupSubgoals'
import { useLabelSubmit } from '../hooks/useLabelSubmit'
import { useMyCode } from '../hooks/useMyCode'
import { getString } from '../shared/Localization'

type MatchParams = {
  category: string
  problemId: string
}

export function Abstraction() {
  const { category, problemId } = useParams<MatchParams>()
  const { id } = useExperiment()
  const { code } = useMyCode(category, problemId, id)
  const { codeToCompare } = useCodeToCompare(category, problemId, code)
  const { addSubgoal, removeSubgoal, editSubgoal, selectSubgoal, subgoals, selectedSubgoal } = useGroupSubgoals(
    code.split('\n').length
  )
  const { isSubmitting, submit } = useLabelSubmit(category, problemId, false)

  useConfirmBeforeLeave()

  const onSubmit = useCallback(async () => {
    await submit(subgoals)()
  }, [subgoals, submit])

  return (
    <Page>
      <SplitView initialWidths={[3, 6]}>
        <InstructionContainer
          footer={
            <ActionButton onClick={onSubmit} disabled={isSubmitting}>
              {getString('label_action_button')}
            </ActionButton>
          }
        >
          <InstructionBox>
            <Title>하위 목표 학습</Title>
            <StageBar currentStageIndex={0} />

            {getString('label_instruction')}
          </InstructionBox>
          <SubgoalContainer
            subgoals={subgoals}
            addSubgoal={addSubgoal}
            selectedSubgoal={selectedSubgoal}
            removeSubgoal={removeSubgoal}
            selectSubgoal={selectSubgoal}
            editSubgoal={editSubgoal}
          />
        </InstructionContainer>
        <SplitView>
          <div>
            <Tag>나의 풀이</Tag>
            <CodeViewer code={code} />
          </div>
          <div>
            <Tag>다른 풀이</Tag>
            <CodeViewer code={codeToCompare} />
          </div>
        </SplitView>
      </SplitView>
    </Page>
  )
}

const Tag = styled.div`
  padding: 4px;
`
