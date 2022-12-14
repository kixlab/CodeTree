import styled from '@emotion/styled'
import React from 'react'
import { Color } from '../shared/Common'

interface Props {
  children: React.ReactNode
}

export function Title({ children }: Props) {
  return <Container>{children}</Container>
}

const Container = styled.div`
  font-size: 24px;
  color: ${Color.Gray85};
  margin: 0 0 8px 0;
  font-weight: bold;
`
