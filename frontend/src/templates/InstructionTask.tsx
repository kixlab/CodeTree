import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { HEADER_HEIGHT, TASK_CONTAINER_MAX_WIDTH } from '../shared/Constants'

interface Props {
  instruction: JSX.Element
  task: JSX.Element
  heightAuto?: boolean
}

export function InstructionTask({ instruction, task, heightAuto = false }: Props) {
  return (
    <Container heightAuto={heightAuto}>
      <Instruction>{instruction}</Instruction>
      <Task>{task}</Task>
    </Container>
  )
}

const Container = styled.div<{ heightAuto: boolean }>`
  ${({ heightAuto }) => css`
    display: flex;
    height: ${heightAuto ? 'initial' : `calc(100vh - ${HEADER_HEIGHT}px)`};
    width: 100%;
  `}
`

const Instruction = styled.div`
  width: 40%;
  max-width: ${TASK_CONTAINER_MAX_WIDTH}px;
  height: 100%;
  overflow-y: auto;
`

const Task = styled.div`
  width: 60%;
  min-width: calc(100% - ${TASK_CONTAINER_MAX_WIDTH}px);
  height: 100%;
  overflow-y: auto;
`
