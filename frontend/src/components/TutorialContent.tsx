import styled from '@emotion/styled'
import React from 'react'
import { PRACTICE_EXAMPLE1, PRACTICE_EXAMPLE2, PRACTICE_EXAMPLE3 } from '../data/SubgoalTutorialExamples'
import { CheckBoxAvailability, SubgoalNode } from '../pages/Label'
import { Color } from '../shared/Common'
import { getString } from '../shared/Localization'
import { InstructionTask } from '../templates/InstructionTask'
import { ActionButton } from './ActionButton'
import { CodeGrouper } from './CodeGrouper'
import { HierarchyVisualizer } from './HierarchyVisualizer'
import { SkipButton } from './SkipButton'
import { SubgoalContainer } from './SubgoalContainer'
import { InstructionContainer } from './TaskContainer'

interface Props {
  firstSubgoals: SubgoalNode[]
  firstSelectedSubgoal: number | null
  firstCheckBoxAvailability: CheckBoxAvailability[]
  showFirstAnswer: boolean
  secondSubgoals: SubgoalNode[]
  secondSelectedSubgoal: number | null
  secondCheckBoxAvailability: CheckBoxAvailability[]
  showSecondAnswer: boolean
  thirdSubgoals: SubgoalNode[]
  thirdSelectedSubgoal: number | null
  thirdCheckBoxAvailability: CheckBoxAvailability[]
  showThirdAnswer: boolean
  couldSkipTutorial: boolean
  firstSelectSubgoal: (id: number) => void
  firstClickCheckBox: (id: number, checked: boolean) => void
  firstCheckAnswer: () => void
  secondSelectSubgoal: (id: number) => void
  secondEditSubgoal: (id: number, label: string) => void
  secondCheckAnswer: () => void
  thirdSelectSubgoal: (id: number) => void
  thirdEditSubgoal: (id: number, label: string) => void
  thirdCheckAnswer: () => void
  thirdAddSubgoal: (id: number | null) => void
  clickCheckBox3: (id: number, checked: boolean) => void
  skipTutorial: () => void
  onTaskStart: () => void
}

export function TutorialContent(props: Props) {
  return (
    <div>
      <div className="tutorial-container">
        <Row>
          <IntroContainer>
            <div>
              <Title>{getString('tutorial_learn_subgoal')}</Title>
              <p className="tutorial-text">{getString('tutorial_subgoal_explanation1')}</p>
              <p className="tutorial-text">{getString('tutorial_subgoal_explanation2')}</p>
              <p className="tutorial-text">{getString('tutorial_subgoal_explanation3')}</p>
            </div>
            <FigureContainer>
              <img src="/assets/tutorial-figure (ko).png" alt="An examplary subgoal labels for a math solution." />
            </FigureContainer>
          </IntroContainer>
        </Row>
        <Row>
          <Title>{`${getString('tutorial_practice_title')} 1${getString('tutorial_practice1_goal')}`}</Title>
          <PracticeContainer>
            <InstructionTask
              instruction={
                <InstructionContainer
                  instruction={<div>{getString('tutorial_practice1_instruction')}</div>}
                  task={
                    <SubgoalContainer
                      subgoals={props.firstSubgoals}
                      selectedSubgoal={props.firstSelectedSubgoal ?? null}
                      removeSubgoal={null}
                      selectSubgoal={props.firstSelectSubgoal}
                      editSubgoal={null}
                    />
                  }
                  footer={
                    <ActionButton onClick={props.firstCheckAnswer}>{getString('tutorial_check_answer')}</ActionButton>
                  }
                />
              }
              task={
                <TaskContainer>
                  <HierarchyVisualizer subgoals={props.firstSubgoals} />
                  <CodeGrouper
                    code={PRACTICE_EXAMPLE1}
                    checkBoxAvailability={props.firstCheckBoxAvailability}
                    onClickLine={props.firstClickCheckBox}
                    selectable
                  />
                </TaskContainer>
              }
              heightAuto
            />
            <Answer>
              {props.showFirstAnswer ? (
                <AnswerImage src="/assets/practice1-solution (ko).png" alt="The answer for practice 1" />
              ) : (
                getString('tutorial_figure_hidden')
              )}
            </Answer>
          </PracticeContainer>
        </Row>
        <Row>
          <Title>{`${getString('tutorial_practice_title')} 2${getString('tutorial_practice2_goal')}`}</Title>
          <PracticeContainer>
            <InstructionTask
              instruction={
                <InstructionContainer
                  instruction={<div>{getString('tutorial_practice2_instruction')}</div>}
                  task={
                    <SubgoalContainer
                      subgoals={props.secondSubgoals}
                      selectedSubgoal={props.secondSelectedSubgoal ?? null}
                      removeSubgoal={null}
                      selectSubgoal={props.secondSelectSubgoal}
                      editSubgoal={props.secondEditSubgoal}
                    />
                  }
                  footer={
                    <ActionButton onClick={props.secondCheckAnswer}>{getString('tutorial_check_answer')}</ActionButton>
                  }
                />
              }
              task={
                <TaskContainer>
                  <HierarchyVisualizer subgoals={props.secondSubgoals} />
                  <CodeGrouper code={PRACTICE_EXAMPLE2} checkBoxAvailability={props.secondCheckBoxAvailability} />
                </TaskContainer>
              }
              heightAuto
            />
            <Answer>
              {props.showSecondAnswer ? (
                <AnswerImage src="/assets/practice2-solution (ko).png" alt="The answer for practice 2" />
              ) : (
                getString('tutorial_figure_hidden')
              )}
            </Answer>
          </PracticeContainer>
        </Row>
        <Row>
          <Title>{`${getString('tutorial_practice_title')} 3${getString('tutorial_practice3_goal')}`}</Title>
          <PracticeContainer>
            <InstructionTask
              instruction={
                <InstructionContainer
                  instruction={<div>{getString('tutorial_practice3_instruction')}</div>}
                  task={
                    <SubgoalContainer
                      subgoals={props.thirdSubgoals}
                      selectedSubgoal={props.thirdSelectedSubgoal ?? null}
                      removeSubgoal={null}
                      selectSubgoal={props.thirdSelectSubgoal}
                      editSubgoal={props.thirdEditSubgoal}
                      addSubgoal={props.thirdAddSubgoal}
                      canAddSubgoals={false}
                    />
                  }
                  footer={
                    <ActionButton onClick={props.thirdCheckAnswer}>{getString('tutorial_check_answer')}</ActionButton>
                  }
                />
              }
              task={
                <TaskContainer>
                  <HierarchyVisualizer subgoals={props.thirdSubgoals} />
                  <CodeGrouper
                    code={PRACTICE_EXAMPLE3}
                    checkBoxAvailability={props.thirdCheckBoxAvailability}
                    onClickLine={props.clickCheckBox3}
                    selectable
                  />
                </TaskContainer>
              }
              heightAuto
            />
            <Answer>
              {props.showThirdAnswer ? (
                <AnswerImage src="/assets/practice3-solution (ko).png" alt="The answer for practice 3" />
              ) : (
                getString('tutorial_figure_hidden')
              )}
            </Answer>
          </PracticeContainer>
        </Row>
        <Row>
          <Title>{getString('tutorial_start_title')}</Title>
          <p>{getString('tutorial_start_instruction')}</p>
          <ActionButton onClick={props.onTaskStart}>{getString('tutorial_start')}</ActionButton>
        </Row>
      </div>
      {props.couldSkipTutorial && <SkipButton onClick={props.skipTutorial}>{getString('tutorial_skip')}</SkipButton>}
    </div>
  )
}

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-items: stretch;
  padding-top: 10px;
  padding-bottom: 10px;

  &:first-of-type {
    padding-top: 25px;
  }

  &:last-of-type {
    padding-bottom: 60px;
  }
`

const IntroContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.6fr 0.4fr;
`

const PracticeContainer = styled.div`
  width: 100%;
  border: 1px solid ${Color.Gray15};
  display: grid;
  grid-template-columns: 0.6fr 0.4fr;
`

const Answer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-left: 1px solid ${Color.Gray15};
`

const AnswerImage = styled.img`
  width: 100%;
`

const Title = styled.div`
  padding: 0;
  font-size: 24px;
  color: ${Color.Gray85};
  margin: 15px 0 10px 0;
`

const TaskContainer = styled.div`
  display: grid;
  height: 100%;
  font-weight: bold;
  grid-template-columns: 29px 1fr;
`

const FigureContainer = styled.div`
  max-width: 500px;
  flex: 1;
  padding-top: 25px;
  display: flex;
  align-self: center;
  border: 1px solid ${Color.Gray15};
  margin: 10px;
  user-select: none;

  & > img {
    width: 100%;
    -webkit-user-drag: none;
  }
`
