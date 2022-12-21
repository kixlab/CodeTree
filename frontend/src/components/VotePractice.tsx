import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useHierarchyVisualier } from '../hooks/useHierarchyVisualizer'
import { useVote } from '../hooks/useVote'
import { VotingItem } from '../protocol/Common'
import { Color } from '../shared/Common'
import { CODE_LINE_HEIGHT } from '../shared/Constants'
import { getString } from '../shared/Localization'
import { CodeGrouper } from './CodeGrouper'
import { HierarchyVisualizer } from './HierarchyVisualizer'
import { InstructionBox } from './InstructionBox'
import { InstructionContainer } from './InstructionContainer'
import MultipleChoice from './MultipleChoice'
import { SplitView } from './SplitView'
import { StageNavigator } from './StageNavigator'
import { Title } from './Title'

interface Props {
  practiceNum: number
  code: string
  votingList: VotingItem[]
  tips: string[]
  checkAnswer: () => void
}

export function VotePractice({ practiceNum, code, votingList, checkAnswer, tips }: Props) {
  const {
    maxStage,
    choiceList,
    checkBoxAvailability,
    currentStage,
    clickNext,
    clickPrev,
    onOptionClick,
    onTextInputChange,
    showAnswer,
  } = useVote(code, votingList)
  const { subgoalNodes, visualizerWidth } = useHierarchyVisualier(votingList, currentStage)

  const showActionButton = currentStage === maxStage && showAnswer ? null : false

  useEffect(() => {
    if (currentStage === maxStage && showAnswer) {
      checkAnswer()
    }
  }, [maxStage, currentStage, showAnswer, checkAnswer])

  return (
    <div>
      <Title>
        {`${getString('tutorial_practice_title')} ${practiceNum} ${getString(
          `vote_tutorial_practice${practiceNum}_goal`
        )}`}
      </Title>
      <Content>
        <SplitView initialWidths={[3, 6]}>
          <InstructionContainer
            footer={
              <StageNavigator
                currentStage={currentStage}
                maxStage={maxStage}
                isSubmitting={false}
                nextButtonText={showAnswer ? getString('vote_next_button') : getString('vote_check_answer')}
                showActionButton={showActionButton}
                clickPrev={clickPrev}
                clickNext={clickNext}
              />
            }
          >
            <InstructionBox>
              {getString(`tutorial_vote_practice${practiceNum}_instruction`)}
              <MultipleChoice
                options={votingList[currentStage]?.labels}
                checkedOption={choiceList[currentStage]?.choice}
                directInput={choiceList[currentStage]?.newOption ?? ''}
                answers={votingList[currentStage]?.answers}
                onOptionClick={onOptionClick}
                onTextInputChange={onTextInputChange}
                showAnswer={showAnswer}
                tip={showAnswer ? tips[currentStage] : undefined}
              />
            </InstructionBox>
          </InstructionContainer>
          <CodeContainer hierarchyWidth={visualizerWidth}>
            <HierarchyVisualizer subgoals={subgoalNodes} lineHeight={CODE_LINE_HEIGHT - 16} />
            <CodeGrouper code={code} checkBoxAvailability={checkBoxAvailability} />
          </CodeContainer>
        </SplitView>
      </Content>
    </div>
  )
}

const Content = styled.div`
  border: 1px solid ${Color.Gray15};
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
`

const CodeContainer = styled.div<{ hierarchyWidth: number }>`
  ${({ hierarchyWidth }) => css`
    display: grid;
    height: 100%;
    grid-template-columns: ${hierarchyWidth}px 1fr;
  `}
`
