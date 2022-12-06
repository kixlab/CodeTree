import difference from 'lodash/difference'
import { useMemo } from 'react'
import { SubgoalNode } from '../pages/Label'
import { VotingItem } from '../protocol/GetVotingList'
import { Color } from '../shared/Common'
import { SUBGOAL_STICK_GAP, SUBGOAL_STICK_WIDTH } from '../shared/Constants'

export function useHierarchyVisualier(votingList: VotingItem[], currentVotingItem: number) {
  const subgoalNodes = useMemo(() => {
    const nodes = makeSubgoalNode(votingList)
    if (nodes[currentVotingItem]) {
      nodes[currentVotingItem].color = Color.Orange
    }
    return nodes
  }, [currentVotingItem, votingList])

  const visualizerWidth =
    (subgoalNodes.reduce((max, v) => Math.max(max, v.depth), 0) + 1) * SUBGOAL_STICK_WIDTH + SUBGOAL_STICK_GAP

  return {
    subgoalNodes,
    visualizerWidth,
  }
}

export function makeSubgoalNode(votingList: VotingItem[], colorGen?: () => string): SubgoalNode[] {
  return votingList.map(votingItem => {
    return {
      id: votingItem.id,
      group: votingItem.group,
      parentId: getDirectParent(votingItem.id, votingList) ?? null,
      depth: votingList.filter(item => isSubset(votingItem.group, item.group)).length - 1,
      label: votingItem.labels[0],
      children: votingList.filter(item => isSubset(item.group, votingItem.group)).map(item => item.id),
      color: colorGen?.() ?? Color.Orange,
      canAddSubgoal: false,
    }
  })
}

function isSubset(subset: number[], set: number[]): boolean {
  return difference(subset, set).length === 0
}

function getDirectParent(id: number, votingList: VotingItem[]): number | undefined {
  const targetScope = votingList.find(item => item.id === id)
  if (targetScope != null) {
    let parent: VotingItem | undefined
    votingList.forEach(votingItem => {
      if (
        isSubset(targetScope.group, votingItem.group) &&
        votingItem.group.length < (parent?.group.length || 100) &&
        votingItem.id !== id
      ) {
        parent = votingItem
      }
    })
    return parent?.id
  }
}
