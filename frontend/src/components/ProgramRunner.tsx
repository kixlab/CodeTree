import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { getString } from '../shared/Localization'
import { Color, SUBMIT_BUTTON_HEIGHT } from '../shared/Common'

interface Props {
  onClickRun: () => void
  onJudging: () => void
  isRunning: boolean
}

export function ProgramRunner(props: Props) {
  return (
    <Container>
      <RunButton type="button" onClick={props.onClickRun} disabled={props.isRunning}>
        {getString('practice_run')}
      </RunButton>
      <JudgeButton type="button" onClick={props.onJudging} disabled={props.isRunning}>
        {getString('practice_submit')}
      </JudgeButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const ButtonStyle = css`
  height: ${SUBMIT_BUTTON_HEIGHT}px;
  flex: 1;
  outline: none;
  font-weight: bold;
  border: none;
  user-select: none;
  cursor: pointer;
  font-size: 18px;
  vertical-align: top;
  color: ${Color.Gray00};
`

const RunButton = styled.button`
  ${ButtonStyle};
  background: ${Color.Gray75};
  border-right: 1px solid ${Color.Gray30};

  &:hover {
    background: ${Color.Gray60};
  }

  &:disabled {
    background: ${Color.Gray30};
    cursor: not-allowed;
  }
`

const JudgeButton = styled.button`
  ${ButtonStyle};
  background: ${Color.Green20};
  border-right: 1px solid ${Color.Gray30};

  &:hover {
    background: ${Color.Green40};
  }

  &:disabled {
    background: ${Color.Gray30};
    cursor: not-allowed;
  }
`
