import styled from '@emotion/styled'
import React from 'react'

interface Props {
  ratios?: number[] | string[]
  children: React.ReactNode
}

export function LinearLayout({ children, ratios = Array(React.Children.count(children)).fill(1) }: Props) {
  return <Container ratios={ratios}>{children}</Container>
}

const Container = styled.div<{ ratios: number[] | string[] }>`
  display: grid;
  height: 100%;
  grid-template-columns: ${({ ratios }) => {
    if (typeof ratios[0] === 'number') {
      const sum = (ratios as number[]).reduce((a, b) => a + b, 0)
      return (ratios as number[]).map(ratio => `${(ratio / sum) * 100}%`).join(' ')
    }
    return ratios.join(' ')
  }};
`
