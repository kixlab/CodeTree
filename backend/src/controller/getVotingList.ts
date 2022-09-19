import { ExampleData, SubgoalTreeData } from '../database/DataBaseDataTypes'
import { GetData2, SetData2, UpdateData2 } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetVotingListParams, GetVotingListResults } from '../protocol/GetVotingList'
import { labelSelectService } from '../service/labelSelect'

export const getVotingListController = Get<GetVotingListParams, GetVotingListResults>(async (params, send) => {
  try {
    const snapshot = await GetData2<SubgoalTreeData>(
      `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/subgoalTree`
    )
    if (snapshot === null) {
      throw new Error(`no snapshot ${params}`)
    }
    const items = await GetData2<ExampleData['votingItems']>(
      `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/votingItems/${params.participantId}`
    )
    if (items != null) {
      send(200, {
        votingItems: items,
      })
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

      await UpdateData2<SubgoalTreeData>(
        `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/subgoalTree`,
        snapshot
      )

      await SetData2<ExampleData['votingItems']>(
        `/cs101_sample_code/${params.lectureName}/${params.fileName.split('.')[0]}/votingItems/${params.participantId}`,
        votingItems
      )
      send(200, {
        votingItems,
      })
    }
  } catch (err) {
    send(500, {
      message: '보기 문구를 불러오는 데에 실패하였습니다. 페이지를 다시 로드해보세요.',
      error: err,
    })
  }
})
