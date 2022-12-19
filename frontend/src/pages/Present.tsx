import styled from '@emotion/styled'
import React from 'react'
import { useParams } from 'react-router-dom'
import { CodeGrouper } from '../components/CodeGrouper'
import { HierarchyVisualizer } from '../components/HierarchyVisualizer'
import { InstructionContainer } from '../components/InstructionContainer'
import { Page } from '../components/Page'
import { SubgoalContainer } from '../components/SubgoalContainer'
import { useMyCode } from '../hooks/useMyCode'
import { useMySubgoals } from '../hooks/useMySubgoals'
import { InstructionTask } from '../templates/InstructionTask'

type MatchParams = {
  category: string
  problemId: string
  participantId: string
}

export function Present() {
  const { category, problemId, participantId } = useParams<MatchParams>()
  const code = useMyCode(category, problemId, participantId)
  const subgoals = useMySubgoals(category, problemId, participantId)

  return (
    <Page>
      <InstructionTask
        instruction={
          <InstructionContainer>
            <SubgoalContainer subgoals={subgoals} selectedSubgoal={null} />
          </InstructionContainer>
        }
        task={
          <TaskContainer>
            <HierarchyVisualizer subgoals={subgoals} />
            <CodeGrouper code={code} />
          </TaskContainer>
        }
      />
    </Page>
  )
}

const TaskContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 41px 1fr;
`
