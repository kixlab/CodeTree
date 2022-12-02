import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { CodeMirror } from './CodeMirror'
import { CheckBoxAvailability } from '../pages/Label'
import { Color } from '../shared/Common'
import { CODE_LINE_HEIGHT } from '../shared/Constants'

interface Props {
  code: string
  explanations?: string[]
  checkBoxAvailability?: CheckBoxAvailability[]
  selectable?: boolean
  lineHeight?: number
  onClickLine?: (id: number, checked: boolean) => void
}

export function CodeGrouper({
  code,
  explanations = [],
  checkBoxAvailability,
  selectable = false,
  lineHeight = CODE_LINE_HEIGHT,
  onClickLine,
}: Props) {
  return (
    <Container>
      <Scrollable>
        {code.split('\n').map((line, i) => {
          const checked = checkBoxAvailability?.[i] === CheckBoxAvailability.CHECKED
          const key = `${i},${line.slice(-5)}`
          return (
            <Line
              key={key}
              checkState={checkBoxAvailability?.[i]}
              selectable={selectable}
              lineHeight={lineHeight}
              onClick={() => {
                if (checkBoxAvailability?.[i] !== CheckBoxAvailability.UNAVAILABLE) onClickLine?.(i, !checked)
              }}
            >
              <Text>
                {explanations[i] && <Explanation indent={line.split('\t').length - 1}>{explanations[i]}</Explanation>}
                <CodeMirror code={line} />
              </Text>
            </Line>
          )
        })}
      </Scrollable>
    </Container>
  )
}

const Container = styled.div`
  overflow: auto;
`

const Scrollable = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  min-width: 100%;
`

const Line = styled.button<{ checkState?: CheckBoxAvailability; selectable: boolean; lineHeight: number }>`
  ${({ checkState, selectable, lineHeight }) => css`
    padding: 6px;
    cursor: ${selectable ? (checkState !== CheckBoxAvailability.UNAVAILABLE ? 'pointer' : 'not-allowed') : 'text'};
    border: none;
    border-bottom: 1px solid ${Color.Gray15};
    background: ${checkState === CheckBoxAvailability.CHECKED ? Color.OrangeLight : 'none'};
    justify-self: stretch;
    height: ${lineHeight}px;
    text-align: left;
    display: flex;
    align-items: center;
    transition: all 0.2s;
    margin: 0;

    ${checkState === CheckBoxAvailability.UNAVAILABLE &&
    css`
      filter: grayscale(80%) opacity(35%);
    `};

    ${selectable &&
    checkState !== CheckBoxAvailability.UNAVAILABLE &&
    css`
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0px 1px 8px 2px rgb(0 0 0 / 20%);
      }
    `}
  `}
`

const Explanation = styled.div<{ indent: number }>`
  ${({ indent }) => css`
    padding-left: 6px;
    color: ${Color.Green20};
    font-size: 14px;
    margin-left: ${indent * 55}px;
  `}
`

const Text = styled.div`
  user-select: none;
  pointer-events: none;
`
