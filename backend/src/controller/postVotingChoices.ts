import { SubgoalTreeData } from '../database/DataBaseDataTypes'
import { GetData2, SetData2, UpdateData2 } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostVotingChoicesParams, PostVotingChoicesResults, VotingChoice } from '../protocol/PostVotingChoices'

export const postVotingChoicesController = Post<PostVotingChoicesParams, PostVotingChoicesResults>(
  async (params, send) => {
    try {
      await SetData2<VotingChoice[]>(
        `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/choiceList/${params.participantId}`,
        params.votingChoices
      )
      const snapshot = await GetData2<SubgoalTreeData>(
        `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/subgoalTree`
      )

      if (snapshot === null) {
        throw new Error('No snapshot')
      }

      const updatedHierarchy = snapshot
      params.votingChoices.forEach(choice => {
        const node = updatedHierarchy.subgoalNodes[choice.id]
        for (const label of choice.labels) {
          const labelVote = node.labels?.find(l => l.label === label)
          if (labelVote) {
            labelVote.voteCount += 1
          } else {
            if (node.labels === undefined) {
              node.labels = []
            }
            node.labels.push({
              label,
              voteCount: 1,
              exposure: 0,
            })
          }
        }
      })
      updatedHierarchy.voteCnt += 1

      await UpdateData2<SubgoalTreeData>(
        `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/subgoalTree`,
        updatedHierarchy
      )

      send(200, {})
    } catch (err) {
      send(500, {
        message: '제출에 실패하였습니다. 다시 한 번 시도해주세요.',
        error: err,
      })
    }
  }
)
