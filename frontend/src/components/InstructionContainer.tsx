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
  width: calc(100% - 1px);
  height: 100%;
  border-right: 1px solid ${Color.Gray15};
  max-height: calc(100vh - ${HEADER_HEIGHT}px);
  background: ${Color.Gray05};
`

const ScollableArea = styled.div`
  height: calc(100% - ${SUBMIT_BUTTON_HEIGHT}px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`

const Instruction = styled.div`
  width: calc(100% - 40px);
  color: ${Color.Gray50};
  padding: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
`

const Footer = styled.div`
  height: ${SUBMIT_BUTTON_HEIGHT}px;
`
