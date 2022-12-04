import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useHierarchyVisualier } from '../hooks/useHierarchyVisualizer'
import { useVote } from '../hooks/useVote'
import { VotingItem } from '../protocol/GetVotingList'
import { Color } from '../shared/Common'
import { CODE_LINE_HEIGHT } from '../shared/Constants'
import { getString } from '../shared/Localization'
import { InstructionTask } from '../templates/InstructionTask'
import { LinearLayout } from '../templates/LinearLayout'
import { CodeGrouper } from './CodeGrouper'
import { HierarchyVisualizer } from './HierarchyVisualizer'
import MultipleChoice from './MultipleChoice'
import StageNavigator from './StageNavigator/StageNavigator'
import { InstructionContainer } from './TaskContainer'

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
        <InstructionTask
          instruction={
            <InstructionContainer
              instruction={<div>{getString(`tutorial_vote_practice${practiceNum}_instruction`)}</div>}
              task={
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
              }
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
            />
          }
          task={
            <LinearLayout ratios={[`${visualizerWidth}px`, '1fr']}>
              <HierarchyVisualizer subgoals={subgoalNodes} lineHeight={CODE_LINE_HEIGHT - 16} />
              <CodeGrouper code={code} checkBoxAvailability={checkBoxAvailability} />
            </LinearLayout>
          }
          heightAuto
        />
      </Content>
    </div>
  )
}

const Title = styled.div`
  margin: 0;
  padding: 0;
  font-size: 24px;
  color: ${Color.Gray75};
  margin-top: 15px;
  margin-bottom: 10px;
`

const Content = styled.div`
  border: 1px solid ${Color.Gray15};
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
`
