import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useCallback } from 'react'
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
    cursor: pointer;
    background-color: ${isHighlighted ? Color.OrangeLight : 'transparent'};
    padding-left: 30px;
    position: relative;

    &:hover {
      background-color: ${Color.OrangeLight};
    }
  `}
`

const Arrow = styled.div<{ isOpened: boolean }>`
  ${({ isOpened }) => css`
    border: solid ${Color.Gray75};
    border-width: 0 3px 3px 0;
    transform: rotate(${isOpened ? '225deg' : '45deg'});
    width: 8px;
    height: 8px;
    position: absolute;
    left: 10px;
    top: ${isOpened ? '12px' : '8px'};
  `}
`

const Accordion = styled.div<{ isOpened: boolean }>`
  ${({ isOpened }) => css`
    height: ${isOpened ? 'auto' : 0};
    transition: all 0.5s ease-in-out;
    overflow: hidden;
  `}
`

export function GoalCard({ tree, depth, highlightedGoal, onHover: onClickGoal }: Props) {
  const id = tree.group.join(',')
  const [isOpened, setIsOpened] = React.useState(false)

  const openAccordion = useCallback(() => {
    setIsOpened(!isOpened)
  }, [isOpened])

  return (
    <Goal depth={depth}>
      <Label isHighlighted={highlightedGoal === id} onMouseEnter={onClickGoal?.(id)} onClick={openAccordion}>
        {tree.children.length > 0 && <Arrow isOpened={isOpened} />}
        <span>🎯 </span>
        <span>{tree.label}</span>
      </Label>
      <Accordion isOpened={isOpened}>
        {tree.children.map(child => (
          <GoalCard
            key={child.group.join(',')}
            tree={child}
            depth={depth + 1}
            highlightedGoal={highlightedGoal}
            onHover={onClickGoal}
          />
        ))}
      </Accordion>
    </Goal>
  )
}
