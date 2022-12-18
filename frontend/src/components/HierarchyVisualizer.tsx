import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { SubgoalNode } from '../pages/Label'
import { Color } from '../shared/Common'
import { CODE_LINE_HEIGHT, SUBGOAL_STICK_GAP, SUBGOAL_STICK_WIDTH } from '../shared/Constants'

interface Props {
  subgoals: SubgoalNode[]
  lineHeight?: number
}

export function HierarchyVisualizer({ subgoals, lineHeight = CODE_LINE_HEIGHT }: Props) {
  return (
    <Container>
      {subgoals
        .flatMap(subgoal =>
          subgoal.group.map(
            (step, i) =>
              [step, subgoal.depth, subgoal.color ?? 'transparent', step + 1 !== subgoal.group[i + 1]] as const
          )
        )
        .map(([step, depth, color, isLast]) => (
          <Stick
            key={`${step},${depth}`}
            color={color}
            index={step}
            depth={depth}
            isLast={isLast}
            lineHeight={lineHeight}
          />
        ))}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  border-right: 1px solid ${Color.Gray15};
`

const Stick = styled.div<{ color: string; index: number; depth: number; isLast: boolean; lineHeight: number }>`
  ${({ color, index, depth, isLast, lineHeight }) => css`
    background-color: ${color};
    position: absolute;
    width: 7px;
    height: ${isLast ? lineHeight - 8 : lineHeight}px;
    top: ${index * lineHeight + 4}px;
    left: ${depth * (SUBGOAL_STICK_WIDTH + SUBGOAL_STICK_GAP) + SUBGOAL_STICK_GAP}px;
    z-index: 100;
  `}
`
