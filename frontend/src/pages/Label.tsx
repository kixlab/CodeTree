import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from '@emotion/styled'
import { CodeGrouper } from '../components/CodeGrouper'
import Header from '../components/Header/Header'
import { HierarchyVisualizer } from '../components/HierarchyVisualizer'
import ProblemContainer from '../components/ProblemContainer'
import { SubgoalContainer } from '../components/SubgoalContainer'
import TaskContainer from '../components/TaskContainer/TaskContainer'
import { useExplanation } from '../hooks/useExplanation'
import { useGroupSubgoals } from '../hooks/useGroupSubgoals'
import { useLabelSubmit } from '../hooks/useLabelSubmit'
import { useProblem } from '../hooks/useProblem'
import { getString } from '../shared/Localization'
import { getExampleNumber } from '../shared/Utils'
import { InstructionTask } from '../templates/InstructionTask'
import { LinearLayout } from '../templates/LinearLayout'
import { useMyCode } from '../hooks/useMyCode'
import { getId, ID_NOT_FOUND } from '../shared/ExperimentHelper'

interface MatchParams {
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

function Label(props: RouteComponentProps<MatchParams>) {
  const { lecture, fileName } = props.match.params
  const problem = useProblem(lecture, fileName)
  const code = useMyCode(lecture, fileName, getId() ?? ID_NOT_FOUND)
  const { explanations } = useExplanation(lecture, fileName)
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
  const { submit, isSubmitting } = useLabelSubmit(lecture, fileName, props.history)

  return (
    <div>
      <Header />
      <InstructionTask
        instruction={
          <TaskContainer
            instruction={
              <div>
                <h1>{`${getString('label_title')} ${getExampleNumber()}`}</h1>
                <div>{getString('label_instruction')}</div>
                <br />
                <Warning>{getString('label_warning')}</Warning>
                <ProblemContainer problem={problem} />
              </div>
            }
            task={
              <SubgoalContainer
                subgoals={subgoals}
                addSubgoal={addSubgoal}
                selectedSubgoal={selectedSubgoal}
                removeSubgoal={removeSubgoal}
                selectSubgoal={selectSubgoal}
                editSubgoal={editSubgoal}
              />
            }
            footer={
              <button
                type="submit"
                className="submit"
                onClick={submit(checkBoxAvailability, subgoals)}
                disabled={isSubmitting}
              >
                {getString('label_action_button')}
              </button>
            }
          />
        }
        task={
          <LinearLayout ratios={['41px', '1fr']}>
            <HierarchyVisualizer subgoals={subgoals} />
            <CodeGrouper
              code={code}
              explanations={explanations}
              checkBoxAvailability={checkBoxAvailability}
              selectable
              onClickLine={clickCheckBox}
            />
          </LinearLayout>
        }
      />
    </div>
  )
}

const Warning = styled.b`
  font-size: 12px;
`

export default Label
