import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useExperiment } from '../hooks/useExperiment'
import { HEADER_HEIGHT } from '../shared/Constants'
import { Header } from './Header'

interface Props {
  children: React.ReactNode
  onTimeOut?: () => void
}

export function Page({ children, onTimeOut }: Props) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { shouldMoveStage, nextStage } = useExperiment()

  useEffect(() => {
    if (shouldMoveStage) {
      nextStage().then(navigate)
    }
  }, [navigate, nextStage, pathname, shouldMoveStage])

  return (
    <Container>
      <Header onTimeOut={onTimeOut} />
      <div>{children}</div>
    </Container>
  )
}

const Container = styled.main`
  width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-rows: ${HEADER_HEIGHT}px 1fr;
  grid-template-columns: 100vw;
`
