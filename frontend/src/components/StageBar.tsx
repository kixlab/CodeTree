import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { Color } from '../shared/Common'

const STEP_WIDTH = 100
const RIGHT_PANEL_HEADER_HEIGHT = 68

interface Props {
  currentStageIndex: number
}

const Stages = ['목표 나열', '코드 정리', '목표랑 잇기', '코드 수정']

export function StageBar({ currentStageIndex }: Props) {
  return (
    <Container>
      {Stages.map((stage, i, arr) => (
        <div key={stage}>
          <Step num={i + 1} active={i <= currentStageIndex} current={currentStageIndex}>
            {stage}
          </Step>
          {i < arr.length - 1 && <Line active={i < currentStageIndex} index={i} />}
        </div>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${RIGHT_PANEL_HEADER_HEIGHT}px;
  position: relative;
  flex-shrink: 0;
`

const Line = styled.div<{ active: boolean; index: number }>`
  ${({ active, index }) => css`
    height: 5px;
    background: ${active ? Color.Gray60 : Color.Gray20};
    width: ${STEP_WIDTH}px;
    position: absolute;
    z-index: 0;
    top: ${RIGHT_PANEL_HEADER_HEIGHT / 2 - 12}px;
    left: calc(50% - ${(Stages.length * STEP_WIDTH) / 2}px + ${STEP_WIDTH / 2 + STEP_WIDTH * index}px);
  `}
`

const Step = styled.button<{ num: number; active: boolean; current: number }>`
  ${({ num, active, current }) => css`
    color: ${active ? Color.Gray85 : Color.Gray20};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${STEP_WIDTH}px;
    font-weight: ${num - 1 === current ? 'bold' : 'normal'};
    position: relative;
    z-index: 1;
    background: none;
    border: none;
    cursor: pointer;

    &::before {
      content: '${num - 1 < current ? '✓' : num}';
      width: 24px;
      height: 24px;
      border: 2px solid ${active ? Color.Gray60 : Color.Gray20};
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      background: ${num - 1 < current ? Color.Gray60 : Color.Gray00};
      margin-bottom: 4px;
      font-size: 18px;
      color: ${num - 1 === current ? Color.Gray85 : num - 1 < current ? Color.Gray00 : Color.Gray20};
    }
  `}
`
