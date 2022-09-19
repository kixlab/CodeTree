import React from 'react'
import { GetSubgoalTreeResults } from '../../protocol/GetSubgoalTree'
import { GoalCard } from './GoalCard'

interface Props {
  goalTree: GetSubgoalTreeResults['tree']
  highlightedGoal?: string
  onHoverGoal?: (id: string) => () => void
}

export function TreePresenter({ goalTree, onHoverGoal, highlightedGoal }: Props) {
  return (
    <div>
      {goalTree.children.map(tree => {
        return (
          <GoalCard
            key={tree.group.join(',')}
            tree={tree}
            depth={0}
            highlightedGoal={highlightedGoal}
            onHover={onHoverGoal}
          />
        )
      })}
    </div>
  )
}
