import React, { useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../components/Header/Header'
import TutorialContent from '../components/TutorialContent/TutorialContent'
import { SubgoalNode, CheckBoxAvailability } from './Label'
import { nextStage } from '../shared/ExperimentHelper'
import { getString } from '../shared/Localization'
import { practice1Subgoals, practice2Subgoals, practice3Subgoals } from '../data/SubgoalTutorialExamples'
import { useGroupSubgoals } from '../hooks/useGroupSubgoals'

function useCheckAnswer() {
  const [showAnswer, setShowAnswer] = React.useState(false)

  const checkAnswer = useCallback((checkBoxAvailability: CheckBoxAvailability[], subgoals: SubgoalNode[]) => {
    if (checkBoxAvailability.some(a => a === CheckBoxAvailability.AVAILABLE)) {
      window.alert(getString('tutorial_alert_assign_all_lines'))
      return
    }
    if (subgoals.some(s => s.label.length === 0)) {
      window.alert(getString('tutorial_alert_fill_all_boxes'))
      return
    }

    setShowAnswer(true)
  }, [])

  return { showAnswer, checkAnswer }
}

function LabelTutorial(props: RouteComponentProps) {
  const {
    selectSubgoal: selectSubgoal1,
    clickCheckBox: clickCheckBox1,
    selectedSubgoal: selectedSubgoal1,
    subgoals: subgoals1,
    checkBoxAvailability: checkBoxAvailability1,
  } = useGroupSubgoals(7, practice1Subgoals)

  const { showAnswer: showAnswer1, checkAnswer: checkAnswer1 } = useCheckAnswer()
  const {
    selectSubgoal: selectSubgoal2,
    editSubgoal: editSubgoal2,
    selectedSubgoal: selectedSubgoal2,
    subgoals: subgoals2,
    checkBoxAvailability: checkBoxAvailability2,
  } = useGroupSubgoals(5, practice2Subgoals)
  const { showAnswer: showAnswer2, checkAnswer: checkAnswer2 } = useCheckAnswer()

  const {
    selectSubgoal: selectSubgoal3,
    editSubgoal: editSubgoal3,
    selectedSubgoal: selectedSubgoal3,
    subgoals: subgoals3,
    checkBoxAvailability: checkBoxAvailability3,
    addSubgoal: addSubgoal3,
    clickCheckBox: clickCheckBox3,
  } = useGroupSubgoals(3, practice3Subgoals)
  const { showAnswer: showAnswer3, checkAnswer: checkAnswer3 } = useCheckAnswer()

  const onTaskStart = useCallback(() => {
    if (showAnswer1 && showAnswer2 && showAnswer3) {
      window.localStorage.setItem('fract-tutorial-done', 'true')
      props.history.push(nextStage())
    } else {
      window.alert(getString('tutorial_alert_complete_practices'))
    }
  }, [props.history, showAnswer1, showAnswer2, showAnswer3])

  const skipTutorial = useCallback(() => {
    props.history.push(nextStage())
  }, [props.history])

  return (
    <div>
      <Header onTimeOut={() => window.alert(getString('tutorial_timeout_alert'))} />
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
    </div>
  )
}

export default LabelTutorial
