import difference from 'lodash/difference'
import { useMemo } from 'react'
import { SubgoalNode } from '../pages/Label'
import { VotingItem } from '../protocol/GetVotingList'
import { Color } from '../shared/Common'

export function useHierarchyVisualier(votingList: VotingItem[], currentVotingItem: number) {
  const subgoalNodes = useMemo(() => {
    const nodes = makeSubgoalNode(votingList)
    if (nodes[currentVotingItem]) {
      nodes[currentVotingItem].color = Color.Orange
    }
    return nodes
  }, [currentVotingItem, votingList])

  const visualizerWidth = (subgoalNodes.reduce((max, v) => Math.max(max, v.depth), 0) + 1) * 12 + 5

  return {
    subgoalNodes,
    visualizerWidth,
  }
}

function makeSubgoalNode(votingList: VotingItem[]): SubgoalNode[] {
  return votingList.map(votingItem => {
    return {
      id: votingItem.id,
      group: votingItem.group,
      parentId: getDirectParent(votingItem.id, votingList) ?? null,
      depth: votingList.filter(item => isSubset(votingItem.group, item.group)).length - 1,
      label: '',
      children: votingList.filter(item => isSubset(item.group, votingItem.group)).map(item => item.id),
      color: Color.Gray20,
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
