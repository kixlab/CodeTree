import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CodeGrouper } from '../components/CodeGrouper'
import { HierarchyVisualizer } from '../components/HierarchyVisualizer'
import { InstructionContainer } from '../components/InstructionContainer'
import MultipleChoice from '../components/MultipleChoice'
import { Page } from '../components/Page'
import { ProblemContainer } from '../components/ProblemContainer'
import { SplitView } from '../components/SplitView'
import { StageNavigator } from '../components/StageNavigator'
import { useExperiment } from '../hooks/useExperiment'
import { useHierarchyVisualier as useHierarchyVisualizer } from '../hooks/useHierarchyVisualizer'
import { useMyCode } from '../hooks/useMyCode'
import { useProblem } from '../hooks/useProblem'
import { useVote } from '../hooks/useVote'
import { useVoteSubmit } from '../hooks/useVoteSubmit'
import { useVotingList } from '../hooks/useVotingList'
import { getString } from '../shared/Localization'
import { getExampleNumber } from '../shared/Utils'

type MatchParams = {
  lecture: string
  fileName: string
}

export interface ChoiceState {
  id: number
  choice: number[]
  newOption: string | null
}

export default function Vote() {
  const { lecture, fileName } = useParams<MatchParams>()
  const { id, nextStage } = useExperiment()
  const code = useMyCode(lecture, fileName, id)
  const problem = useProblem(lecture, fileName)
  const { votingList } = useVotingList(lecture, fileName)
  const {
    canProceedToNext,
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
  const { isSubmitting, submit: submitVote } = useVoteSubmit(lecture, fileName)
  const { subgoalNodes, visualizerWidth } = useHierarchyVisualizer(votingList, currentStage)
  const navigate = useNavigate()

  const submit = useCallback(async () => {
    if (!canProceedToNext()) {
      return
    }
    await submitVote(votingList, choiceList)
    navigate(await nextStage())
  }, [canProceedToNext, choiceList, navigate, nextStage, submitVote, votingList])

  const showActionButton = currentStage === maxStage && showAnswer

  return (
    <Page>
      <SplitView initialWidths={[3, 6]}>
        <InstructionContainer
          footer={
            <StageNavigator
              currentStage={currentStage}
              maxStage={maxStage}
              isSubmitting={isSubmitting}
              submit={submit}
              nextButtonText={showAnswer ? getString('vote_next_button') : getString('vote_check_answer')}
              clickPrev={clickPrev}
              clickNext={clickNext}
              showActionButton={showActionButton}
            />
          }
        >
          <h1>{`${getString('vote_title')} ${getExampleNumber()}`}</h1>
          <div>{getString('vote_instruction')}</div>
          <ProblemContainer problem={problem} />
          <MultipleChoice
            options={votingList[currentStage]?.labels}
            checkedOption={choiceList[currentStage]?.choice ?? []}
            directInput={choiceList[currentStage]?.newOption ?? ''}
            onOptionClick={onOptionClick}
            onTextInputChange={onTextInputChange}
            answers={votingList[currentStage]?.answers}
            showAnswer={showAnswer}
            tip={
              showAnswer && choiceList[currentStage]?.choice.includes(-1)
                ? getString('vote_tutorial_tip_no_answer')
                : undefined
            }
          />
        </InstructionContainer>
        <CodeContainer hierarchyWidth={visualizerWidth}>
          <HierarchyVisualizer subgoals={subgoalNodes} />
          <CodeGrouper code={code} checkBoxAvailability={checkBoxAvailability} />
        </CodeContainer>
      </SplitView>
    </Page>
  )
}

const CodeContainer = styled.div<{ hierarchyWidth: number }>`
  ${({ hierarchyWidth }) => css`
    display: grid;
    height: 100%;
    grid-template-columns: ${hierarchyWidth}px 1fr;
  `}
`
