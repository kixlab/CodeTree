import React from 'react'
import './StageNavigator.scss'
import { getString } from '../../shared/Localization'

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

function StageNavigator({
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
    <div className="stage-navigator">
      <button type="button" className={`prev-button${currentStage === 0 ? ' noPrev' : ''}`} onClick={clickPrev}>
        {currentStage > 0 ? getString('vote_prev_button') : ''}
      </button>
      <div className="stage">{`${currentStage + 1}/${maxStage + 1}`}</div>
      {showActionButton ? (
        <button type="button" className="next-button" disabled={isSubmitting} onClick={submit}>
          {actionButtonText ?? getString('vote_action_button')}
        </button>
      ) : (
        showActionButton === false && (
          <button type="button" className="next-button" onClick={clickNext}>
            {nextButtonText ?? getString('vote_next_button')}
          </button>
        )
      )}
    </div>
  )
}

export default StageNavigator
