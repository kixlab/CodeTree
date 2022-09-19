import React, { useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { CodeGrouper } from '../components/CodeGrouper'
import Header from '../components/Header/Header'
import ProblemContainer from '../components/ProblemContainer'
import TaskContainer from '../components/TaskContainer/TaskContainer'
import { useCode } from '../hooks/useCode'
import { useExplanation } from '../hooks/useExplanation'
import { useProblem } from '../hooks/useProblem'
import { nextStage } from '../shared/ExperimentHelper'
import { getString } from '../shared/Localization'
import { getExampleNumber } from '../shared/Utils'
import { InstructionTask } from '../templates/InstructionTask'

interface MatchParams {
  lecture: string
  fileName: string
}

function WorkedExample(props: RouteComponentProps<MatchParams>) {
  const { lecture, fileName } = props.match.params

  const problem = useProblem(lecture, fileName)
  const code = useCode(lecture, fileName)
  const { explanations } = useExplanation(lecture, fileName)

  const submit = useCallback(() => {
    props.history.push(nextStage())
  }, [props.history])

  return (
    <div>
      <Header />
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
        task={<CodeGrouper code={code} explanations={explanations} />}
      />
    </div>
  )
}

export default WorkedExample
