import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { FC } from 'react'
import { GetSubgoalTreeResults } from '../../protocol/GetSubgoalTree'
import { Color } from '../../shared/Common'

interface Props {
  tree: GetSubgoalTreeResults['tree']['children'][number]
  depth: number
  onHover?: (id: string) => () => void
  highlightedGoal?: string
}

const Goal = styled.div<{ depth: number }>`
  ${({ depth }) => css`
    margin-left: ${depth === 0 ? 0 : 20}px;
    padding: 5px;
  `}
`

const Label = styled.div<{ isHighlighted: boolean }>`
  ${({ isHighlighted }) => css`
    padding: 5px;
    background-color: ${isHighlighted ? Color.OrangeLight : 'transparent'};

    &:hover {
      background-color: ${Color.OrangeLight};
    }
  `}
`

export function GoalCard({ tree, depth, highlightedGoal, onHover: onClickGoal }: Props) {
  const id = tree.group.join(',')

  return (
    <Goal depth={depth}>
      <Label isHighlighted={highlightedGoal === id} onMouseEnter={onClickGoal?.(id)}>
        🎯 <span>{tree.label}</span>
      </Label>
      {tree.children.map(child => (
        <GoalCard
          key={child.group.join(',')}
          tree={child}
          depth={depth + 1}
          highlightedGoal={highlightedGoal}
          onHover={onClickGoal}
        />
      ))}
    </Goal>
  )
}
