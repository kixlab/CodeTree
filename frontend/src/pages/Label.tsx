import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { CodeGrouper } from '../components/CodeGrouper'
import { HierarchyVisualizer } from '../components/HierarchyVisualizer'
import { Page } from '../components/Page'
import { SubgoalContainer } from '../components/SubgoalContainer'
import { InstructionContainer } from '../components/InstructionContainer'
import { useGroupSubgoals } from '../hooks/useGroupSubgoals'
import { useLabelSubmit } from '../hooks/useLabelSubmit'
import { useMyCode } from '../hooks/useMyCode'
import { Color } from '../shared/Common'
import { getString } from '../shared/Localization'
import { InstructionTask } from '../templates/InstructionTask'

type MatchParams = {
  lecture: string
  fileName: string
}

export interface SubgoalNode {
  id: number
  label: string
  group: number[]
  children: number[]
  parentId: number | null
  depth: number
  canAddSubgoal?: boolean
  color?: string
}

export enum CheckBoxAvailability {
  CHECKED = 'CHECKED',
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}

function useOnExitAlert() {
  useEffect(() => {
    function onBeforeUnload(event: BeforeUnloadEvent) {
      event.returnValue = getString('label_alert_back')
      return getString('label_alert_back')
    }

    window.addEventListener('beforeunload', onBeforeUnload)

    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [])
}

function Label() {
  const { lecture, fileName } = useParams<MatchParams>()
  const code = useMyCode(lecture, fileName)
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
  useOnExitAlert()
  const { submit, isSubmitting } = useLabelSubmit(lecture, fileName)

  return (
    <Page>
      <InstructionTask
        instruction={
          <InstructionContainer
            footer={
              <ActionButton onClick={submit(subgoals)} disabled={isSubmitting}>
                {getString('label_action_button')}
              </ActionButton>
            }
          >
            <Title>{getString('label_title')}</Title>
            <div>{getString('label_instruction')}</div>
            <br />
            <Warning>{getString('label_warning')}</Warning>
            <SubgoalContainer
              subgoals={subgoals}
              addSubgoal={addSubgoal}
              selectedSubgoal={selectedSubgoal}
              removeSubgoal={removeSubgoal}
              selectSubgoal={selectSubgoal}
              editSubgoal={editSubgoal}
            />
          </InstructionContainer>
        }
        task={
          <TaskContainer>
            <HierarchyVisualizer subgoals={subgoals} />
            <CodeGrouper
              code={code}
              checkBoxAvailability={checkBoxAvailability}
              selectable
              onClickLine={clickCheckBox}
            />
          </TaskContainer>
        }
      />
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

const Title = styled.div`
  padding: 0;
  font-size: 24px;
  color: ${Color.Gray85};
  margin: 15px 0 10px 0;
`

export default Label
