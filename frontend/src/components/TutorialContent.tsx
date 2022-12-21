import styled from '@emotion/styled'
import React from 'react'
import { PRACTICE_EXAMPLE1, PRACTICE_EXAMPLE2, PRACTICE_EXAMPLE3 } from '../data/SubgoalTutorialExamples'
import { Color } from '../shared/Common'
import { getString } from '../shared/Localization'
import { CheckBoxAvailability } from '../types/checkboxAvailability'
import { SubgoalNode } from '../types/subgoalNode'
import { ActionButton } from './ActionButton'
import { CodeGrouper } from './CodeGrouper'
import { HierarchyVisualizer } from './HierarchyVisualizer'
import { InstructionContainer } from './InstructionContainer'
import { SkipButton } from './SkipButton'
import { SplitView } from './SplitView'
import { SubgoalContainer } from './SubgoalContainer'
import { Title } from './Title'

interface Props {
  firstSubgoals: SubgoalNode[]
  firstSelectedSubgoal: number | null
  firstCheckBoxAvailability: CheckBoxAvailability[]
  secondSubgoals: SubgoalNode[]
  secondSelectedSubgoal: number | null
  secondCheckBoxAvailability: CheckBoxAvailability[]
  thirdSubgoals: SubgoalNode[]
  thirdSelectedSubgoal: number | null
  thirdCheckBoxAvailability: CheckBoxAvailability[]
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
    <Container>
      <Row>
        <IntroContainer>
          <div>
            <Title>{getString('tutorial_learn_subgoal')}</Title>
            <p>{getString('tutorial_subgoal_explanation1')}</p>
            <p>{getString('tutorial_subgoal_explanation2')}</p>
            <p>{getString('tutorial_subgoal_explanation3')}</p>
          </div>
          <FigureContainer>
            <img src="/assets/tutorial-figure (ko).png" alt="An examplary subgoal labels for a math solution." />
          </FigureContainer>
        </IntroContainer>
      </Row>
      <Row>
        <Title>{`${getString('tutorial_practice_title')} 1${getString('tutorial_practice1_goal')}`}</Title>
        <SplitView initialWidths={[3, 6]}>
          <InstructionContainer
            footer={<ActionButton onClick={props.firstCheckAnswer}>{getString('tutorial_check_answer')}</ActionButton>}
          >
            {getString('tutorial_practice1_instruction')}
            <SubgoalContainer
              subgoals={props.firstSubgoals}
              selectedSubgoal={props.firstSelectedSubgoal ?? null}
              selectSubgoal={props.firstSelectSubgoal}
            />
          </InstructionContainer>
          <TaskContainer>
            <HierarchyVisualizer subgoals={props.firstSubgoals} />
            <CodeGrouper
              code={PRACTICE_EXAMPLE1}
              checkBoxAvailability={props.firstCheckBoxAvailability}
              onClickLine={props.firstClickCheckBox}
              selectable
            />
          </TaskContainer>
        </SplitView>
      </Row>
      <Row>
        <Title>{`${getString('tutorial_practice_title')} 2${getString('tutorial_practice2_goal')}`}</Title>
        <SplitView initialWidths={[3, 6]}>
          <InstructionContainer
            footer={<ActionButton onClick={props.secondCheckAnswer}>{getString('tutorial_check_answer')}</ActionButton>}
          >
            {getString('tutorial_practice2_instruction')}
            <SubgoalContainer
              subgoals={props.secondSubgoals}
              selectedSubgoal={props.secondSelectedSubgoal ?? null}
              selectSubgoal={props.secondSelectSubgoal}
              editSubgoal={props.secondEditSubgoal}
            />
          </InstructionContainer>
          <TaskContainer>
            <HierarchyVisualizer subgoals={props.secondSubgoals} />
            <CodeGrouper code={PRACTICE_EXAMPLE2} checkBoxAvailability={props.secondCheckBoxAvailability} />
          </TaskContainer>
        </SplitView>
      </Row>
      <Row>
        <Title>{`${getString('tutorial_practice_title')} 3${getString('tutorial_practice3_goal')}`}</Title>
        <SplitView initialWidths={[3, 6]}>
          <InstructionContainer
            footer={<ActionButton onClick={props.thirdCheckAnswer}>{getString('tutorial_check_answer')}</ActionButton>}
          >
            {getString('tutorial_practice3_instruction')}
            <SubgoalContainer
              subgoals={props.thirdSubgoals}
              selectedSubgoal={props.thirdSelectedSubgoal ?? null}
              selectSubgoal={props.thirdSelectSubgoal}
              editSubgoal={props.thirdEditSubgoal}
              addSubgoal={props.thirdAddSubgoal}
              canAddSubgoals={false}
            />
          </InstructionContainer>
          <TaskContainer>
            <HierarchyVisualizer subgoals={props.thirdSubgoals} />
            <CodeGrouper
              code={PRACTICE_EXAMPLE3}
              checkBoxAvailability={props.thirdCheckBoxAvailability}
              onClickLine={props.clickCheckBox3}
              selectable
            />
          </TaskContainer>
        </SplitView>
      </Row>
      <Row>
        <Title>{getString('tutorial_start_title')}</Title>
        <p>{getString('tutorial_start_instruction')}</p>
        <ActionButton onClick={props.onTaskStart}>{getString('tutorial_start')}</ActionButton>
      </Row>
      {props.couldSkipTutorial && <SkipButton onClick={props.skipTutorial}>{getString('tutorial_skip')}</SkipButton>}
    </Container>
  )
}

const Container = styled.div`
  background: ${Color.Gray05};
  padding-bottom: 60px;
`

const Row = styled.div`
  margin-bottom: 12px;
  background: ${Color.Gray00};
  padding: 12px;
`

const IntroContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.6fr 0.4fr;
`

const TaskContainer = styled.div`
  display: grid;
  height: 100%;
  font-weight: bold;
  grid-template-columns: 29px 1fr;
`

const FigureContainer = styled.div`
  display: flex;
  align-self: center;
  border: 1px solid ${Color.Gray15};
  margin: 10px;

  & > img {
    width: 100%;
    -webkit-user-drag: none;
  }
`
