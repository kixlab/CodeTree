import styled from '@emotion/styled'
import React from 'react'
import { Color, SUBMIT_BUTTON_HEIGHT } from '../shared/Common'
import { HEADER_HEIGHT } from '../shared/Constants'

interface Props {
  footer?: JSX.Element
  children: React.ReactNode
}

export function InstructionContainer(props: Props) {
  return (
    <Container>
      <ScollableArea>
        <Instruction>{props.children}</Instruction>
      </ScollableArea>
      <Footer>{props.footer}</Footer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: calc(100vh - ${HEADER_HEIGHT}px);
  background: ${Color.Gray00};
`

const ScollableArea = styled.div`
  height: calc(100% - ${SUBMIT_BUTTON_HEIGHT}px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`

const Instruction = styled.div`
  width: 100%;
  color: ${Color.Gray50};
`

const Footer = styled.div`
  height: ${SUBMIT_BUTTON_HEIGHT}px;
`
