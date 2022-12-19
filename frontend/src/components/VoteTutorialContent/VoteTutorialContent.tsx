import React from 'react'
import { PRACTICE_EXAMPLE1, PRACTICE_EXAMPLE2 } from '../../data/SubgoalTutorialExamples'
import { VotingItem } from '../../protocol/Common'
import { getString } from '../../shared/Localization'
import { SkipButton } from '../SkipButton'
import { VotePractice } from '../VotePractice'
import './VoteTutorialContent.scss'

interface Props {
  firstVotingList: VotingItem[]
  secondVotingList: VotingItem[]
  couldSkipTutorial: boolean
  firstCheckAnswer: () => void
  secondCheckAnswer: () => void
  skipTutorial: () => void
  onTaskStart: () => void
}

class VoteTutorialContent extends React.Component<Props> {
  startTaskWithCheck = () => {
    this.props.onTaskStart()
  }

  render() {
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
              <p className="tutorial-text">{getString('tutorial_subgoal_explanation3_vote')}</p>
            </div>
            <div className="figure-container">
              <div className="figure">
                <img src="/assets/tutorial-figure (ko).png" alt="An examplary subgoal labels for a math solution." />
              </div>
            </div>
          </div>
          <VotePractice
            practiceNum={1}
            code={PRACTICE_EXAMPLE1}
            votingList={this.props.firstVotingList}
            checkAnswer={this.props.firstCheckAnswer}
            tips={[getString('vote_tutorial_tip1'), getString('vote_tutorial_tip2'), getString('vote_tutorial_tip3')]}
          />
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
          <div className="row">
            <div className="text-container">
              <h1 className="tutorial-title">{getString('tutorial_start_title')}</h1>
              <p className="tutorial-text">{getString('tutorial_vote_start_instruction')}</p>
              <button type="button" className="start-button" onClick={this.startTaskWithCheck}>
                {getString('tutorial_start')}
              </button>
            </div>
          </div>
        </div>
        {this.props.couldSkipTutorial && (
          <SkipButton onClick={this.props.skipTutorial}>{getString('tutorial_skip')}</SkipButton>
        )}
      </div>
    )
  }
}

export default VoteTutorialContent
