import styled from '@emotion/styled'
import React from 'react'
import { Color } from '../shared/Common'

interface Props {
  children: React.ReactNode
}

export function SubTitle({ children }: Props) {
  return <Container>{children}</Container>
}

const Container = styled.div`
  color: ${Color.Gray75};
  text-decoration: underline;
  font-size: 16px;
  margin-bottom: 8px;
`
