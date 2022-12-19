import styled from '@emotion/styled'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export function InstructionBox({ children }: Props) {
  return <Container>{children}</Container>
}

const Container = styled.div`
  padding: 12px;
  margin-bottom: 12px;
`
