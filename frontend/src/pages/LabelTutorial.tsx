import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '../components/Page'
import { TutorialContent } from '../components/TutorialContent'
import {
  PRACTICE_EXAMPLE1,
  practice1Subgoals,
  practice2Subgoals,
  practice3Subgoals,
  PRACTICE_EXAMPLE2,
  PRACTICE_EXAMPLE3,
} from '../data/SubgoalTutorialExamples'
import { useGroupSubgoals } from '../hooks/useGroupSubgoals'
import { nextStage } from '../shared/ExperimentHelper'
import { getString } from '../shared/Localization'
import { CheckBoxAvailability, SubgoalNode } from './Label'

function useCheckAnswer() {
  const [showAnswer, setShowAnswer] = React.useState(false)

  const checkAnswer = useCallback((checkBoxAvailability: CheckBoxAvailability[], subgoals: SubgoalNode[]) => {
    if (subgoals.some(s => s.label.length === 0)) {
      window.alert(getString('tutorial_alert_fill_all_boxes'))
      return
    }

    setShowAnswer(true)
  }, [])

  return { showAnswer, checkAnswer }
}

function LabelTutorial() {
  const {
    selectSubgoal: selectSubgoal1,
    clickCheckBox: clickCheckBox1,
    selectedSubgoal: selectedSubgoal1,
    subgoals: subgoals1,
    checkBoxAvailability: checkBoxAvailability1,
  } = useGroupSubgoals(PRACTICE_EXAMPLE1.split('\n').length, practice1Subgoals)

  const { showAnswer: showAnswer1, checkAnswer: checkAnswer1 } = useCheckAnswer()
  const {
    selectSubgoal: selectSubgoal2,
    editSubgoal: editSubgoal2,
    selectedSubgoal: selectedSubgoal2,
    subgoals: subgoals2,
    checkBoxAvailability: checkBoxAvailability2,
  } = useGroupSubgoals(PRACTICE_EXAMPLE2.split('\n').length, practice2Subgoals)
  const { showAnswer: showAnswer2, checkAnswer: checkAnswer2 } = useCheckAnswer()

  const {
    selectSubgoal: selectSubgoal3,
    editSubgoal: editSubgoal3,
    selectedSubgoal: selectedSubgoal3,
    subgoals: subgoals3,
    checkBoxAvailability: checkBoxAvailability3,
    addSubgoal: addSubgoal3,
    clickCheckBox: clickCheckBox3,
  } = useGroupSubgoals(PRACTICE_EXAMPLE3.split('\n').length, practice3Subgoals)
  const { showAnswer: showAnswer3, checkAnswer: checkAnswer3 } = useCheckAnswer()
  const navigate = useNavigate()

  const onTaskStart = useCallback(() => {
    if (showAnswer1 && showAnswer2 && showAnswer3) {
      window.localStorage.setItem('fract-tutorial-done', 'true')
      navigate(nextStage())
    } else {
      window.alert(getString('tutorial_alert_complete_practices'))
    }
  }, [navigate, showAnswer1, showAnswer2, showAnswer3])

  const skipTutorial = useCallback(() => {
    navigate(nextStage())
  }, [navigate])

  return (
    <Page onTimeOut={() => window.alert(getString('tutorial_timeout_alert'))}>
      <TutorialContent
        firstSubgoals={subgoals1}
        firstSelectedSubgoal={selectedSubgoal1}
        firstCheckBoxAvailability={checkBoxAvailability1}
        showFirstAnswer={showAnswer1}
        secondSubgoals={subgoals2}
        secondSelectedSubgoal={selectedSubgoal2}
        secondCheckBoxAvailability={checkBoxAvailability2}
        showSecondAnswer={showAnswer2}
        thirdSubgoals={subgoals3}
        thirdSelectedSubgoal={selectedSubgoal3}
        thirdCheckBoxAvailability={checkBoxAvailability3}
        showThirdAnswer={showAnswer3}
        firstSelectSubgoal={selectSubgoal1}
        firstClickCheckBox={clickCheckBox1}
        firstCheckAnswer={() => checkAnswer1(checkBoxAvailability1, subgoals1)}
        secondSelectSubgoal={selectSubgoal2}
        secondEditSubgoal={editSubgoal2}
        secondCheckAnswer={() => checkAnswer2(checkBoxAvailability2, subgoals2)}
        thirdSelectSubgoal={selectSubgoal3}
        thirdEditSubgoal={editSubgoal3}
        thirdCheckAnswer={() => {
          if (subgoals3.length <= 1) {
            window.alert(getString('tutorial_alert_add_smaller_subgoals'))
          } else {
            checkAnswer3(checkBoxAvailability3, subgoals3)
          }
        }}
        thirdAddSubgoal={(id: number | null) => addSubgoal3(id, false)}
        clickCheckBox3={clickCheckBox3}
        couldSkipTutorial={window.localStorage.getItem('fract-tutorial-done') === 'true'}
        skipTutorial={skipTutorial}
        onTaskStart={onTaskStart}
      />
    </Page>
  )
}

export default LabelTutorial
