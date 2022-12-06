import { SubgoalTreeData } from '../database/DataBaseDataTypes'
import { GetData, SetData, UpdateData } from '../database/DataBaseRef'
import { Post } from '../HttpResponse'
import { PostVotingChoicesParams, PostVotingChoicesResults, VotingChoice } from '../protocol/PostVotingChoices'

export const postVotingChoicesController = Post<PostVotingChoicesParams, PostVotingChoicesResults>(async params => {
  await SetData<VotingChoice[]>(
    `/${params.lectureName}/${params.fileName.split('.')[0]}/choiceList/${params.participantId}`,
    params.votingChoices
  )
  const snapshot = await GetData<SubgoalTreeData>(`/${params.lectureName}/${params.fileName.split('.')[0]}/subgoalTree`)

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

  await UpdateData<SubgoalTreeData>(
    `/${params.lectureName}/${params.fileName.split('.')[0]}/subgoalTree`,
    updatedHierarchy
  )

  return {}
})
