import styled from '@emotion/styled'
import React from 'react'
import { Color } from '../shared/Common'

interface Props {
  children: React.ReactNode
}

export function OutputTerminal({ children }: Props) {
  return <Container>{children}</Container>
}

const Container = styled.div`
  padding: 8px;
  color: ${Color.Gray00};
  font-family: monospace;
  font-size: 14px;
  background: ${Color.Gray85};
  white-space: pre-line;
  overflow-x: auto;
  min-height: 200px;
  word-break: break-word;
`
