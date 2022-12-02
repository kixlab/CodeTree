import styled from '@emotion/styled'
import React from 'react'
import { practice1, practice2, practice3 } from '../../data/SubgoalTutorialExamples'
import { CheckBoxAvailability, SubgoalNode } from '../../pages/Label'
import { Color, SUBMIT_BUTTON_HEIGHT } from '../../shared/Common'
import { getString } from '../../shared/Localization'
import { InstructionTask } from '../../templates/InstructionTask'
import { LinearLayout } from '../../templates/LinearLayout'
import { CodeGrouper } from '../CodeGrouper'
import { HierarchyVisualizer } from '../HierarchyVisualizer'
import { SubgoalContainer } from '../SubgoalContainer'
import { TaskContainer } from '../TaskContainer'
import './TutorialContent.scss'

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

function TutorialContent(props: Props) {
  return (
    <div>
      <div className="tutorial-container">
        <div className="row">
          <div className="text-container">
            <h1 className="tutorial-title">{getString('tutorial_title')}</h1>
            <p className="tutorial-text">{getString('tutorial_introduction')}</p>
          </div>
        </div>
        <div className="row">
          <div className="text-container">
            <h1 className="tutorial-title">{getString('tutorial_learn_subgoal')}</h1>
            <p className="tutorial-text">{getString('tutorial_subgoal_explanation1')}</p>
            <p className="tutorial-text">{getString('tutorial_subgoal_explanation2')}</p>
            <p className="tutorial-text">{getString('tutorial_subgoal_explanation3')}</p>
          </div>
          <div className="figure-container">
            <div className="figure">
              <img src="/assets/tutorial-figure (ko).png" alt="An examplary subgoal labels for a math solution." />
            </div>
          </div>
        </div>
        <div className="row">
          <h1 className="tutorial-title">
            {`${getString('tutorial_practice_title')} 1${getString('tutorial_practice1_goal')}`}
          </h1>
          <PracticeContainer>
            <InstructionTask
              instruction={
                <TaskContainer
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
                    <CheckAnswer type="submit" className="submit" onClick={props.firstCheckAnswer}>
                      {getString('tutorial_check_answer')}
                    </CheckAnswer>
                  }
                />
              }
              task={
                <LinearLayout ratios={['29px', '1fr']}>
                  <HierarchyVisualizer subgoals={props.firstSubgoals} />
                  <CodeGrouper
                    code={practice1}
                    checkBoxAvailability={props.firstCheckBoxAvailability}
                    onClickLine={props.firstClickCheckBox}
                    selectable
                  />
                </LinearLayout>
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
        </div>
        <div className="row">
          <h1 className="tutorial-title">
            {`${getString('tutorial_practice_title')} 2${getString('tutorial_practice2_goal')}`}
          </h1>
          <PracticeContainer>
            <InstructionTask
              instruction={
                <TaskContainer
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
                    <CheckAnswer type="submit" className="submit" onClick={props.secondCheckAnswer}>
                      {getString('tutorial_check_answer')}
                    </CheckAnswer>
                  }
                />
              }
              task={
                <LinearLayout ratios={['29px', '1fr']}>
                  <HierarchyVisualizer subgoals={props.secondSubgoals} />
                  <CodeGrouper code={practice2} checkBoxAvailability={props.secondCheckBoxAvailability} />
                </LinearLayout>
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
        </div>
        <div className="row">
          <h1 className="tutorial-title">
            {`${getString('tutorial_practice_title')} 3${getString('tutorial_practice3_goal')}`}
          </h1>
          <PracticeContainer>
            <InstructionTask
              instruction={
                <TaskContainer
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
                    <CheckAnswer type="submit" className="submit" onClick={props.thirdCheckAnswer}>
                      {getString('tutorial_check_answer')}
                    </CheckAnswer>
                  }
                />
              }
              task={
                <LinearLayout ratios={['29px', '1fr']}>
                  <HierarchyVisualizer subgoals={props.thirdSubgoals} />
                  <CodeGrouper
                    code={practice3}
                    checkBoxAvailability={props.thirdCheckBoxAvailability}
                    onClickLine={props.clickCheckBox3}
                    selectable
                  />
                </LinearLayout>
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
        </div>
        <div className="row">
          <div className="text-container">
            <h1 className="tutorial-title">{getString('tutorial_start_title')}</h1>
            <p className="tutorial-text">{getString('tutorial_start_instruction')}</p>
            <button type="button" className="start-button" onClick={props.onTaskStart}>
              {getString('tutorial_start')}
            </button>
          </div>
        </div>
      </div>
      {props.couldSkipTutorial && (
        <button type="button" className="tutorial-skip" onClick={props.skipTutorial}>
          {getString('tutorial_skip')}
        </button>
      )}
    </div>
  )
}

const CheckAnswer = styled.button`
  width: 100%;
  height: ${SUBMIT_BUTTON_HEIGHT}px;
  background: ${Color.Blue};
  border: none;
  color: ${Color.Gray00};
  font-size: 18px;
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

export default TutorialContent
