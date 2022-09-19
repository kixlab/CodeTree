import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import difference from 'lodash/difference'
import { getString } from '../shared/Localization'
import Radio from './Radio'
import { Color } from '../shared/Common'
import { TextInput } from './TextInput'

interface Props {
  options: string[]
  checkedOption: number[]
  directInput: string
  showAnswer: boolean
  answers: number[]
  tip?: string
  onOptionClick: (optionIndex: number) => void
  onTextInputChange: (label: string) => void
}

enum Highlight {
  Answer,
  Wrong,
  None,
}

function MultipleChoice({
  options,
  checkedOption,
  showAnswer,
  directInput,
  onTextInputChange,
  onOptionClick,
  answers,
  tip,
}: Props) {
  const hasDistractors = options?.length > 0
  const answer = checkedOption?.includes(-1) ? [-1] : answers

  return (
    <Container>
      <Question>{hasDistractors ? getString('vote_question') : getString('vote_question_no_label')}</Question>
      {options?.map((option, index) => {
        const checked = checkedOption?.includes(index) ?? false
        const highlightState = getHighlightState(index, checkedOption, answer, showAnswer)
        return (
          <Option type="button" key={index} onClick={() => onOptionClick(index)}>
            <Radio checked={checked} />
            <OptionLabel highlight={highlightState} shrink>
              {option}
            </OptionLabel>
            {highlightState === Highlight.Answer && <CorrectLabel>{getString('vote_correct')}</CorrectLabel>}
          </Option>
        )
      })}
      <Option type="button" key={-1} onClick={() => onOptionClick(-1)}>
        <Radio checked={checkedOption?.includes(-1) ?? false} />
        <OptionLabel highlight={getHighlightState(-1, checkedOption, answer, showAnswer)} shrink={false}>
          <TextInput
            placeholder={
              hasDistractors
                ? getString('multiple_choice_input_placeholder')
                : getString('multiple_choice_input_placeholder_no_label')
            }
            value={directInput}
            onChange={onTextInputChange}
          />
        </OptionLabel>
      </Option>
      <Tip>{tip}</Tip>
    </Container>
  )
}

function getHighlightState(index: number, checked: number[], answers: number[] = [], showAnswer = false) {
  const correct = difference(checked, answers).length === 0
  switch (true) {
    case showAnswer && correct && index === checked[0]:
    case showAnswer && !correct && index === answers[0]:
      return Highlight.Answer
    case showAnswer && index === checked[0]:
      return Highlight.Wrong
    default:
      return Highlight.None
  }
}

const Container = styled.div`
  padding: 10px;
  margin-bottom: 40px;
  min-height: 250px;
`

const OptionLabel = styled.div<{ highlight: Highlight; shrink: boolean }>`
  ${({ highlight, shrink }) => css`
    margin-left: 5px;
    font-size: 16px;
    font-weight: ${[Highlight.Answer, Highlight.Wrong].some(s => highlight === s) ? 'bold' : 'normal'};
    color: ${(() => {
      switch (highlight) {
        case Highlight.Answer:
          return Color.Green20
        case Highlight.Wrong:
          return Color.Error20
        case Highlight.None:
        default:
          return Color.Gray75
      }
    })()};
    max-width: calc(100% - 40px);
    margin-top: 4px;
    ${!shrink &&
    css`
      width: 100%;
    `}
    text-align: left;
  `}
`

const CorrectLabel = styled.div`
  font-size: 20px;
  margin-left: 10px;
  flex-shrink: 0;
  border: 2px ${Color.Green20} solid;
  border-radius: 12px;
  padding: 0 5px;
  color: ${Color.Green20};
`

const Question = styled.div`
  margin-bottom: 5px;
  color: ${Color.Gray85};
  font-size: 16px;
`

const Tip = styled.div`
  margin-bottom: 10px;
  color: ${Color.Gray75};
  font-size: 16px;
  margin-top: 15px;
`

const Option = styled.button`
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  display: flex;
  background: none;
  border: none;
  width: 100%;
  height: 34px;
  align-items: start;
  color: ${Color.Gray75};
`

export default MultipleChoice
