import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { PostPracticeRunResults } from '../protocol/PostPracticeRun'
import { Color } from '../shared/Common'
import { getString } from '../shared/Localization'

interface Props {
  isRunning: boolean
  programOutput: null | PostPracticeRunResults['output']
}

export function OutputTerminal({ isRunning, programOutput }: Props) {
  return (
    <Container>
      {isRunning
        ? getString('practice_terminal_running')
        : programOutput === null
        ? getString('practice_terminal_output')
        : programOutput.map(({ input, output, expected, correct }, i) => {
            return (
              <TestCase key={i}>
                <div>
                  입력값:
                  <br />
                  {input}
                </div>
                <div>
                  출력값:
                  <br />
                  <Output isCorrect={correct}>{output}</Output>
                </div>
                <div>
                  기대값:
                  <br />
                  {expected}
                </div>
              </TestCase>
            )
          })}
    </Container>
  )
}

const Container = styled.div`
  padding: 8px;
  color: ${Color.Gray00};
  font-family: monospace;
  font-size: 14px;
  background: ${Color.Gray85};
  white-space: pre-line;
  overflow-x: auto;
  min-height: 200px;
  word-break: break-word;
`

const TestCase = styled.div`
  border: 1px solid ${Color.Gray60};
  padding: 4px;
  margin: 4px;
`

const Output = styled.div<{ isCorrect: boolean }>`
  ${({ isCorrect }) => css`
    display: inline-block;
    background-color: ${isCorrect ? Color.Green20 : Color.Error20};
    color: ${Color.Gray00};
  `}
`
