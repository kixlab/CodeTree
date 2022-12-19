import produce from 'immer'
import { useCallback, useEffect, useState } from 'react'
import { ChoiceState } from '../pages/Vote'
import { VotingItem } from '../protocol/Common'
import { getString } from '../shared/Localization'
import { CheckBoxAvailability } from '../types/checkboxAvailability'
import { useStageNavigator } from './useStageNavigator'
import { useThrottleCallback } from './useThrottleCallback'

export function useVote(code: string, votingList: VotingItem[]) {
  const [choiceList, setChoiceList] = useState<ChoiceState[]>([])
  const [checkBoxAvailability, setCheckBoxAvailability] = useState<CheckBoxAvailability[]>([])
  const { currentStage, maxStage, setMaxStage, prev, next, reached, incReached } = useStageNavigator()
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    setMaxStage(votingList.length - 1)
    setChoiceList(
      Array(votingList.length)
        .fill(null)
        .map((_, index) => {
          return {
            id: index,
            choice: [],
            newOption: null,
          }
        })
    )
  }, [setMaxStage, votingList.length])

  const checkBoxAvailabilityFactory = useCallback(
    (checkedIndexes: number[]) => {
      return [...Array(code.length)].map((_, index) => {
        if (checkedIndexes.includes(index)) {
          return CheckBoxAvailability.CHECKED
        }
        return CheckBoxAvailability.UNAVAILABLE
      })
    },
    [code.length]
  )

  useEffect(() => {
    setCheckBoxAvailability(checkBoxAvailabilityFactory(votingList[currentStage]?.group ?? []))
  }, [votingList, currentStage, checkBoxAvailabilityFactory])

  const canProceedToNext = useCallback(() => {
    if (choiceList[currentStage].choice.length === 0) {
      window.alert(getString('vote_no_option_selected_alert'))
      return false
    }
    if (
      choiceList[currentStage].choice.includes(-1) &&
      (choiceList[currentStage].newOption?.trim().length || 0) === 0
    ) {
      window.alert(getString('vote_option_blank_alert'))
      return false
    }
    return true
  }, [choiceList, currentStage])

  const clickPrev = useThrottleCallback(
    useCallback(() => {
      prev()
      setShowAnswer(true)
    }, [prev]),
    300
  )

  const clickNext = useThrottleCallback(() => {
    if (!canProceedToNext()) {
      return
    }
    if (currentStage < reached - 1) {
      setShowAnswer(true)
      next()
    } else if (!showAnswer) {
      setShowAnswer(true)
      incReached()
    } else if (reached - 1 !== maxStage) {
      setShowAnswer(false)
      next()
    }
  }, 300)

  const onOptionClick = useCallback(
    (optionIndex: number) => {
      if (reached === currentStage && !showAnswer) {
        const newChoiceList = produce(choiceList, draft => {
          draft[currentStage].choice = [optionIndex]
        })
        setChoiceList(newChoiceList)
      }
    },
    [choiceList, currentStage, reached, showAnswer]
  )

  const onTextInputChange = useCallback(
    (label: string) => {
      if (reached === currentStage && !showAnswer) {
        const newChoiceList = produce(choiceList, draft => {
          draft[currentStage].choice = [-1]
          draft[currentStage].newOption = label
        })
        setChoiceList(newChoiceList)
      }
    },
    [choiceList, currentStage, reached, showAnswer]
  )

  return {
    canProceedToNext,
    clickPrev,
    clickNext,
    onOptionClick,
    onTextInputChange,
    maxStage,
    votingList,
    choiceList,
    checkBoxAvailability,
    currentStage,
    showAnswer,
  }
}
