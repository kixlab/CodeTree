import React from 'react'
import styled from '@emotion/styled'
import { Color } from '../shared/Common'

interface Props {
  output: string
}

const Container = styled.div`
  padding: 20px;
  color: ${Color.Gray00};
  font-family: monospace;
  font-size: 14px;
  background: ${Color.Gray85};
  white-space: pre-line;
  overflow-x: auto;
`

function OutputTerminal(props: Props) {
  return <Container>{props.output}</Container>
}

export default OutputTerminal
