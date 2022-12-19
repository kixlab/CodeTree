import { shuffle, isEmpty, compact } from 'lodash'
import { LabelVoteData, SubgoalTreeData } from '../../database/DataBaseDataTypes'
import { VotingItem } from '../../protocol/Common'
import { getLeastExposureLabel, getRandomExclusive, getTopVoteLabel } from './utils'

class LabelSelectService {
  selectWithinGroup(subgoalTree: SubgoalTreeData, optionNumMax = 3): VotingItem[] {
    return subgoalTree.subgoalNodes.map((subgoalNode, index) => {
      const labelVotes = (() => {
        if (subgoalNode.labels != null) {
          const votes = subgoalNode.labels.sort((a, b) => b.voteCount - a.voteCount)
          const options = new Set<LabelVoteData>()
          for (let i = 0; i < optionNumMax; i += 1) {
            options.add(votes[Math.floor(((votes?.length ?? 0) * i) / optionNumMax)])
          }
          return shuffle([...options])
        }
        return []
      })()
      return {
        id: index,
        group: subgoalNode.group,
        labels: labelVotes.map(label => label.label),
        answers: [],
      }
    })
  }

  selectBetweenGroup(subgoalTree: SubgoalTreeData, optionNumMax = 3): VotingItem[] {
    return subgoalTree.subgoalNodes.map((subgoalNode, id) => {
      const chosen: string[] = []
      const labelWithMostUpVote = getTopVoteLabel(subgoalNode.labels ?? [])
      chosen.push(labelWithMostUpVote)

      if (isEmpty(labelWithMostUpVote)) {
        return {
          id,
          group: subgoalNode.group,
          labels: [],
          answers: [],
        }
      }
      const labelWithLeastExposure = getLeastExposureLabel(
        subgoalNode.labels?.filter(labelVoteData => chosen.every(c => c !== labelVoteData.label)) ?? []
      )
      chosen.push(labelWithLeastExposure)

      const exclusiveNode = getRandomExclusive(subgoalTree.subgoalNodes, subgoalNode)
      const exclusiveLabel = getTopVoteLabel(
        exclusiveNode?.labels?.filter(labelVoteData => chosen.every(c => c !== labelVoteData.label)) ?? []
      )
      chosen.push(exclusiveLabel)

      if (isEmpty(labelWithLeastExposure)) {
        const exclusiveLabel2 = getTopVoteLabel(
          getRandomExclusive(
            subgoalTree.subgoalNodes.filter(node => node.group.toString() !== exclusiveNode?.group.toString()),
            subgoalNode
          )?.labels?.filter(labelVoteData => chosen.every(c => c !== labelVoteData.label)) ?? []
        )
        chosen.push(exclusiveLabel2)
      }

      console.info({
        labelWithMostUpVote,
        labelWithLeastExposure,
        exclusiveLabel,
      })

      const labels = shuffle(compact(chosen).slice(0, optionNumMax))
      const answers = labels
        .map((label, i) => (label === labelWithMostUpVote || label === labelWithLeastExposure ? i : undefined))
        .filter(i => i !== undefined) as number[]

      return {
        id,
        group: subgoalNode.group,
        labels,
        answers,
      }
    })
  }
}

export const labelSelectService = new LabelSelectService()
