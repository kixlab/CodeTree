import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown'
import React from 'react'
import { Color } from '../shared/Common'
import { getString } from '../shared/Localization'
import { WrapLoading } from '../wrappers/WrapLoading/WrapLoading'

interface Props {
  problem: string
}

const Container = styled.div`
  margin-top: 15px;
  border: 1px solid ${Color.Gray30};
  padding: 10px;
  border-radius: 4px;
  background: ${Color.Gray00};
  position: relative;
  min-height: 100px;
  font-size: 14px;

  code {
    background-color: ${Color.Gray05};
    padding: 0.1em 0.3em;
    border-radius: 3px;
  }
`

const Title = styled.div`
  font-weight: bold;
  color: ${Color.Gray60};
  font-size: 16px;
`

function ProblemContainer(props: Props) {
  return (
    <WrapLoading loaded={props.problem.length > 0}>
      <Container>
        <Title>{getString('problem_container_title')}</Title>
        <ReactMarkdown>{props.problem}</ReactMarkdown>
      </Container>
    </WrapLoading>
  )
}

export default ProblemContainer
