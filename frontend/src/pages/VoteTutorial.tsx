import produce from 'immer'
import { identity } from 'lodash'
import React, { useCallback, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../components/Header/Header'
import VoteTutorialContent from '../components/VoteTutorialContent/VoteTutorialContent'
import { VotingList1, VotingList2 } from '../data/VoteTutorialData'
import { VotingItem } from '../protocol/GetVotingList'
import { nextStage } from '../shared/ExperimentHelper'
import { getString } from '../shared/Localization'

interface MatchParams {}

function useVoteTutorialPage(history: RouteComponentProps['history']) {
  const [completePractice, setCompletePractice] = useState<[boolean, boolean]>([false, false])
  const [votingList] = useState<VotingItem[][]>([VotingList1, VotingList2])

  const checkAnswer = useCallback(
    (practiceNum: 0 | 1) => () => {
      setCompletePractice(
        produce(draft => {
          draft[practiceNum] = true
        })
      )
    },
    []
  )

  const onTaskStart = useCallback(() => {
    if (completePractice.every(identity)) {
      window.localStorage.setItem('fract-tutorial-done', 'true')
      history.push(nextStage())
    } else {
      window.alert(getString('vote_tutorial_alert_complete_practices'))
    }
  }, [completePractice, history])

  const skipTutorial = useCallback(() => {
    history.push(nextStage())
  }, [history])

  const onTimeOut = useCallback(() => {
    window.alert(getString('tutorial_timeout_alert'))
  }, [])

  return { votingList, checkAnswer, onTaskStart, skipTutorial, onTimeOut }
}

export function VoteTutorial(props: RouteComponentProps<MatchParams>) {
  const { votingList, checkAnswer, onTaskStart, skipTutorial, onTimeOut } = useVoteTutorialPage(props.history)

  return (
    <div>
      <Header onTimeOut={onTimeOut} />
      <VoteTutorialContent
        firstVotingList={votingList[0]}
        secondVotingList={votingList[1]}
        couldSkipTutorial={window.localStorage.getItem('fract-tutorial-done') === 'true'}
        firstCheckAnswer={checkAnswer(0)}
        secondCheckAnswer={checkAnswer(1)}
        skipTutorial={skipTutorial}
        onTaskStart={onTaskStart}
      />
    </div>
  )
}

export default VoteTutorial
