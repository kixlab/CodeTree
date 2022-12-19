import styled from '@emotion/styled'
import React from 'react'
import { useParams } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import { CodeViewer } from '../components/CodeViewer'
import { InstructionBox } from '../components/InstructionBox'
import { InstructionContainer } from '../components/InstructionContainer'
import { Page } from '../components/Page'
import { SplitView } from '../components/SplitView'
import { SubgoalContainer } from '../components/SubgoalContainer'
import { Title } from '../components/Title'
import { useConfirmBeforeLeave } from '../hooks/useConfirmBeforeLeave'
import { useGroupSubgoals } from '../hooks/useGroupSubgoals'
import { useMyCode } from '../hooks/useMyCode'
import { useMostSimilarCode } from '../hooks/useSimilarCode'
import { getString } from '../shared/Localization'

type MatchParams = {
  category: string
  problemId: string
}

export function Abstraction() {
  const { category, problemId } = useParams<MatchParams>()
  const code = useMyCode(category, problemId)
  const { mostSimilarCode } = useMostSimilarCode(category, problemId, code)
  const { addSubgoal, removeSubgoal, editSubgoal, selectSubgoal, subgoals, selectedSubgoal } = useGroupSubgoals(
    code.split('\n').length
  )

  useConfirmBeforeLeave()

  return (
    <Page>
      <SplitView initialWidths={[3, 6]}>
        <InstructionContainer
          footer={<ActionButton onClick={() => {}}>{getString('label_action_button')}</ActionButton>}
        >
          <InstructionBox>
            <Title>{getString('label_title')}</Title>
            <div>{getString('label_instruction')}</div>
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
        <SplitView>
          <CodeContainer>
            <Tag>나의 코드</Tag>
            <CodeViewer code={code} />
          </CodeContainer>
          <CodeContainer>
            <Tag>다른 풀이 코드</Tag>
            <CodeViewer code={mostSimilarCode} />
          </CodeContainer>
        </SplitView>
      </SplitView>
    </Page>
  )
}

const CodeContainer = styled.div`
  overflow: hidden;
`

const Tag = styled.div`
  padding: 4px;
`
