import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { HEADER_HEIGHT } from '../shared/Constants'

interface Props {
  instruction: JSX.Element
  task: JSX.Element
  heightAuto?: boolean
}

export function InstructionTask({ instruction, task, heightAuto = false }: Props) {
  return (
    <Container heightAuto={heightAuto}>
      {instruction}
      {task}
    </Container>
  )
}

const Container = styled.div<{ heightAuto: boolean }>`
  ${({ heightAuto }) => css`
    display: grid;
    grid-template-columns: 4fr 6fr;
    height: ${heightAuto ? 'initial' : `calc(100vh - ${HEADER_HEIGHT}px)`};
    width: 100%;
  `}
`
