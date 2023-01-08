import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { CodeViewer } from './CodeViewer'
import { Color } from '../shared/Common'
import { CODE_LINE_HEIGHT } from '../shared/Constants'
import { CheckBoxAvailability } from '../types/checkboxAvailability'

interface Props {
  code: string
  explanations?: string[]
  checkBoxAvailability?: CheckBoxAvailability[]
  selectable?: boolean
  lineHeight?: number
  onClickLine?: (id: number, checked: boolean) => void
}

function Component({
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
                <CodeViewer code={line} />
              </Text>
            </Line>
          )
        })}
      </Scrollable>
    </Container>
  )
}

export const CodeGrouper = React.memo(Component)

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
    margin: 0;
    line-height: ${lineHeight}px;

    ${checkState === CheckBoxAvailability.UNAVAILABLE &&
    css`
      filter: grayscale(80%) opacity(35%);
    `};

    ${selectable &&
    checkState !== CheckBoxAvailability.UNAVAILABLE &&
    css`
      &:hover {
        background: ${Color.Orange};
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
