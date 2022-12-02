import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CodeGrouper } from '../components/CodeGrouper'
import { Page } from '../components/Page'
import ProblemContainer from '../components/ProblemContainer'
import { TreePresenter } from '../components/SubgoalTreePresenter/TreePresenter'
import { TaskContainer } from '../components/TaskContainer'
import { useCode } from '../hooks/useCode'
import { useHighlightCodeSegment } from '../hooks/useHighlightCodeSegment'
import { useProblem } from '../hooks/useProblem'
import { useSubgoalTree } from '../hooks/useSubgoalTree'
import { getString } from '../shared/Localization'
import { getExampleNumber } from '../shared/Utils'
import { InstructionTask } from '../templates/InstructionTask'

type MatchParams = {
  lecture: string
  fileName: string
}

export default function Present() {
  const { lecture, fileName } = useParams<MatchParams>()
  const code = useCode(lecture, fileName)
  const problem = useProblem(lecture, fileName)
  const subgoalTree = useSubgoalTree(lecture, fileName)
  const { highlightedLines, onClickGoal, checkBoxAvailability } = useHighlightCodeSegment(subgoalTree.group.length)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = useCallback(() => {
    setIsSubmitting(true)
  }, [])

  return (
    <Page>
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
    </Page>
  )
}
