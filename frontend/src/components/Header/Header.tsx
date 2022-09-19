import React from 'react'
import './Header.scss'
import { getTimeRemaining, getId, getStageList, getCurrentStage, hasTimeLimit } from '../../shared/ExperimentHelper'
import ProgressBar from './ProgressBar/ProgressBar'
import { getString } from '../../shared/Localization'

interface Props {
  timerKey?: string
  onTimeOut?: () => void
}

interface State {
  timeRemaining: number
}

class Header extends React.Component<Props, State> {
  participantId = getId()

  timer: number | null = null

  constructor(props: Props) {
    super(props)
    this.state = {
      timeRemaining: Math.max(getTimeRemaining(), 0),
    }
    this.startTimer()
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.timerKey !== this.props.timerKey) {
      this.startTimer()
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      window.clearInterval(this.timer)
    }
  }

  startTimer = () => {
    if (this.timer) {
      window.clearInterval(this.timer)
    }
    this.timer = window.setInterval(() => {
      this.setState(
        {
          timeRemaining: Math.max(getTimeRemaining(), 0),
        },
        () => {
          if (this.state.timeRemaining <= 0) {
            this.props.onTimeOut?.()
            if (this.timer) {
              window.clearInterval(this.timer)
            }
          }
        }
      )
    }, 1000)
  }

  render() {
    return (
      <div className="header">
        <div className="logo">CodeTree</div>
        <div className="supplement">
          <a className="tutorial" href="/python-tutorial" target="_blank">
            {getString('header_python_tutorial')}
          </a>
          <ProgressBar currentIndex={getCurrentStage()} stageList={getStageList()} />
          <div className="timer" data-prefix={getString('header_timer_prefix')}>
            {hasTimeLimit()
              ? `${Math.floor(this.state.timeRemaining / 60)}:${String(this.state.timeRemaining % 60).padStart(2, '0')}`
              : getString('header_no_time_limit')}
          </div>
          {this.participantId ? (
            <div className="participant-id" data-prefix={getString('header_id_prefix')}>
              {this.participantId}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

export default Header
