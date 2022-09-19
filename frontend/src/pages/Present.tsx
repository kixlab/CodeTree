import React, { useCallback, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../components/Header/Header'
import ProblemContainer from '../components/ProblemContainer'
import TaskContainer from '../components/TaskContainer/TaskContainer'
import { TreePresenter } from '../components/SubgoalTreePresenter/TreePresenter'
import { useCode } from '../hooks/useCode'
import { useProblem } from '../hooks/useProblem'
import { useSubgoalTree } from '../hooks/useSubgoalTree'
import { getString } from '../shared/Localization'
import { getExampleNumber } from '../shared/Utils'
import { InstructionTask } from '../templates/InstructionTask'
import { useHighlightCodeSegment } from '../hooks/useHighlightCodeSegment'
import { CodeGrouper } from '../components/CodeGrouper'

interface MatchParams {
  lecture: string
  fileName: string
}

function useSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = useCallback(() => {
    setIsSubmitting(true)
  }, [])

  return { submit, isSubmitting }
}

export default function Present(props: RouteComponentProps<MatchParams>) {
  const { lecture, fileName } = props.match.params
  const code = useCode(lecture, fileName)
  const problem = useProblem(lecture, fileName)
  const subgoalTree = useSubgoalTree(lecture, fileName)
  const { submit, isSubmitting } = useSubmit()
  const { highlightedLines, onClickGoal, checkBoxAvailability } = useHighlightCodeSegment(subgoalTree.group.length)

  return (
    <>
      <Header />
      <InstructionTask
        instruction={
          <TaskContainer
            instruction={
              <div>
                <h1>{`${getString('vote_title')} ${getExampleNumber()}`}</h1>
                <div>{getString('vote_instruction')}</div>
                <ProblemContainer problem={problem} />
              </div>
            }
            task={
              <TreePresenter
                goalTree={subgoalTree}
                highlightedGoal={highlightedLines.join(',')}
                onHoverGoal={onClickGoal}
              />
            }
            footer={
              <button type="submit" className="submit" onClick={submit} disabled={isSubmitting}>
                {getString('present_next')}
              </button>
            }
          />
        }
        task={<CodeGrouper code={code} checkBoxAvailability={checkBoxAvailability} />}
      />
    </>
  )
}
