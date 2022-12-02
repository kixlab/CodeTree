import { GroupData, ParticipantData } from '../database/DataBaseDataTypes'
import { GetData2, PushData2, UpdateData2 } from '../database/DataBaseRef'
import { Get } from '../HttpResponse'
import { GetIdAndGroupParams, GetIdAndGroupResults } from '../protocol/GetIdAndGroup'

export const getIdAndGroupController = Get<GetIdAndGroupParams, GetIdAndGroupResults>(async () => {
  const snapshot = await GetData2<GroupData>(`/experiment/group`)

  let group: 'A' | 'B' | 'C'
  if (snapshot.lastAssignment === 'A') {
    group = 'B'
  } else if (snapshot.lastAssignment === 'C') {
    group = 'C'
  } else {
    group = 'A'
  }
  await UpdateData2<GroupData>(`/experiment/group`, {
    lastAssignment: group,
  })
  const id = await PushData2<ParticipantData>(
    `/experiment/participants`,
    {
      group,
      time: time2TimeStamp(Date.now()),
    })
  
  if (!id) {
    throw new Error('참가자 ID를 발급받는 데에 실패하였습니다. 다시 시도해주세요.')
  }

  return {
    id,
    group
  }
})

export function time2TimeStamp(time: number): string {
  const date = new Date(time)
  return `${date.getMonth() + 1}/${date.getDate()} @ ${date.getHours()}:${date.getMinutes()}`
}
