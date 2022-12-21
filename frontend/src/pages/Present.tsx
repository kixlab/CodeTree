import styled from '@emotion/styled'
import React from 'react'
import { useParams } from 'react-router-dom'
import { CodeGrouper } from '../components/CodeGrouper'
import { HierarchyVisualizer } from '../components/HierarchyVisualizer'
import { InstructionContainer } from '../components/InstructionContainer'
import { Page } from '../components/Page'
import { SplitView } from '../components/SplitView'
import { SubgoalContainer } from '../components/SubgoalContainer'
import { ID_NOT_FOUND } from '../hooks/useExperiment'
import { useMyCode } from '../hooks/useMyCode'
import { useMySubgoals } from '../hooks/useMySubgoals'

type MatchParams = {
  category: string
  problemId: string
  participantId: string
}

export function Present() {
  const { category, problemId, participantId } = useParams<MatchParams>()
  const code = useMyCode(category, problemId, participantId ?? ID_NOT_FOUND)
  const subgoals = useMySubgoals(category, problemId, participantId ?? ID_NOT_FOUND)

  return (
    <Page>
      <SplitView initialWidths={[3, 6]}>
        <InstructionContainer>
          <SubgoalContainer subgoals={subgoals} selectedSubgoal={null} />
        </InstructionContainer>

        <TaskContainer>
          <HierarchyVisualizer subgoals={subgoals} />
          <CodeGrouper code={code} />
        </TaskContainer>
      </SplitView>
    </Page>
  )
}

const TaskContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 41px 1fr;
`
