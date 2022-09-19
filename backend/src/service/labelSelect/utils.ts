import maxBy from 'lodash/maxBy'
import minBy from 'lodash/minBy'
import difference from 'lodash/difference'
import intersection from 'lodash/intersection'
import sample from 'lodash/sample'
import { LabelVoteData, SubgoalNodeData } from '../../database/DataBaseDataTypes'

export function getTopVoteLabel(labels: LabelVoteData[]) {
  return maxBy(labels, n => n.voteCount)?.label ?? ''
}

export function getLeastExposureLabel(labels: LabelVoteData[]) {
  return minBy(labels, n => n.exposure)?.label ?? ''
}

export function getDirectParent(
  subgoalNodes: SubgoalNodeData[],
  subgoalNode: SubgoalNodeData
): SubgoalNodeData | undefined {
  const parents = subgoalNodes.filter(
    node =>
      node !== subgoalNode && difference(subgoalNode.group, node.group).length === 0 && (node.labels?.length ?? 0) > 0
  )
  return minBy(parents, n => n.group.length)
}

export function getRandomChild(
  subgoalNodes: SubgoalNodeData[],
  subgoalNode: SubgoalNodeData
): SubgoalNodeData | undefined {
  const children = subgoalNodes.filter(
    node =>
      node !== subgoalNode && difference(node.group, subgoalNode.group).length === 0 && (node.labels?.length ?? 0) > 0
  )
  return sample(children)
}

export function getRandomExclusive(
  subgoalNodes: SubgoalNodeData[],
  subgoalNode: SubgoalNodeData
): SubgoalNodeData | undefined {
  const exclusives = subgoalNodes.filter(
    node => intersection(node.group, subgoalNode.group).length === 0 && (node.labels?.length ?? 0) > 0
  )
  return sample(exclusives)
}
