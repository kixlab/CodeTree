import styled from '@emotion/styled'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Color } from '../shared/Common'

interface Props {
  problem: string
}

const Container = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
  border: 1px solid ${Color.Gray30};
  padding: 10px;
  border-radius: 4px;
  background: ${Color.Gray00};
  position: relative;
  min-height: fit-content;
  font-size: 14px;

  code {
    background-color: ${Color.Gray05};
    padding: 0.1em 0.3em;
    border-radius: 3px;
  }

  h1 {
    font-size: 1.5em;
    margin-top: 0;
    margin-bottom: 8px;
  }

  h2 {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 8px;
  }
`

export function ProblemContainer(props: Props) {
  return (
    <Container>
      <ReactMarkdown>{props.problem}</ReactMarkdown>
    </Container>
  )
}
