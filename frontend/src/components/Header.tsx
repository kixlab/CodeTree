import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Color } from '../shared/Common'
import { HEADER_HEIGHT } from '../shared/Constants'
import { getCurrentStage, getId, getTimeRemaining } from '../shared/ExperimentHelper'
import { getString } from '../shared/Localization'
import { SCENARIO } from '../shared/Scenario'
import { ProgressBar } from './ProgressBar'

interface Props {
  onTimeOut?: () => void
}

export function Header({ onTimeOut }: Props) {
  const participantId = getId()
  const [remainingTime, setRemainingTime] = useState(Math.max(getTimeRemaining(), 0))

  useEffect(() => {
    let timer: number | null = null

    if (remainingTime > 0) {
      timer = window.setInterval(() => {
        const time = Math.max(getTimeRemaining(), 0)

        setRemainingTime(time)
        if (time <= 0) {
          onTimeOut?.()
          if (timer) {
            window.clearInterval(timer)
          }
        }
      }, 1000)
    }

    return () => {
      if (timer) {
        window.clearInterval(timer)
      }
    }
  }, [onTimeOut, remainingTime])

  return (
    <Container>
      <Logo>CodeGraph</Logo>
      <Supplement>
        <ProgressBar currentIndex={getCurrentStage()} stageList={SCENARIO.map(stage => stage.name)} />
        <Timer data-prefix={getString('header_timer_prefix')}>
          {SCENARIO[getCurrentStage()]?.timeLimit !== 0
            ? `${Math.floor(remainingTime / 60)}:${String(remainingTime % 60).padStart(2, '0')}`
            : getString('header_no_time_limit')}
        </Timer>
        {participantId ? (
          <ParticipantId data-prefix={getString('header_id_prefix')}>{participantId}</ParticipantId>
        ) : (
          ''
        )}
      </Supplement>
    </Container>
  )
}

const Container = styled.div`
  height: calc(${HEADER_HEIGHT}px - 17px);
  padding: 8px 12px;
  border-bottom: 1px solid ${Color.Gray15};
  position: relative;
`

const Supplement = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  display: flex;
`

const Logo = styled.div`
  font-family: 'Dosis', sans-serif;
  color: ${Color.Orange};
  font-size: 24px;
  position: relative;
  user-select: none;
  text-decoration: none;
  display: inline-block;

  &:after {
    content: '';
    background-size: 24px 24px;
    position: absolute;
    width: 24px;
    height: 24px;
    top: 4px;
    left: -25px;
  }
`

const Timer = styled.div`
  font-size: 18px;
  margin-right: 15px;
  color: ${Color.Error00};

  &:before {
    content: attr(data-prefix);
    color: ${Color.Gray85};
  }
`

const ParticipantId = styled.div`
  color: ${Color.Error00};
  font-size: 18px;

  &:before {
    content: attr(data-prefix);
    color: ${Color.Gray85};
  }
`
