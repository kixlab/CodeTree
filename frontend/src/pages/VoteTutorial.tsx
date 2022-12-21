import produce from 'immer'
import { identity } from 'lodash'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '../components/Page'
import { VoteTutorialContent } from '../components/VoteTutorialContent'
import { VotingList1, VotingList2 } from '../data/VoteTutorialData'
import { VotingItem } from '../protocol/Common'
import { nextStage } from '../shared/ExperimentHelper'
import { getString } from '../shared/Localization'

export function VoteTutorial() {
  const [completePractice, setCompletePractice] = useState<[boolean, boolean]>([false, false])
  const [votingList] = useState<VotingItem[][]>([VotingList1, VotingList2])
  const navigate = useNavigate()

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
      navigate(nextStage())
    } else {
      window.alert(getString('vote_tutorial_alert_complete_practices'))
    }
  }, [completePractice, navigate])

  const skipTutorial = useCallback(() => {
    navigate(nextStage())
  }, [navigate])

  const onTimeOut = useCallback(() => {
    window.alert(getString('tutorial_timeout_alert'))
  }, [])

  return (
    <Page onTimeOut={onTimeOut}>
      <VoteTutorialContent
        firstVotingList={votingList[0]}
        secondVotingList={votingList[1]}
        couldSkipTutorial={window.localStorage.getItem('fract-tutorial-done') === 'true'}
        firstCheckAnswer={checkAnswer(0)}
        secondCheckAnswer={checkAnswer(1)}
        skipTutorial={skipTutorial}
        onTaskStart={onTaskStart}
      />
    </Page>
  )
}
