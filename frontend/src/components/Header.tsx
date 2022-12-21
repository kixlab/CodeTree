import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useExperiment } from '../hooks/useExperiment'
import { Color } from '../shared/Common'
import { HEADER_HEIGHT } from '../shared/Constants'
import { getString } from '../shared/Localization'
import { SCENARIO } from '../shared/Scenario'
import { ProgressBar } from './ProgressBar'

interface Props {
  onTimeOut?: () => void
}

export function Header({ onTimeOut }: Props) {
  const { id, currentStage, timeRemaining } = useExperiment()
  const [didAlert, setDidAlert] = useState(false)

  useEffect(() => {
    if (timeRemaining === 0 && !didAlert) {
      setDidAlert(true)
      onTimeOut?.()
    }
  }, [didAlert, onTimeOut, timeRemaining])

  return (
    <Container>
      <Logo>CodeGraph</Logo>
      <Supplement>
        <ProgressBar currentIndex={currentStage} stageList={SCENARIO.map(stage => stage.name)} />
        <Timer data-prefix={getString('header_timer_prefix')}>
          {SCENARIO[currentStage]?.timeLimit !== 0
            ? `${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`
            : getString('header_no_time_limit')}
        </Timer>
        {id ? <ParticipantId data-prefix={getString('header_id_prefix')}>{id}</ParticipantId> : ''}
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
