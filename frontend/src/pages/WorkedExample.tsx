import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CodeGrouper } from '../components/CodeGrouper'
import { Page } from '../components/Page'
import ProblemContainer from '../components/ProblemContainer'
import { TaskContainer } from '../components/TaskContainer'
import { useCode } from '../hooks/useCode'
import { useProblem } from '../hooks/useProblem'
import { nextStage } from '../shared/ExperimentHelper'
import { getString } from '../shared/Localization'
import { getExampleNumber } from '../shared/Utils'
import { InstructionTask } from '../templates/InstructionTask'

type MatchParams = {
  lecture: string
  fileName: string
}

function WorkedExample() {
  const { lecture, fileName } = useParams<MatchParams>()
  const problem = useProblem(lecture, fileName)
  const code = useCode(lecture, fileName)
  const navigate = useNavigate()

  const submit = useCallback(() => {
    navigate(nextStage())
  }, [navigate])

  return (
    <Page>
      <InstructionTask
        instruction={
          <TaskContainer
            instruction={
              <div>
                <h1>{`${getString('example_title')} ${getExampleNumber()}`}</h1>
                <div>{getString('example_instruction')}</div>
                <ProblemContainer problem={problem} />
              </div>
            }
            task={<div />}
            footer={
              <button type="submit" className="submit" onClick={submit}>
                {getString('example_action_button')}
              </button>
            }
          />
        }
        task={<CodeGrouper code={code} />}
      />
    </Page>
  )
}

export default WorkedExample
