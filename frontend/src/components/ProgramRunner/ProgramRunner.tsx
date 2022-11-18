import React from 'react'
import './ProgramRunner.scss'
import { getString } from '../../shared/Localization'

interface Props {
  onClickRun: () => void
  onJudging: () => void
  onSubmit: () => void
  isRunning: boolean
  isSubmitting: boolean
  isJudging: boolean
}

function ProgramRunner(props: Props) {
  return (
    <div className="program-runner">
      <button className="run" type="button" onClick={props.onClickRun} disabled={props.isRunning}>
        {getString('practice_run')}
      </button>
      <button className="judge" type="button" onClick={props.onJudging} disabled={props.isJudging}>
        {getString('practice_submit')}
      </button>
      <button className="submit" type="submit" onClick={props.onSubmit} disabled={props.isSubmitting}>
        {getString('practice_action_button')}
      </button>
    </div>
  )
}

export default ProgramRunner
