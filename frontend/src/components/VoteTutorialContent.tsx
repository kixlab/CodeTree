import styled from '@emotion/styled'
import React from 'react'
import { PRACTICE_EXAMPLE1, PRACTICE_EXAMPLE2 } from '../data/SubgoalTutorialExamples'
import { VotingItem } from '../protocol/Common'
import { Color } from '../shared/Common'
import { getString } from '../shared/Localization'
import { ActionButton } from './ActionButton'
import { SkipButton } from './SkipButton'
import { Title } from './Title'
import { VotePractice } from './VotePractice'

interface Props {
  firstVotingList: VotingItem[]
  secondVotingList: VotingItem[]
  couldSkipTutorial: boolean
  firstCheckAnswer: () => void
  secondCheckAnswer: () => void
  skipTutorial: () => void
  onTaskStart: () => void
}

export class VoteTutorialContent extends React.Component<Props> {
  startTaskWithCheck = () => {
    this.props.onTaskStart()
  }

  render() {
    return (
      <Container>
        <Row>
          <IntroContainer>
            <div>
              <Title>{getString('tutorial_learn_subgoal')}</Title>
              <p>{getString('tutorial_subgoal_explanation1')}</p>
              <p>{getString('tutorial_subgoal_explanation2')}</p>
              <p>{getString('tutorial_subgoal_explanation3_vote')}</p>
            </div>
            <FigureContainer>
              <img src="/assets/tutorial-figure (ko).png" alt="An examplary subgoal labels for a math solution." />
            </FigureContainer>
          </IntroContainer>
        </Row>
        <Row>
          <VotePractice
            practiceNum={1}
            code={PRACTICE_EXAMPLE1}
            votingList={this.props.firstVotingList}
            checkAnswer={this.props.firstCheckAnswer}
            tips={[getString('vote_tutorial_tip1'), getString('vote_tutorial_tip2'), getString('vote_tutorial_tip3')]}
          />
        </Row>
        <Row>
          <VotePractice
            practiceNum={2}
            code={PRACTICE_EXAMPLE2}
            votingList={this.props.secondVotingList}
            checkAnswer={this.props.secondCheckAnswer}
            tips={[
              getString('vote_tutorial_tip4'),
              getString('vote_tutorial_tip5'),
              getString('vote_tutorial_tip6'),
              getString('vote_tutorial_tip7'),
            ]}
          />
        </Row>
        <Row>
          <Title>{getString('tutorial_start_title')}</Title>
          <p>{getString('tutorial_vote_start_instruction')}</p>
          <ActionButton onClick={this.startTaskWithCheck}>{getString('tutorial_start')}</ActionButton>
        </Row>
        {this.props.couldSkipTutorial && (
          <SkipButton onClick={this.props.skipTutorial}>{getString('tutorial_skip')}</SkipButton>
        )}
      </Container>
    )
  }
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
