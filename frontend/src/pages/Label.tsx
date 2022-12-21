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
import { SubgoalContainer } from '../components/SubgoalContainer'
import { Title } from '../components/Title'
import { useConfirmBeforeLeave } from '../hooks/useConfirmBeforeLeave'
import { useExperiment } from '../hooks/useExperiment'
import { useGroupSubgoals } from '../hooks/useGroupSubgoals'
import { useLabelSubmit } from '../hooks/useLabelSubmit'
import { useMyCode } from '../hooks/useMyCode'
import { getString } from '../shared/Localization'

type MatchParams = {
  lecture: string
  fileName: string
}

export function Label() {
  const { lecture, fileName } = useParams<MatchParams>()
  const { id } = useExperiment()
  const { code } = useMyCode(lecture, fileName, id)
  const {
    addSubgoal,
    removeSubgoal,
    editSubgoal,
    selectSubgoal,
    clickCheckBox,
    subgoals,
    selectedSubgoal,
    checkBoxAvailability,
  } = useGroupSubgoals(code.split('\n').length)
  const { submit, isSubmitting } = useLabelSubmit(lecture, fileName)

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
            <Title>{getString('label_title')}</Title>
            <div>{getString('label_instruction')}</div>
            <br />
            <Warning>{getString('label_warning')}</Warning>
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
        <TaskContainer>
          <HierarchyVisualizer subgoals={subgoals} />
          <CodeGrouper code={code} checkBoxAvailability={checkBoxAvailability} selectable onClickLine={clickCheckBox} />
        </TaskContainer>
      </SplitView>
    </Page>
  )
}

const Warning = styled.b`
  font-size: 12px;
`

const TaskContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 41px 1fr;
`
