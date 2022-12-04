import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { nextStage, shouldMoveStage } from '../shared/ExperimentHelper'
import { Header } from './Header'

interface Props {
  children: React.ReactNode
  onTimeOut?: () => void
}

export function Page({ children, onTimeOut }: Props) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (shouldMoveStage()) {
      navigate(nextStage())
    }
  }, [navigate, pathname])

  return (
    <Container>
      <Header onTimeOut={onTimeOut} />
      {children}
    </Container>
  )
}

const Container = styled.main``
