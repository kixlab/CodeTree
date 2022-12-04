import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CodeGrouper } from '../components/CodeGrouper'
import { Page } from '../components/Page'
import { PersonalizedSubgoalTreePresenter } from '../components/PersonalizedSubgoalTreePresenter'
import ProblemContainer from '../components/ProblemContainer'
import { InstructionContainer } from '../components/TaskContainer'
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

function useSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = useCallback(() => {
    setIsSubmitting(true)
  }, [])

  return { submit, isSubmitting }
}

export function PersonalizedPresent() {
  const { lecture, fileName } = useParams<MatchParams>()
  const code = useCode(lecture, fileName)
  const problem = useProblem(lecture, fileName)
  const subgoalTree = useSubgoalTree(lecture, fileName)
  const { submit, isSubmitting } = useSubmit()
  const { highlightedLines, onClickGoal, checkBoxAvailability } = useHighlightCodeSegment(subgoalTree.group.length)

  return (
    <Page>
      <InstructionTask
        instruction={
          <InstructionContainer
            instruction={
              <div>
                <h1>{`${getString('vote_title')} ${getExampleNumber()}`}</h1>
                <div>{getString('vote_instruction')}</div>
                <ProblemContainer problem={problem} />
              </div>
            }
            task={
              <PersonalizedSubgoalTreePresenter
                goalTree={subgoalTree}
                highlightedGoal={highlightedLines.join(',')}
                onHoverGoal={onClickGoal}
              />
            }
            footer={
              <button className="submit" type="submit" onClick={submit} disabled={isSubmitting}>
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
