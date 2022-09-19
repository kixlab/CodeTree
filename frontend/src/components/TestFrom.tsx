import React from 'react'
import styled from '@emotion/styled'
import { Color } from '../shared/Common'
import { HEADER_HEIGHT } from '../shared/Constants'

interface Props {
  testUrl: string
  urlChangeListener: () => void
}

const Container = styled.div`
  background: ${Color.Gray04};
`

const Form = styled.iframe`
  width: 100%;
  border: 0;
  height: calc(100vh - ${HEADER_HEIGHT}px);
`

function TestForm(props: Props) {
  return (
    <Container>
      <Form src={props.testUrl} onLoad={props.urlChangeListener}>
        Loading...
      </Form>
    </Container>
  )
}

export default TestForm
