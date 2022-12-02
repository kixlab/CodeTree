import styled from '@emotion/styled'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Color } from '../shared/Common'
import { HEADER_HEIGHT } from '../shared/Constants'
import { nextStage } from '../shared/ExperimentHelper'

interface Props {
  testUrl: string
}

export function TestForm(props: Props) {
  const [isInitialLoad, setIsInitialLoad] = React.useState(true)
  const navigate = useNavigate()

  const onUrlChange = useCallback(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false)
    } else {
      navigate(nextStage())
    }
  }, [isInitialLoad, navigate])

  return (
    <Container>
      <Form src={props.testUrl} onLoad={onUrlChange}>
        Loading...
      </Form>
    </Container>
  )
}

const Container = styled.div`
  background: ${Color.Gray04};
`

const Form = styled.iframe`
  width: 100%;
  border: 0;
  height: calc(100vh - ${HEADER_HEIGHT}px);
`
