import React from 'react'
import styled from '@emotion/styled'
import { getString } from '../shared/Localization'
import { ActionButton } from './ActionButton'
import { SubButton } from './SubButton'
import { Color, SUBMIT_BUTTON_HEIGHT } from '../shared/Common'

interface Props {
  currentStage: number
  maxStage: number
  isSubmitting: boolean
  nextButtonText?: string
  actionButtonText?: string
  showActionButton: boolean | null
  submit?: () => void
  clickPrev: () => void
  clickNext: () => void
}

export function StageNavigator({
  currentStage,
  clickPrev,
  clickNext,
  isSubmitting,
  nextButtonText,
  actionButtonText,
  showActionButton,
  maxStage,
  submit,
}: Props) {
  return (
    <Container>
      <SubButton disabled={currentStage === 0} onClick={clickPrev}>
        {getString('vote_prev_button')}
      </SubButton>
      <StageIndicator>{`${currentStage + 1}/${maxStage + 1}`}</StageIndicator>
      {showActionButton ? (
        <ActionButton disabled={isSubmitting} onClick={submit}>
          {actionButtonText ?? getString('vote_action_button')}
        </ActionButton>
      ) : (
        showActionButton === false && (
          <ActionButton onClick={clickNext}>{nextButtonText ?? getString('vote_next_button')}</ActionButton>
        )
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: ${SUBMIT_BUTTON_HEIGHT}px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

const StageIndicator = styled.div`
  font-size: 18px;
  background: ${Color.Gray05};
  display: flex;
  align-items: center;
  justify-content: center;
`
