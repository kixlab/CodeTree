import { ProblemData, SubgoalTreeData } from '../database/DataBaseDataTypes'
import { GetData, SetData, UpdateData } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetVotingListParams, GetVotingListResults } from '../protocol/GetVotingList'
import { labelSelectService } from '../service/labelSelect'

export const getVotingListController = Get<GetVotingListParams, GetVotingListResults>(async params => {
  const snapshot = await GetData<SubgoalTreeData>(`/${params.lectureName}/${params.fileName.split('.')[0]}/subgoalTree`)
  const items = await GetData<ProblemData['votingItems']>(
    `/${params.lectureName}/${params.fileName.split('.')[0]}/votingItems/${params.participantId}`
  )
  if (items != null) {
    return {
      votingItems: items,
    }
  } else {
    const votingItems = labelSelectService.selectBetweenGroup(snapshot)
    snapshot.subgoalNodes.forEach((subgoalNode, id) => {
      const votingItem = votingItems.find(item => item.id === id)
      if (votingItem) {
        subgoalNode.labels?.forEach(label => {
          if (votingItem.labels.includes(label.label)) {
            label.exposure += 1
          }
        })
      }
    })

    await UpdateData<SubgoalTreeData>(`/${params.lectureName}/${params.fileName.split('.')[0]}/subgoalTree`, snapshot)

    await SetData<ProblemData['votingItems']>(
      `/${params.lectureName}/${params.fileName.split('.')[0]}/votingItems/${params.participantId}`,
      votingItems
    )
    return {
      votingItems,
    }
  }
})
